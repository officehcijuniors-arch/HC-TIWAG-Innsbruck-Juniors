# HC TIWAG Innsbruck Juniors – Infosäule

Statische Website für die automatische Anzeige von Vereinsinhalten. Kein Build und keine npm-Abhängigkeiten erforderlich.

## Lokal starten

```sh
python3 -m http.server 8000
```

Danach http://localhost:8000 öffnen. Ein HTTP-Server ist für `fetch(settings.json)` nötig.

## Aufbau

| Pfad | Aufgabe |
| --- | --- |
| `index.html` | Infosäule mit den bisherigen 14 Inhaltsbereichen |
| `settings.json` | Aktivierung, Anzeigedauer und Neuladeintervall |
| `pages/` | Kalender, Tabellen, Spielerfotos, Infopoint, Tournify, Organigramme |
| `assets/css/` | Styles pro Seite |
| `assets/js/` | Rotation, Animationen und Tabellenlogik |
| `assets/images/` | Grafiken, Logos und `players/` mit Spielerfotos |
| `assets/videos/` | Alle bisherigen Videos |
| `assets/fonts/` | Areno-Schriften |
| `scripts/` | Automatische Strukturprüfung |
| `tests/` | Regressionstests für die Infosäule |
| `docs/` | Wartung, Funktionsübersicht und Abnahme |

Im Hauptverzeichnis liegt nur die Startseite `index.html`. Alle Inhaltsseiten liegen ausschließlich unter `pages/`. Die Infosäule ruft sie direkt dort auf. Alte Seitenadressen im Hauptverzeichnis werden nicht mehr unterstützt.

## Einstellungen

`settings.json` bleibt im Hauptverzeichnis. Die Infosäule lädt die Einstellungen vom eigenen Server, damit jeder Branch und lokale Test seine eigenen Einstellungen verwendet.

`pages` verwendet unverändert die IDs 1–14. `enabled` aktiviert die Seite, `duration` ist die Anzeigedauer in Sekunden. `reload` ist das Neuladeintervall in Minuten; 0 deaktiviert es. Die bisherigen Werte bleiben unverändert.

## Prüfen

```sh
python3 scripts/check_project.py
node --test tests/rotation.test.cjs
```

GitHub Actions führt beide Prüfungen bei Push und Pull Request aus. GitHub Pages kann weiterhin direkt aus dem Repository-Hauptverzeichnis veröffentlichen.

Weitere Hinweise: [Wartung und Abnahme](docs/maintenance.md).
