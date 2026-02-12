const DATA_SPREADSHEET_ID = ""; // Optional

// --- CONFIG ---
function setup() {
    const scriptProperties = PropertiesService.getScriptProperties();
    if (!scriptProperties.getProperty('ADMIN_PASSWORD')) {
        scriptProperties.setProperty('ADMIN_PASSWORD', 'admin123');
    }
}

function doGet(e) {
    const action = e.parameter.action;
    if (action === 'getEventList') return getEventList();
    if (action === 'getData') return getData(e.parameter.eventId);
    return ContentService.createTextOutput("Unknown Action");
}

function doPost(e) {
    const body = JSON.parse(e.postData.contents);
    const action = body.action;

    if (action === 'login') return handleLogin(body.password);
    if (action === 'changePassword') return handleChangePassword(body.oldPassword, body.newPassword);
    if (action === 'updateAll') return updateAll(body.eventId, body.payload);
    if (action === 'createEvent') return createEvent(body.eventId);

    return responseJSON({ success: false });
}

// --- AUTH ---
function handleLogin(password) {
    const stored = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD') || 'admin123';
    return responseJSON({ success: password === stored, token: password === stored ? "valid" : null });
}

function handleChangePassword(oldPass, newPass) {
    const props = PropertiesService.getScriptProperties();
    const stored = props.getProperty('ADMIN_PASSWORD') || 'admin123';
    if (oldPass !== stored) return responseJSON({ success: false, message: "Password lama salah" });
    props.setProperty('ADMIN_PASSWORD', newPass);
    return responseJSON({ success: true });
}

// --- DATA ---
function getEventList() {
    const sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
    return responseJSON(sheets.map(s => s.getName()).filter(n => n !== 'Config'));
}

function getData(eventId) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(eventId);
    if (!sheet) return responseJSON(null);

    // Read Settings (A2:B20)
    const settingsData = sheet.getRange("A2:B20").getValues();
    const settings = {};
    settingsData.forEach(row => { if (row[0]) settings[row[0]] = row[1]; });

    // Read Links (D2:I100) -> ID, Label, URL, Icon, Active
    const linksData = sheet.getRange("D2:I100").getValues(); // Increased range just in case
    const links = linksData.filter(r => r[0]).map(r => ({
        id: r[0], label: r[1], url: r[2], icon: r[3], active: r[4] === true
    }));

    // Read Facilitators (K2:P50) -> ID, Name, Unit, Photo, Setup(unused), WA
    const facData = sheet.getRange("K2:P50").getValues();
    const facilitators = facData.filter(r => r[0]).map(r => ({
        id: r[0], name: r[1], unit: r[2], photo: r[3], region: r[4], whatsapp: r[5]
    }));

    return responseJSON({ settings, links, facilitators });
}

function updateAll(eventId, payload) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(eventId);
    if (!sheet) sheet = ss.insertSheet(eventId);

    sheet.clear(); // Clear all to avoid remnants

    // Headers
    sheet.getRange("A1:B1").setValues([["Setting Key", "Value"]]).setFontWeight("bold").setBackground("#f3f4f6");
    sheet.getRange("D1:H1").setValues([["ID", "Label", "URL", "Icon", "Active"]]).setFontWeight("bold").setBackground("#dbeafe");
    sheet.getRange("K1:P1").setValues([["ID", "Name", "Unit", "Photo", "Region", "WhatsApp"]]).setFontWeight("bold").setBackground("#dcfce7");

    // Write Settings
    const settingsEntries = Object.entries(payload.settings);
    if (settingsEntries.length > 0) {
        sheet.getRange(2, 1, settingsEntries.length, 2).setValues(settingsEntries);
    }

    // Write Links
    if (payload.links.length > 0) {
        const linkRows = payload.links.map(l => [l.id, l.label, l.url, l.icon, l.active]);
        sheet.getRange(2, 4, linkRows.length, 5).setValues(linkRows);
    }

    // Write Facilitators
    if (payload.facilitators.length > 0) {
        const facRows = payload.facilitators.map(f => [f.id, f.name, f.unit, f.photo, f.region, f.whatsapp]);
        sheet.getRange(2, 11, facRows.length, 6).setValues(facRows);
    }

    return responseJSON({ success: true });
}

function createEvent(eventId) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss.getSheetByName(eventId)) return responseJSON({ success: false, message: "Existed" });

    const sheet = ss.insertSheet(eventId);
    // Initial Structure
    updateAll(eventId, {
        settings: {
            title: 'New Event', description: 'Welcome',
            logo_url: 'https://placehold.co/400', background_color: '#f8fafc',
            theme_color: '#3b82f6', layout_style: 'stack', show_facilitators: true
        },
        links: [],
        facilitators: []
    });

    return responseJSON({ success: true });
}

function responseJSON(data) {
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
