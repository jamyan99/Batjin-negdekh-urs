/**
 * BATJIN digital business card — per-employee configuration.
 * To add a new employee: copy this whole `employees/batnyam/` folder,
 * rename it, and edit every field below. See README.md "Reuse for
 * another employee" section for the full checklist.
 */
window.BATJIN_CARD_CONFIG = {
  // ---- Identity ----
  name: "Batnyam Jadambaa",
  firstName: "Batnyam",
  lastName: "Jadambaa",
  position: "General Director",
  company: "BATJIN NEGDEKH URS",

  // ---- Identity (Mongolian) ----
  // Shown when the viewer picks "MN" with the EN/MN toggle. The logo image
  // itself always shows the Latin "BATJIN NEGDEKH URS" wordmark (there is
  // no Cyrillic logo variant), so only the surrounding text switches.
  nameMn: "Батням Жадамбаа",
  positionMn: "Ерөнхий захирал",
  companyMn: "БАТЖИН НЭГДЭХ ҮРС",

  // ---- Contact ----
  phone: "+976 9911 4470",
  phoneHref: "tel:+97699114470",
  email: "Batnyamd@yahoo.com",
  address: {
    line1: "Chingeltei District",
    line2: "1st Khoroo, 8-1",
    line3: "Ulaanbaatar, Mongolia",
  },
  addressMn: {
    line1: "Чингэлтэй дүүрэг",
    line2: "1-р хороо, 8-1",
    line3: "Улаанбаатар, Монгол улс",
  },

  // Website: BATJIN does not have a public domain yet. Leave this as
  // null — the UI hides the website row entirely instead of showing
  // "TBA". Set it to a full URL (e.g. "https://batjin.mn") the moment
  // one exists; no other code changes are needed.
  website: null,

  // TODO(BATJIN): replace with a verified Google Maps or Apple Maps
  // link for the office (search.google.com/local or maps.apple.com
  // share link). Do not invent coordinates.
  mapURL: null,

  // Permanent free GitHub Pages address, also used by the Share button.
  digitalCardURL: "https://jamyan99.github.io/Batjin-negdekh-urs/",

  // Optional professional portrait. Leave null to show the BATJIN
  // symbol as the identity mark instead (current default — no fake
  // portrait is used). To add one later, drop an image into
  // assets/photo/ and point this at it, e.g. "assets/photo/batnyam.jpg".
  profilePhoto: null,

  // Shared brand assets (relative to this employee folder). The current
  // page design is white-background only, so script.js only reads
  // logoLight/symbolLight today. logoDark/symbolDark are kept here ready
  // for a future dark-theme variant of the page.
  logoLight: "assets/logos/batjin-logo-light-web.png",
  logoDark: "assets/logos/batjin-logo-dark-web.png",
  symbolLight: "assets/logos/batjin-symbol-on-light-web.png",
  symbolDark: "assets/logos/batjin-symbol-on-dark-web.png",

  // This employee's own generated files.
  vcfPath: "assets/contact/batnyam-jadambaa.vcf",
  vcfFileName: "batnyam-jadambaa.vcf",
};
