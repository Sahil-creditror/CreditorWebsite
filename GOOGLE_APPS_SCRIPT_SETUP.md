# Google Sheets Contact Form Integration Guide

This document contains the complete setup instructions and Google Apps Script code for integrating the Creditor Academy website contact form with Google Sheets.

---

## 1. Fields Written to Google Sheet

| Column Header | Source Field | Type | Required | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Submitted At** | Server Generated | Date & Time | Yes | Auto-stamped by Apps Script on arrival |
| **Full Name** | `name` | Text | Yes | User's full name |
| **Email** | `email` | Email | Yes | Validated email address |
| **Phone** | `phone` | Phone | Yes | Contact phone number |
| **Purpose** | `purpose` | Dropdown | Yes | Options: `Query`, `Issue`, `Service`, `Others` |
| **Message** | `message` | Textarea | No | Optional user message/details |

---

## 2. Overview for System Administrators & Access Providers

The website contact form sends verified customer inquiries directly into a Google Spreadsheet using a Google Apps Script Web App. 

### Security & Compliance Highlights
- **Least-Privilege Permissions**: The script only requires access to the specific destination Google Spreadsheet. It does not access emails, Google Drive files, or contacts.
- **Formula Injection Mitigation**: Escapes potentially dangerous leading formula characters (`=`, `+`, `-`, `@`) before appending to cells.
- **Race Condition Protection**: Uses `LockService` to handle simultaneous inquiries without dropping or overwriting data.
- **Client-Side Validation & Server-Side Enforcement**: All fields (`name`, `email`, `phone`, `purpose`, `message`) are validated, sanitized, and length-limited.

---

## 3. Step-by-Step Setup Instructions

### Step 1: Open Google Sheets
1. Create a new Google Sheet (or open your existing inquiries spreadsheet).
2. Name the sheet e.g. `Creditor Academy - Contact Inquiries`.
3. In the top menu bar, click **Extensions** ➔ **Apps Script**.

### Step 2: Paste the Integration Script
1. Delete any boilerplate code inside the script editor (such as `function myFunction() {}`).
2. Copy and paste the entire script from **Section 4** below (or from `package/scripts/google-apps-script-contact-form.js`).
3. Press **Save** (Ctrl + S or Cmd + S).

### Step 3: Run Setup Once
1. In the toolbar at the top of Apps Script, ensure **`setupContactSheet`** is selected in the function dropdown.
2. Click **Run** (Play button).
3. A permission dialog will appear:
   - Click **Review Permissions**.
   - Choose your Google account.
   - Click **Advanced** ➔ **Go to (Untitled project) (unsafe)** ➔ Click **Allow**.
4. In the Execution Log at the bottom, verify it logs:
   `Setup successfully completed! Target Sheet: ...`
5. Switch back to your Google Sheet: you will see a newly formatted tab named **`Contact submissions`** with bold headers:
   `Submitted At` | `Full Name` | `Email` | `Phone` | `Purpose` | `Message`

### Step 4: Deploy as Public Web App
1. At the top-right of the Apps Script window, click the blue **Deploy** button ➔ **New deployment**.
2. Click the **gear icon** (Select type) next to "Select type" and choose **Web app**.
3. Configure the following settings:
   - **Description**: `Creditor Academy Contact Form API`
   - **Execute as**: `Me (<your-email>)`
   - **Who has access**: `Anyone` *(Crucial: allows external website visitors to submit without requiring a Google sign-in)*
4. Click **Deploy**.
5. Copy the generated **Web app URL** (this URL ends with `/exec`).

### Step 5: Configure Website Environment
Provide the Web app URL to the engineering team or paste it into `package/.env.local`:
```env
NEXT_PUBLIC_CONTACT_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

---

## 4. Production Google Apps Script Code

```javascript
/**
 * ============================================================================
 * CREDITOR ACADEMY - CONTACT FORM TO GOOGLE SHEETS INTEGRATION
 * ============================================================================
 */

// OPTIONAL: Only needed if running as a standalone script outside the Sheet
const SPREADSHEET_ID_OR_URL = '';

const SHEET_TAB_NAME = 'Contact submissions';
const EXPECTED_HEADERS = [
  'Submitted At',
  'Full Name',
  'Email',
  'Phone',
  'Purpose',
  'Message'
];

const FIELD_LIMITS = {
  NAME: 200,
  EMAIL: 254,
  PHONE: 50,
  PURPOSE: 50,
  MESSAGE: 5000
};

