import { Component } from '@angular/core';

declare const appData: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'traffic-signs-chart-tests';

	constructor() {
		this.title = appData[0].date;
		setTimeout(() => {
			this.title = appData[2].user;
		}, 5000);
	}
}
