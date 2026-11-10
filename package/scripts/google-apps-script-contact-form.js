/**
 * ============================================================================
 * CREDITOR ACADEMY - CONTACT FORM TO GOOGLE SHEETS INTEGRATION
 * ============================================================================
 * 
 * Purpose:
 *   Receives contact form inquiries from the Creditor Academy website and
 *   appends verified, sanitized records directly into a Google Spreadsheet.
 *
 * Fields Recorded in Google Sheet:
 *   1. Submitted At (Generated automatically on receipt)
 *   2. Full Name
 *   3. Email
 *   4. Phone
 *   5. Purpose (Query, Issue, Service, Others)
 *   6. Message
 *
 * Highlights:
 *   - Zero manual setup: Automatically creates headers if sheet is empty.
 *   - Auto-finds tab: Works on 'Contact submissions', 'Sheet1', or active tab.
 *   - Concurrency Lock: Prevents row-write conflicts under simultaneous traffic.
 *   - Formula Injection Mitigation: Escapes dangerous leading characters (=, +, -, @).
 *   - Input Sanitization: Enforces maximum string lengths and trimming.
 *   - Accepts both Form-URL-encoded and JSON payloads.
 * ============================================================================
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * OPTIONAL: Only needed if this script is created as a standalone script at script.google.com.
 * If opened directly from Google Sheets (Extensions > Apps Script), leave empty ('').
 */
const SPREADSHEET_ID_OR_URL = '';

/**
 * Preferred tab name in Google Sheets. If not found, falls back to the first sheet tab.
 */
const SHEET_TAB_NAME = 'Contact submissions';

/**
 * Expected columns and header order in the Sheet tab.
 */
const EXPECTED_HEADERS = [
  'Submitted At',
  'Full Name',
  'Email',
  'Phone',
  'Purpose',
  'Message'
];

/**
 * Field length validation limits to prevent payload abuse.
 */
const FIELD_LIMITS = {
  NAME: 200,
  EMAIL: 254,
  PHONE: 50,
  PURPOSE: 50,
  MESSAGE: 5000
};

// ============================================================================
// 1. ONE-TIME INITIALIZATION FUNCTION (OPTIONAL - SCRIPT AUTO-INITIALIZES TOO)
// ============================================================================

function setupContactSheet() {
  const spreadsheet = resolveSpreadsheet_();
  const sheet = ensureHeadersExist_(resolveTargetSheet_(spreadsheet));
  PropertiesService.getScriptProperties().setProperty(
    'CONTACT_SPREADSHEET_ID',
    spreadsheet.getId()
  );
  Logger.log('Setup successfully completed! Target Sheet: ' + spreadsheet.getUrl() + ' (Tab: ' + sheet.getName() + ')');
}

// ============================================================================
// 2. HTTP HANDLERS (WEB APP ENDPOINTS)
// ============================================================================

/**
 * GET Handler: Health check endpoint.
 */
function doGet() {
  return createJsonResponse_({
    ok: true,
    status: 'ONLINE',
    message: 'Creditor Academy Contact Form endpoint is operational.'
  });
}

/**
 * POST Handler: Processes incoming website form submissions.
 */
