/* =====================================================
   kdev studio — interactions
   - mobile nav toggle
   - reveal on scroll (IntersectionObserver)
   - Web3Forms AJAX submit with success state
   - IČO injection (single source of truth below)
   ===================================================== */

(() => {
  "use strict";

  /* ---- 0. Config you may edit later ---- */
  const CONFIG = {
    ico: "19523751", // IČO — отображается в футере
    // Реальные ссылки на соцпрофили (когда появятся):
    socials: {
      linkedin: null,
      fiverr: null,
      upwork: null,
    },
  };

  /* ---- 1. Mobile nav ---- */
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  if (header && toggle) {
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // close on nav click (mobile)
    header.querySelectorAll(".site-nav a").forEach((a) => {
      a.addEventListener("click", () => header.classList.remove("is-open"));
    });
  }

  /* ---- 3. Inject IČO if set ---- */
  if (CONFIG.ico) {
    document.querySelectorAll("[data-ico]").forEach((el) => {
      el.textContent = CONFIG.ico;
    });
  }

  /* ---- 4. Wire up real social links if set ---- */
  Object.entries(CONFIG.socials).forEach(([key, url]) => {
    if (!url) return;
    document.querySelectorAll(`[data-social="${key}"]`).forEach((a) => {
      a.setAttribute("href", url);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
  });

  /* ---- 5. Contact form (Web3Forms AJAX) ---- */
  const form = document.querySelector(".form");
  const success = document.querySelector(".form__success");
  if (form && success) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const key = form.querySelector('input[name="access_key"]')?.value || "";
      const submitBtn = form.querySelector('[type="submit"]');

      // If access key not yet configured, show success in demo mode
      // (so the form looks alive before Web3Forms is connected).
      const isPlaceholder = key.includes("REPLACE_WITH");

      if (isPlaceholder) {
        form.style.display = "none";
        success.removeAttribute("hidden");
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        const data = await res.json();
        if (data.success) {
          form.style.display = "none";
          success.removeAttribute("hidden");
        } else {
          throw new Error(data.message || "Submission failed");
        }
      } catch (err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Try again <span class="arrow">→</span>';
        }
        console.error("Form error:", err);
      }
    });
  }
})();
