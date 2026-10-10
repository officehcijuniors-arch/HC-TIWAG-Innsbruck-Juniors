# Wartung und Abnahme

## Erhaltene Inhalte

1. Social-Media-Grafik
2. Google-Kalender (bestehende Kalender-IDs, Europe/Vienna)
3. Statisches Organigramm
4. Fotoshop-Video
5. Fanshop-Video
6. Organisationsstruktur-Video
7. Spielerfoto-Animation einschließlich Neustart beim Wiederaufruf
8. Tabellenrotation U13, U15, U17, U20 im Abstand von 10 Sekunden
9. Laufschul-Video
10. Gameday-Grafik
11. Spieltag-Video
12. Spielvorschau-Grafik
13. Tournify-Präsentation
14. Animiertes Organigramm 2026/27 einschließlich Neustart beim Wiederaufruf

Infopoint bleibt als separat aufrufbare Seite erhalten. Alle Fotos, Videos und Schriftdateien wurden ohne Veränderung ihrer Bytes verschoben. Kalender-URLs, Tournify-URL, Tabelleninhalte, jQuery-Abhängigkeiten und Animationsskripte bleiben erhalten.

## Bewusste Korrekturen

- Schriftverweise zeigen jetzt auf tatsächlich vorhandene Dateien.
- Einstellungen stammen aus der jeweiligen Website statt immer aus GitHub `main`.
- Die erste aktivierte Seite wird sofort für ihre volle Dauer angezeigt; vorher wurde die Startseite unmittelbar übersprungen.
- Die erste Tabelle wird sofort geladen; vorher blieb der Tabellenrahmen zunächst zehn Sekunden leer.

## Bearbeiten

Inhalte unter `pages/`, passende Styles unter `assets/css/` und Skripte unter `assets/js/` bearbeiten. Originalnamen der Medien wurden beibehalten. Neue Inhalte zusätzlich in `index.html` und `settings.json` eintragen. Die bisherigen HTML-Weiterleitungen im Hauptverzeichnis wurden entfernt, da die Infosäule ausschließlich über `index.html` aufgerufen wird.

Das animierte Organigramm ist ein eigenständiger HTML-Export mit eingebetteten Bildern und Schriften. Es wurde unverändert nach `pages/` verschoben. Zur Bearbeitung den Export gezielt ersetzen; seine Einbettungen wurden bewusst nicht zerlegt.

## Prüfung auf der echten Infosäule

- Mit den bestehenden Einstellungen einen vollständigen Zyklus beobachten.
- Anschließend jede deaktivierte Seite in einer Testkopie aktivieren.
- Video-Autoplay, Darstellung, Schrift, Fotoanimation und Organigramm-Neustart prüfen.
- Alle vier Tabellen sowie Kalender und Tournify auf Erreichbarkeit prüfen.
- Neuladen über `reload` mit kurzem Testintervall prüfen und danach Originalwert wiederherstellen.

Automatische Prüfungen kontrollieren lokale Pfade, Konfiguration, JavaScript-Syntax und Rotationsverhalten. Sie bestätigen keine Erreichbarkeit externer Anbieter und ersetzen keine Sichtprüfung auf dem tatsächlichen Display. Tabellen enthalten den bisherigen Datenstand; diese Umstrukturierung aktualisiert keine Sportdaten.