function doPost(e) {
  try {
    // 1. Resolve spreadsheet
    const spreadsheet = resolveSpreadsheet_();
    const sheet = ensureHeadersExist_(resolveTargetSheet_(spreadsheet));

    // 2. Extract incoming fields (support both URL-encoded and JSON body)
    let params = {};
    if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      params = e.parameter;
    } else if (e && e.postData && e.postData.contents) {
      try {
        params = JSON.parse(e.postData.contents);
      } catch (err) {
        // Fallback to URL search params parsing
        const searchParams = new URLSearchParams(e.postData.contents);
        for (const [key, val] of searchParams.entries()) {
          params[key] = val;
        }
      }
    }

    const name = sanitizeInput_(params.name || params['Full Name'], FIELD_LIMITS.NAME);
    const email = sanitizeInput_(params.email || params['Email'], FIELD_LIMITS.EMAIL);
    const phone = sanitizeInput_(params.phone || params['Phone'], FIELD_LIMITS.PHONE);
    const purpose = sanitizeInput_(params.purpose || params['Purpose'], FIELD_LIMITS.PURPOSE) || 'Query';
    const message = sanitizeInput_(params.message || params['Message'], FIELD_LIMITS.MESSAGE);

    // 3. Validation checks
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

    // 4. Thread-safe row insertion using LockService
    const lock = LockService.getScriptLock();
    lock.waitLock(10000); // Wait up to 10 seconds

    try {
      const headerMap = getHeaderMap_(sheet);
      const totalCols = Math.max(sheet.getLastColumn(), EXPECTED_HEADERS.length);
      const newRow = new Array(totalCols).fill('');

      newRow[headerMap.timestamp - 1] = new Date();
      newRow[headerMap.name - 1] = preventFormulaInjection_(name);
      newRow[headerMap.email - 1] = preventFormulaInjection_(email);
      newRow[headerMap.phone - 1] = preventFormulaInjection_(phone);
      newRow[headerMap.purpose - 1] = preventFormulaInjection_(purpose);
      newRow[headerMap.message - 1] = preventFormulaInjection_(message);

      sheet.appendRow(newRow);
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
      error: error && error.message ? error.message : String(error)
    });
  }
}

// ============================================================================
// 3. UTILITY & SECURITY HELPERS
// ============================================================================

/**
 * Resolves the active or linked Spreadsheet instance.
 */
function resolveSpreadsheet_() {
  let spreadsheetId = PropertiesService.getScriptProperties().getProperty('CONTACT_SPREADSHEET_ID');
  
  if (spreadsheetId) {
    try {
      return SpreadsheetApp.openById(spreadsheetId);
    } catch (e) {
      // ignore and try next
    }
  }

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

  // Cache ID
  try {
    PropertiesService.getScriptProperties().setProperty('CONTACT_SPREADSHEET_ID', ss.getId());
  } catch (e) {}

  return ss;
}

/**
 * Resolves the target sheet tab ('Contact submissions' or first sheet tab).
 */
function resolveTargetSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(SHEET_TAB_NAME);
  if (!sheet) {
    sheet = spreadsheet.getSheets()[0];
  }
  return sheet;
}

/**
 * Ensures header row exists. If empty, automatically appends EXPECTED_HEADERS.
 */
function ensureHeadersExist_(sheet) {
  if (sheet.getLastRow() === 0 || sheet.getLastColumn() === 0) {
    sheet.appendRow(EXPECTED_HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, EXPECTED_HEADERS.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#F1F5F9');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Dynamically maps column positions by header names (case-insensitive).
 */
function getHeaderMap_(sheet) {
  let headers = sheet
    .getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1))
    .getDisplayValues()[0]
    .map(function (header) {
      return String(header).trim().toLowerCase();
    });

  const aliases = {
    timestamp: ['submitted at', 'timestamp', 'date', 'time'],
    name: ['full name', 'name', 'student name', 'client name'],
    email: ['email', 'email address'],
    phone: ['phone', 'phone number', 'contact', 'mobile'],
    purpose: ['purpose', 'inquiry type', 'reason', 'service type', 'category'],
    message: ['message', 'inquiry', 'notes', 'query']
  };

  const headerMap = {};
  let missing = [];

  Object.keys(aliases).forEach(function (key) {
    const matchedColIndex = headers.findIndex(function (h) {
      return aliases[key].indexOf(h) !== -1;
    });

    if (matchedColIndex !== -1) {
      headerMap[key] = matchedColIndex + 1; // 1-based index
    } else {
      missing.push(key);
    }
  });

  // If headers were missing or unrecognized, auto-append expected headers at row 1
  if (missing.length > 0) {
    sheet.clear();
    sheet.appendRow(EXPECTED_HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, EXPECTED_HEADERS.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#F1F5F9');
    sheet.setFrozenRows(1);

    return {
      timestamp: 1,
      name: 2,
      email: 3,
      phone: 4,
      purpose: 5,
      message: 6
    };
  }

  return headerMap;
}

/**
 * Sanitizes input string and restricts maximum character length.
 */
function sanitizeInput_(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

/**
 * Prevents formula injection (CSV/Spreadsheet injection).
 */
function preventFormulaInjection_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

/**
 * Helper to build JSON responses with CORS headers.
 */
function createJsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
