import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

/**
 * @type {GoogleSpreadsheet | null}
 */
let doc = null;

/**
 * @returns {Promise<GoogleSpreadsheetWorksheet>}
 */
export async function getSheet () {
	if (doc === null) {
		const serviceAuth = new JWT({
			email: process.env.GOOGLE_CLIENT_EMAIL,
			key: process.env.GOOGLE_PRIVATE_KEY,
			scopes: ['https://www.googleapis.com/auth/spreadsheets'],
		});

		doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID, serviceAuth);
		await doc.loadInfo();
	}

	return doc.sheetsByTitle[process.env.GOOGLE_SHEETS_SHEET_NAME];
}
