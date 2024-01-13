import { configDotenv } from "dotenv";
import { getSheet } from "./getSheet.js";
import fs from 'fs';

configDotenv();

const templatePage = fs.readFileSync("template.html");
const templateGobbo = fs.readFileSync("template-gobbo.html");

const fillGobboTemplate = (name = "", count = 0) => {
	let newTemplate = `${templateGobbo}`;

	const images = Array.from({ length: count }).map((_, index) => (
		`<img src="./gobbo.png" />`
	)).join("");

	newTemplate = newTemplate.replace(/{{gobbo-images}}/, images);
	newTemplate = newTemplate.replace(/{{gobbo-name}}/, name);

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
	const gobboHtml = rows.map(row => fillGobboTemplate(row.get("Name"), row.get("Count"))).join("");
	const finalFile = fillPageTemplate(gobboHtml);
	fs.writeFileSync(process.env.OUTPUT_FILE_NAME ?? "output.html", finalFile);
}

main();
