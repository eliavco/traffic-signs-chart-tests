const fs = require('fs');
const path = require('path');
const { race } = require('rxjs');

const indexHtmlPath =
	"/Users/eliavcohen/Documents/Development/traffic-signs-chart-tests/dist/traffic-signs-chart-tests/index.html";
const deployPath =
	"/Users/eliavcohen/Documents/Development/traffic-signs-android/app/src/main/assets/html/chart.html";
  
deployHtml = (data) => {
	fs.writeFileSync(deployPath, data);
	dynamic =
    '[{"date":1589907279154,"grade":90,"id":6,"time":3652,"user":"שאול השמן"},{"date":1572348927456,"grade":85,"id":4,"time":12,"user":"נחמן ביאליק"},{"date":1557664029612,"grade":20,"id":3,"time":54,"user":"שלומציון המלכה"},{"date":1497813852344,"grade":55,"id":2,"time":73,"user":"רחבעם מתיתיה"},{"date":1280987098279,"grade":90,"id":1,"time":2376,"user":"אליאב שלום כהן"}]';
	data = data.replace("<<<PLACEHOLDER>>>", dynamic);
	// fs.writeFileSync(indexHtmlPath, data);
}

const rawHtml = fs.readFileSync(indexHtmlPath, { encoding: 'utf-8' });

const reString = "let appData";
const dataTemp = rawHtml.substring(rawHtml.indexOf(reString) + reString.length + 3,
  	rawHtml.indexOf(reString) +
	rawHtml.substring(rawHtml.indexOf(reString)).indexOf(";"));
	
let placeHtml = rawHtml.replace(dataTemp, "'<<<PLACEHOLDER>>>'");

const scripts = [];
const reString2 = 'defer>';
let ind = placeHtml.indexOf(reString2)
while (ind > -1) {
	
	let scriptStart = placeHtml.substring(0, ind).lastIndexOf('<');
	let script = placeHtml.substring(scriptStart, ind + reString2.length + '</script>'.length);
	let scriptUrl = script.substring(script.indexOf('"') + 1, script.lastIndexOf('"')); let newScriptPlace;
	if (!(script.includes('polyfills') && !script.includes('nomodule'))) {
		let scriptPath = path.resolve(indexHtmlPath, './..', scriptUrl);
		let scriptContent = fs.readFileSync(scriptPath, { encoding: "utf-8" });
		let newScriptTag = `<script>${scriptContent}</script>`;
		newScriptPlace = `!@#$PLACE${ind}HOLDER!@#$`;
		
		scripts.push([newScriptPlace, newScriptTag]);
	} else {
		newScriptPlace = "";
	}
	placeHtml = placeHtml.replace(script, newScriptPlace);

	ind = placeHtml.indexOf(reString2);
}
for (script of scripts) {
	placeHtml = placeHtml.replace(script[0], script[1]);
}

deployHtml(placeHtml);