function setupContactSheet() {
  const spreadsheet = resolveSpreadsheet_();

  let sheet = spreadsheet.getSheetByName(SHEET_TAB_NAME);
  if (!sheet) {
    sheet = spreadsheet.getSheets()[0];
    sheet.setName(SHEET_TAB_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(EXPECTED_HEADERS);
  }

  const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#F1F5F9');

  const headerMap = getHeaderMap_(sheet);
  sheet.getRange(2, headerMap.timestamp, Math.max(sheet.getMaxRows() - 1, 1), 1)
    .setNumberFormat('yyyy-MM-dd HH:mm:ss');

  sheet.setFrozenRows(1);

  PropertiesService.getScriptProperties().setProperty(
    'CONTACT_SPREADSHEET_ID',
    spreadsheet.getId()
  );

  Logger.log('Setup successfully completed! Target Sheet: ' + spreadsheet.getUrl());
}

function doGet() {
  return createJsonResponse_({
    ok: true,
    status: 'ONLINE',
    message: 'Creditor Academy Contact Form endpoint is operational.'
  });
}

function doPost(e) {
  try {
    let spreadsheetId = PropertiesService.getScriptProperties()
      .getProperty('CONTACT_SPREADSHEET_ID');

    if (!spreadsheetId) {
      const ss = resolveSpreadsheet_();
      spreadsheetId = ss.getId();
    }

    const params = e && e.parameter ? e.parameter : {};
    const name = sanitizeInput_(params.name, FIELD_LIMITS.NAME);
    const email = sanitizeInput_(params.email, FIELD_LIMITS.EMAIL);
    const phone = sanitizeInput_(params.phone, FIELD_LIMITS.PHONE);
    const purpose = sanitizeInput_(params.purpose, FIELD_LIMITS.PURPOSE) || 'Query';
    const message = sanitizeInput_(params.message, FIELD_LIMITS.MESSAGE);

    if (!name || !email || !phone) {
      return createJsonResponse_({
        ok: false,
        error: 'Missing required fields: Full Name, Email, and Phone are mandatory.'
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return createJsonResponse_({
        ok: false,
        error: 'Invalid email address format.'
      });
    }

    const targetSheet = SpreadsheetApp.openById(spreadsheetId)
      .getSheetByName(SHEET_TAB_NAME);

    if (!targetSheet) {
      throw new Error(`The '${SHEET_TAB_NAME}' sheet tab was not found.`);
    }

    const headerMap = getHeaderMap_(targetSheet);

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
      const newRow = new Array(targetSheet.getLastColumn()).fill('');
      newRow[headerMap.timestamp - 1] = new Date();
      newRow[headerMap.name - 1] = preventFormulaInjection_(name);
      newRow[headerMap.email - 1] = preventFormulaInjection_(email);
      newRow[headerMap.phone - 1] = preventFormulaInjection_(phone);
      newRow[headerMap.purpose - 1] = preventFormulaInjection_(purpose);
      newRow[headerMap.message - 1] = preventFormulaInjection_(message);

      targetSheet.appendRow(newRow);
    } finally {
      lock.releaseLock();
    }

    return createJsonResponse_({
      ok: true,
      message: 'Contact submission successfully recorded.'
    });

  } catch (error) {
    console.error('Submission Processing Error: ', error);
    return createJsonResponse_({
      ok: false,
      error: 'An internal error occurred while saving the submission.'
    });
  }
}

function resolveSpreadsheet_() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss && SPREADSHEET_ID_OR_URL && SPREADSHEET_ID_OR_URL.trim() !== '') {
    const raw = SPREADSHEET_ID_OR_URL.trim();
    const idMatch = raw.match(/\/d\/([a-zA-Z0-9-_]+)/);
    const id = idMatch ? idMatch[1] : raw;
    ss = SpreadsheetApp.openById(id);
  }
  if (!ss) {
    throw new Error(
      'Target spreadsheet could not be found. Please open Apps Script directly from the sheet (Extensions > Apps Script), or set SPREADSHEET_ID_OR_URL.'
    );
  }
  return ss;
}

function getHeaderMap_(sheet) {
  const headers = sheet
    .getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1))
    .getDisplayValues()[0]
    .map(function (header) {
      return String(header).trim().toLowerCase();
    });

  const aliases = {
    timestamp: ['submitted at', 'timestamp', 'date'],
    name: ['full name', 'name'],
    email: ['email', 'email address'],
    phone: ['phone', 'phone number', 'contact'],
    purpose: ['purpose', 'inquiry type', 'reason', 'service type'],
    message: ['message', 'inquiry', 'notes']
  };

  const headerMap = {};

  Object.keys(aliases).forEach(function (key) {
    const matchedColIndex = headers.findIndex(function (h) {
      return aliases[key].indexOf(h) !== -1;
    });

    if (matchedColIndex === -1) {
      throw new Error(`Required column '${aliases[key].join(' / ')}' not found in row 1.`);
    }

    headerMap[key] = matchedColIndex + 1;
  });

  return headerMap;
}

function sanitizeInput_(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function preventFormulaInjection_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function createJsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```
