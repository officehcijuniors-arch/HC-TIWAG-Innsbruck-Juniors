"""Check static paths, configuration and standalone JavaScript syntax."""
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json, re, subprocess
ROOT = Path(__file__).resolve().parents[1]
errors = []
count = 0
for file in [*ROOT.rglob('*.html'), *ROOT.rglob('*.css')]:
    text = file.read_text()
    refs = re.findall(r'(?:src|href|data-src|data-target)\s*=\s*[\"\']([^\"\']+)', text)
    refs += re.findall(r'url\([\"\']?([^\"\')]+)', text)
    for ref in refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc or not url.path:
            continue
        count += 1
        if not (file.parent / unquote(url.path)).is_file():
            errors.append(f'{file.relative_to(ROOT)}: missing {ref}')
for file in ROOT.glob('assets/js/*.js'):
    result = subprocess.run(['node', '--check', str(file)], capture_output=True, text=True)
    if result.returncode:
        errors.append(result.stderr)
settings = json.loads((ROOT / 'settings.json').read_text())
assert set(settings['pages']) == {str(i) for i in range(1, 15)}
for value in settings['pages'].values():
    assert isinstance(value['enabled'], bool)
    assert isinstance(value['duration'], (int, float)) and value['duration'] > 0
assert isinstance(settings['reload'], (int, float)) and settings['reload'] >= 0
if errors:
    raise SystemExit('\n'.join(errors))
print(f'OK: {count} local references, settings and JavaScript syntax')
