import { AfterViewInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { Test } from './models/test';
import Chart from 'chart.js';

declare const appData: Test[];

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
	@ViewChild('mainTestChart') canvas: ElementRef<HTMLCanvasElement>;
	context: CanvasRenderingContext2D;
	chart: Chart;
	chartData = {
		// tslint:disable-next-line: max-line-length
		time: appData.map(test => ({ x: test.date, y: Math.floor(test.time * 2 / (Math.max(...appData.map(d => d.grade)) - Math.min(...appData.map(d => d.grade)))) })),
		grade: appData.map(test => ({ x: test.date, y: test.grade })),
	};
	settings = {
		type: 'line',
		data: {
			datasets: [{
				label: 'ציון',
				data: this.chartData.grade,
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgb(54, 162, 235)',
				borderWidth: 1
			}, {
				label: 'זמן',
				data: this.chartData.time,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgb(255, 99, 132)',
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}],
				xAxes: [{
					type: 'time',
					time: {
						unit: 'day'
					}
				}]
			}
		}
	};

	constructor() { }

	ngAfterViewInit(): void {
		this.context = this.canvas.nativeElement.getContext('2d');
		this.chart = new Chart(this.context, this.settings);
	}
}
