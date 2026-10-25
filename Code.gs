/**
 * Vitality Health Care — COD order receiver
 *
 * SETUP:
 * 1. Create a private Google Sheet with columns:
 *    Timestamp | Order ID | Product | Price | Quantity | Name | Phone | Address | City | State | PIN | Order consent | Marketing consent | Status
 * 2. In that Sheet, open Extensions > Apps Script.
 * 3. Replace the editor contents with this file and Save.
 * 4. Deploy > New deployment > select Web app.
 * 5. Execute as: Me. Access: Anyone (this is needed for public checkout; protect the sheet and monitor spam).
 * 6. Deploy, authorise, copy the Web app URL and paste it into index.html as the form action.
 * 7. Submit a test order and verify the row appears before advertising.
 *
 * Note: Google Apps Script web apps can be abused by spam. Add additional anti-spam
 * protections and review privacy/legal requirements before a public launch.
 */

const SHEET_NAME = 'Orders';

function doPost(e) {
  const p = (e && e.parameter) ? e.parameter : {};
  const required = ['name', 'phone', 'address', 'city', 'state', 'pincode'];
  for (let i = 0; i < required.length; i++) {
    if (!String(p[required[i]] || '').trim()) {
      return HtmlService.createHtmlOutput('<h2>Order not submitted</h2><p>Please go back and complete all required fields.</p>');
    }
  }
  if (p.order_consent !== 'yes') {
    return HtmlService.createHtmlOutput('<h2>Order not submitted</h2><p>Please confirm the order-processing consent.</p>');
  }
  const phone = String(p.phone).replace(/[^\d+]/g, '');
  if (phone.length < 10 || phone.length > 16) {
    return HtmlService.createHtmlOutput('<h2>Order not submitted</h2><p>Please enter a valid phone number.</p>');
  }
  if (!/^\d{6}$/.test(String(p.pincode))) {
    return HtmlService.createHtmlOutput('<h2>Order not submitted</h2><p>Please enter a valid 6-digit PIN code.</p>');
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp','Order ID','Product','Price (INR)','Quantity','Name','Phone','Address','City','State','PIN','Order consent','Marketing consent','Status']);
    sheet.setFrozenRows(1);
  }
  const orderId = 'VHC-' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss') + '-' + Math.floor(100 + Math.random() * 900);
  const qty = Math.max(1, Math.min(2, parseInt(p.quantity || '1', 10) || 1));
  const product = 'Majoon Raig Mahi';
  const price = 2000 * qty;

  sheet.appendRow([
    new Date(), orderId, product, price, qty,
    safeCell(p.name), phone, safeCell(p.address), safeCell(p.city),
    safeCell(p.state), String(p.pincode), 'yes',
    p.marketing_consent === 'yes' ? 'yes' : 'no', 'New'
  ]);

  return HtmlService.createHtmlOutput(
    '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Order received</title>' +
    '<style>body{font-family:Arial,sans-serif;padding:24px;max-width:560px;margin:auto;color:#202823}main{border:1px solid #e3e7e1;border-radius:18px;padding:24px}h1{color:#173c32}p{line-height:1.5}</style></head><body><main>' +
    '<h1>Thank you — order received</h1><p>Your COD order request has been recorded.</p><p><strong>Order reference:</strong> ' + orderId + '</p><p>Keep this reference for customer support. A team member may contact you to confirm delivery details.</p><p>Vitality Health Care</p></main></body></html>'
  );
}

function safeCell(value) {
  const s = String(value || '').trim().slice(0, 500);
  // Prevent spreadsheet formula injection from customer-submitted fields.
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}
