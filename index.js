import { configDotenv } from "dotenv";
import { getSheet } from "./getSheet.js";
import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';

configDotenv();

const templatePage = fs.readFileSync("template.html");
const templateGobbo = fs.readFileSync("template-gobbo.html");

const fillGobboTemplate = (name = "", count = 0) => {
	if (name === "" || count === 0) return '';

	let newTemplate = `${templateGobbo}`;
	let hashedUsername = createHash('sha256').update(name.toLowerCase()).digest('hex');

	const imagePath = fs.existsSync(`./images/${hashedUsername}.png`)
		? `./images/${hashedUsername}.png`
		: './images/default.png';

	const images = Array.from({ length: count }).map((_, index) => (
		`<img src="${imagePath}" />\n`
	)).join("");

	newTemplate = newTemplate.replace(/{{gobbo-images}}/, images);
	newTemplate = newTemplate.replace(/{{gobbo-name}}/, name);
	newTemplate = newTemplate.replace(/{{gobbo-count}}/, count);

	return newTemplate;
}

const fillPageTemplate = (gobbos = "") => {
	let newTemplate = `${templatePage}`;
	newTemplate = newTemplate.replace(/{{gobbo-list}}/, gobbos);

	return newTemplate;
}

async function main () {
	const sheet = await getSheet();
	const rows = await sheet.getRows();

	const colName = process.env.GOOGLE_SHEETS_COL_NAME ?? 'Name';
	const colCount = process.env.GOOGLE_SHEETS_COL_COUNT ?? 'Count';
	const outDir = process.env.OUTPUT_DIR ?? '';
	const outFile = path.join(outDir, 'index.html');

	rows.sort((a, b) => b.get(colCount) - a.get(colCount));

	const gobboHtml = rows.map(row => fillGobboTemplate(row.get(colName), row.get(colCount))).join("");
	const finalFile = fillPageTemplate(gobboHtml);

	if (!fs.existsSync(outDir)) {
		fs.mkdirSync(outDir);
	}

	fs.writeFileSync(outFile, finalFile);
	fs.cpSync("images/", path.join(outDir, 'images'), { recursive: true });
}

main();
