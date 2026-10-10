(() => {
      const scenes = [...document.querySelectorAll('.scene')];
      const bars = [...document.querySelectorAll('.progress span')];
      let index = 0;
      let timer = null;
      let startedAt = 0;
      let remaining = Number(scenes[0].dataset.duration);

      function updateProgress(duration) {
        document.documentElement.style.setProperty('--scene-time', `${duration}ms`);
        bars.forEach(bar => { bar.className = ''; });
        void document.documentElement.offsetWidth;
        bars.forEach((bar, i) => {
          bar.className = i < index ? 'done' : i === index ? 'current' : '';
        });
      }

      function show(nextIndex, durationOverride) {
        clearTimeout(timer);
        index = (nextIndex + scenes.length) % scenes.length;
        scenes.forEach((scene, i) => {
          const active = i === index;
          scene.classList.toggle('active', active);
          scene.setAttribute('aria-hidden', active ? 'false' : 'true');
        });
        remaining = durationOverride ?? Number(scenes[index].dataset.duration);
        updateProgress(remaining);
        startedAt = performance.now();
        timer = setTimeout(() => show(index + 1), remaining);
      }

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          remaining = Math.max(250, remaining - (performance.now() - startedAt));
          clearTimeout(timer);
        } else {
          show(index, remaining);
        }
      });

      window.addEventListener('pageshow', event => {
        if (event.persisted) show(index, remaining);
      });
      window.addEventListener('pagehide', () => clearTimeout(timer));
      show(0);
    })();
