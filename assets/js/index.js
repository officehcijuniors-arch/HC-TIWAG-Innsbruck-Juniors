window.addEventListener("DOMContentLoaded", async () => {

      const pages = document.querySelectorAll(".page");
      let current = 0;
      let settings;

      const SETTINGS_URL =
        "settings.json";

      try {
        const res = await fetch(SETTINGS_URL, { cache: "no-store" });
        if (!res.ok) throw new Error("Settings not reachable");
        settings = await res.json();
      } catch (e) {
        console.warn("Fallback settings active", e);
        settings = {
          pages: Object.fromEntries(
            [...Array(pages.length)].map((_, i) => [
              i + 1,
              { enabled: true, duration: 15 }
            ])
          ),
          reload: 120
        };
      }

      function activePages() {
        return [...pages.keys()].filter(i => settings.pages[i + 1]?.enabled);
      }

      function show(index) {
        pages.forEach((p, i) => p.classList.toggle("active", i === index));
        // Entlade die Animation beim Verlassen, damit sie beim nächsten Besuch neu beginnt.
        pages.forEach((p, i) => {
          if (i !== index) {
            const restartFrame = p.querySelector('iframe[data-restart="true"]');
            if (restartFrame) restartFrame.removeAttribute("src");
          }
        });
        const page = pages[index];
        const iframe = page.querySelector("iframe");
        const video = page.querySelector("video");
        if (iframe && !iframe.hasAttribute("src")) iframe.src = iframe.dataset.src;
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      }

      function rotate() {
        const active = activePages();
        if (!active.length) return;
        const pos = active.indexOf(current);
        current = active[(pos + 1) % active.length];
        show(current);
        setTimeout(rotate, (settings.pages[current + 1].duration || 10) * 1000);
      }

      const initial = activePages();
      if (initial.length) {
        current = initial[0];
        show(current);
        setTimeout(rotate, (settings.pages[current + 1].duration || 10) * 1000);
      } else {
        pages.forEach(page => page.classList.remove("active"));
      }

      if (settings.reload > 0) {
        setInterval(
          () => location.reload(),
          settings.reload * 60 * 1000
        );
      }

      const tables = [
        "pages/Tabelle_U13.html",
        "pages/Tabelle_U15.html",
        "pages/Tabelle_U17.html",
        "pages/Tabelle_U20.html"
      ];

      const frame = document.getElementById("table-frame");
      let t = 0;

      if (frame) {
        const showTable = () => {
          frame.innerHTML = "";
          const i = document.createElement("iframe");
          i.src = tables[t];
          frame.appendChild(i);
          t = (t + 1) % tables.length;
        };
        showTable();
        setInterval(showTable, 10000);
      }
    });
