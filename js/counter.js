const counters = document.querySelectorAll("[data-counter]");
let countersStarted = false;

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function animateCounter(counter) {
  const target = Number(counter.dataset.counter || 0);
  const suffix = counter.dataset.suffix || "";
  const duration = 2000;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const current = Math.floor(target * easeOutCubic(progress));
    counter.textContent = current.toLocaleString("en-US") + suffix;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      counter.textContent = target.toLocaleString("en-US") + suffix;
    }
  }

  requestAnimationFrame(tick);
}

if (counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    if (countersStarted) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countersStarted = true;
        counters.forEach(animateCounter);
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.35 });

  counters.forEach((counter) => counterObserver.observe(counter));
}
