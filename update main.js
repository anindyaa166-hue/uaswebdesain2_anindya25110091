/* =========================================================
   GIMDU — main.js
   Fitur JS wajib pada project ini:
   1. Bootstrap Carousel  -> hero gallery di index.html
   2. Bootstrap Accordion -> daftar kategori menu di produk.html
   3. Bootstrap Navbar Collapse -> otomatis dari Bootstrap
   4. Form Validasi JS custom  -> form kontak di kontak.html
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Tombol "back to top" ---------- */
  var backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.style.display = window.scrollY > 400 ? "flex" : "none";
    });
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 2. Icon panah pada accordion menu (produk.html) ---------- */
  var accordionHeaders = document.querySelectorAll(".accordion .card-header");
  accordionHeaders.forEach(function (header) {
    header.addEventListener("click", function () {
      // reset semua header lain
      accordionHeaders.forEach(function (h) {
        if (h !== header) h.setAttribute("aria-expanded", "false");
      });
      var isOpen = header.getAttribute("aria-expanded") === "true";
      header.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });
  });

  /* ---------- 3. Validasi form kontak (kontak.html) ---------- */
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var isValid = true;

      var nama = document.getElementById("nama");
      var noHp = document.getElementById("noHp");
      var pesan = document.getElementById("pesan");

      // reset state
      [nama, noHp, pesan].forEach(function (el) { el.classList.remove("is-invalid"); });

      // validasi nama (wajib, minimal 3 huruf)
      if (nama.value.trim().length < 3) {
        nama.classList.add("is-invalid");
        isValid = false;
      }

      // validasi no HP (wajib, hanya angka, minimal 9 digit)
      var phoneRegex = /^[0-9+\s-]{9,15}$/;
      if (!phoneRegex.test(noHp.value.trim())) {
        noHp.classList.add("is-invalid");
        isValid = false;
      }

      // validasi pesan (wajib, minimal 10 huruf)
      if (pesan.value.trim().length < 10) {
        pesan.classList.add("is-invalid");
        isValid = false;
      }

      var successBox = document.getElementById("formSuccess");
      if (isValid) {
        contactForm.reset();
        successBox.style.display = "block";
        successBox.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(function () { successBox.style.display = "none"; }, 5000);
      } else {
        successBox.style.display = "none";
      }
    });
  }

  /* ---------- 4. Highlight menu navbar sesuai halaman aktif ---------- */
  var current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-gimdu .nav-link").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === current) link.classList.add("active");
  });

});
