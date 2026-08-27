# Batjin Negdekh Urs — Digital Business Card

The company’s digital business card for Batnyam Jadambaa, hosted free on GitHub Pages.

**Website:** https://jamyan99.github.io/Batjin-negdekh-urs/

**Publication status:** Live on GitHub Pages. The QR PNG and rendered SVG were decoded and verified against the exact website URL. Please test a physical print with a phone before printing a full batch.

## Files

- `index.html` — digital card, with Mongolian and English language options.
- `assets/` — original branding, locally hosted fonts, styles, scripts, and contact file.
- `qr/batjin-digital-card-qr.png` — print-resolution QR code.
- `qr/batjin-digital-card-qr.svg` — scalable QR code for design and print.

## Hosting

GitHub Pages: **Deploy from a branch → main → /(root)**. No custom domain or build system is required.

Update `index.html` and `assets/js/config.js` together when contact details change; also update `assets/contact/batnyam-jadambaa.vcf`. Commit updates to `main` to republish. Keep the website URL unchanged so printed QR codes continue working.

The location link searches Google Maps using the supplied address; no unverified map pin is used. Saving contacts and opening phone/email apps depend on the visitor’s device.

QR PNG: 1640 × 1640 px. Both formats use black modules on white, a four-module quiet zone, and error correction Q. Keep the white border intact.
