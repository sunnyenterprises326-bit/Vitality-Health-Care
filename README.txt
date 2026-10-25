 VITALITY HEALTH CARE WEBSITE — MOBILE SETUP

Files included:
- index.html: green-and-white product/order landing page (no personal phone number or customer-support contact displayed)
- logo-green.png: your logo recoloured from blue to green
- product-closed.png: original closed jar + box photo (no 125g marking)
- product-open-crop.jpg: crop of your original open-jar photo focused on the open jar, excluding the visible 125g marking on the box
- Code.gs: Google Apps Script to receive form orders in a private Google Sheet

IMPORTANT: This website is not yet live and the order form is not connected. Do not run ads until you connect and test the form.

ORDER FORM SETUP
1. Create a Google Sheet for orders. Keep it private.
2. In the sheet, open Extensions > Apps Script. Paste the contents of Code.gs and save.
3. Deploy > New deployment > select Web app. Execute as: Me. Who has access: Anyone (needed for public form submission). Deploy and authorize.
4. Copy the Web app URL. In index.html, find PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE and replace it with that URL. Save.
5. Test a fake order and confirm it appears in your private Sheet before publishing.

FREE HOSTING
Use GitHub Pages: create/sign in to GitHub, create a public repository, upload all files in this folder to the repository root, then Settings > Pages > Deploy from a branch > main > /(root) > Save. Wait for the provided Pages URL. Test the form after connecting it.

Before advertising/selling, verify that you are legally allowed to market this product and confirm required licence, manufacturer, ingredients, net quantity, batch/expiry, warnings, directions, privacy policy, shipping/return terms and any applicable medicine/ad rules. This page intentionally does not make unverified medical claims.
