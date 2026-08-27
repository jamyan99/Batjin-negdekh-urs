/**
 * BATJIN digital business card — shared page logic.
 * Reads window.BATJIN_CARD_CONFIG (set by each employee's config.js) and
 * window.BATJIN_CARD_STRINGS (shared/i18n.js) and fills in the page. This
 * file is identical for every employee; only config.js should differ.
 */
(function () {
  "use strict";

  var cfg = window.BATJIN_CARD_CONFIG;
  var STRINGS = window.BATJIN_CARD_STRINGS;
  if (!cfg) {
    console.error("BATJIN card: config.js did not load before script.js");
    return;
  }

  var LANG_KEY = "batjinCardLang";
  var lang = document.documentElement.lang === "mn" ? "mn" : "en";

  function $(id) {
    return document.getElementById(id);
  }

  function t() {
    return (STRINGS && STRINGS[lang]) || {};
  }

  function localized(baseField, mnField) {
    if (lang === "mn" && cfg[mnField]) return cfg[mnField];
    return cfg[baseField];
  }

  function localizedAddress() {
    if (lang === "mn" && cfg.addressMn) return cfg.addressMn;
    return cfg.address || {};
  }

  function isRealUrl(value) {
    return typeof value === "string" && /^https?:\/\//i.test(value) && !/YOUR-DOMAIN-HERE|MAP_URL$/i.test(value);
  }

  function fullAddress() {
    var a = cfg.address || {};
    return [a.line1, a.line2, a.line3].filter(Boolean).join(", ");
  }

  function mapsHref() {
    if (isRealUrl(cfg.mapURL)) return cfg.mapURL;
    // Fallback: a standard Google Maps text search built from the verified
    // address on file — never invented coordinates. Replace cfg.mapURL with
    // a confirmed pinned location URL as soon as BATJIN provides one.
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(fullAddress() + ", " + cfg.company);
  }

  function renderIdentity() {
    var name = localized("name", "nameMn");
    var company = localized("company", "companyMn");

    document.title = name + " — " + company;
    $("personName").textContent = name;
    $("personPosition").textContent = localized("position", "positionMn");

    var avatarImg = $("avatarImg");
    if (cfg.profilePhoto) {
      avatarImg.src = cfg.profilePhoto;
      avatarImg.alt = name;
      avatarImg.parentElement.classList.add("identity__logo--photo");
    } else {
      avatarImg.src = cfg.logoLight;
      avatarImg.alt = company;
    }
  }

  function renderSaveContact() {
    var btn = $("saveContactBtn");
    // Deliberately no `download` attribute: on iOS Safari, navigating to a
    // URL served with a text/vcard content type opens the native "Add
    // Contact" sheet directly, which is the experience we want. Adding
    // `download` forces a raw file save instead on some iOS versions. See
    // README.md "Save Contact behaves differently per platform" if Android
    // needs different handling for your hosting setup.
    btn.href = cfg.vcfPath;
    $("saveContactLabel").textContent = t().save;
    btn.setAttribute("aria-label", t().saveAriaLabel(localized("name", "nameMn")));
  }

  function renderQuickActions() {
    var strings = t();

    $("actionCallLabel").textContent = strings.call;
    $("actionCall").href = cfg.phoneHref;
    $("actionCall").setAttribute("aria-label", strings.call + " " + cfg.phone);

    $("actionEmailLabel").textContent = strings.email;
    $("actionEmail").href = "mailto:" + cfg.email;
    $("actionEmail").setAttribute("aria-label", strings.email + " " + cfg.email);

    $("actionLocationLabel").textContent = strings.location;
    $("actionLocation").href = mapsHref();
    $("actionLocation").target = "_blank";
    $("actionLocation").rel = "noopener";
    $("actionLocation").setAttribute("aria-label", strings.location);

    $("actionShareLabel").textContent = strings.share;
    $("actionShare").setAttribute("aria-label", strings.share);
  }

  function renderContactDetails() {
    var strings = t();

    $("labelPhone").textContent = strings.labelPhone;
    $("detailPhone").textContent = cfg.phone;
    $("detailPhone").href = cfg.phoneHref;

    $("labelEmail").textContent = strings.labelEmail;
    $("detailEmail").textContent = cfg.email;
    $("detailEmail").href = "mailto:" + cfg.email;

    $("labelAddress").textContent = strings.labelAddress;
    var a = localizedAddress();
    $("detailAddress").href = mapsHref();
    $("detailAddress").innerHTML = [a.line1, a.line2, a.line3].filter(Boolean).join("<br>");

    var websiteField = $("websiteField");
    if (isRealUrl(cfg.website)) {
      $("labelWebsite").textContent = strings.labelWebsite;
      $("detailWebsite").textContent = cfg.website.replace(/^https?:\/\//i, "");
      $("detailWebsite").href = cfg.website;
    } else if (websiteField) {
      // No public BATJIN domain yet — remove the field entirely rather than
      // showing "TBA" or a broken link, and let Address take the full row.
      websiteField.remove();
      $("addressField").style.gridColumn = "1 / -1";
    }
  }

  function renderFooter() {
    var company = localized("company", "companyMn");
    $("footerText").textContent = company + " · " + t().footerTagline;
  }

  function render() {
    document.documentElement.lang = lang;
    renderIdentity();
    renderSaveContact();
    renderQuickActions();
    renderContactDetails();
    renderFooter();
  }

  function setLang(next) {
    lang = next;
    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      /* private browsing or storage disabled — fine, just don't persist */
    }
    $("langEn").setAttribute("aria-pressed", String(lang === "en"));
    $("langMn").setAttribute("aria-pressed", String(lang === "mn"));
    render();
  }

  function showToast(message) {
    var toast = $("toast");
    toast.textContent = message;
    toast.classList.add("toast--visible");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(function () {
      toast.classList.remove("toast--visible");
    }, 2200);
  }

  function handleShare() {
    var name = localized("name", "nameMn");
    var company = localized("company", "companyMn");
    var shareData = {
      title: name + " — " + company,
      text: name + "\n" + localized("position", "positionMn") + "\n" + company,
      url: isRealUrl(cfg.digitalCardURL) ? cfg.digitalCardURL : window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(function () {
        /* user cancelled — no-op */
      });
      return;
    }

    var text = shareData.text + "\n" + shareData.url;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(function () {
          showToast(t().copied);
        })
        .catch(function () {
          window.prompt("Copy this link:", shareData.url);
        });
    } else {
      window.prompt("Copy this link:", shareData.url);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    try {
      var saved = window.localStorage.getItem(LANG_KEY);
      if (saved === "en" || saved === "mn") lang = saved;
    } catch (e) {
      /* Keep the language provided by the static HTML. */
    }

    $("langEn").setAttribute("aria-pressed", String(lang === "en"));
    $("langMn").setAttribute("aria-pressed", String(lang === "mn"));
    $("langEn").addEventListener("click", function () {
      setLang("en");
    });
    $("langMn").addEventListener("click", function () {
      setLang("mn");
    });

    $("actionShare").addEventListener("click", handleShare);

    render();
  });
})();
