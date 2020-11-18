const fs = require('fs');
const path = require('path');
const { race } = require('rxjs');

const indexHtmlPath =
	"/Users/eliavcohen/Documents/Development/traffic-signs-chart-tests/dist/traffic-signs-chart-tests/index.html";
const deployPath =
	"/Users/eliavcohen/Documents/Development/traffic-signs-android/app/src/main/assets/html/chart.html";
  
deployHtml = (data) => {
	fs.writeFileSync(deployPath, data);
}

const rawHtml = fs.readFileSync(indexHtmlPath, { encoding: 'utf-8' });

const reString = "let appData";
const dataTemp = rawHtml.substring(rawHtml.indexOf(reString) + reString.length + 3,
  	rawHtml.indexOf(reString) +
	rawHtml.substring(rawHtml.indexOf(reString)).indexOf(";"));
	
let placeHtml = rawHtml.replace(dataTemp, "'<<<PLACEHOLDER>>>'");

const reString2 = 'defer>';
let ind = placeHtml.indexOf(reString2)
while (ind > -1) {

	let scriptStart = placeHtml.substring(0, ind).lastIndexOf('<');
	let script = placeHtml.substring(scriptStart, ind + reString2.length + '</script>'.length);
	let scriptUrl = script.substring(script.indexOf('"') + 1, script.lastIndexOf('"'));
	let scriptPath = path.resolve(indexHtmlPath, './..', scriptUrl);
	let scriptContent = fs.readFileSync(scriptPath, { encoding: "utf-8" });
	let newScriptTag = `<script>${scriptContent}</script>`;
	placeHtml = placeHtml.replace(script, newScriptTag);

	ind = placeHtml.indexOf(reString2);
}

deployHtml(placeHtml);