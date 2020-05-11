import { Component } from '@angular/core';
import { Filefetcher, FileMetaData } from './filefetcher.service';

@Component({
	selector: 'Files',
	template: `
			<h2>{{ title }}</h2>
			<img [src]="titleImage" />
			<input [(ngModel)]="loginId" (keyup.enter)="onKeyUpLoginId()" [appFormatDate]="'My'"/>
			<input #password (keyup.enter)="onKeyUp(password.value)"/>
			<br/>
			<ul>
				<li *ngFor="let fileData of files; index as i; even as isEven; trackBy: tracking">
					{{i+1}}. -
					{{fileData.uuid}} -
					{{fileData.name | uppercase }} -
					{{fileData.size | number}} -
					{{fileData.creationDateTime | date:'fullDate'}} -
					{{fileData.lastModificationDateTime | mydate:true }} -
					<button (click)="onRemove(fileData)">Remove</button>
					<span *ngIf="isEven"> - EVEN_ROW</span>
					<br/>
				</li>
			</ul>
			<button class="btn btn-primary"
			        [class.active]="isActive"
					[style.backgroundColor]="isActive?'blue':'gray'"
					(click)="onAdd($event)">Add</button>
			<button class="btn btn-primary"
					[ngStyle]="{
						'color': isActive ? 'white' : 'black',
					    'backgroundColor': isActive ? 'blue' : 'gray'

					}"
					(click)="onReload()">Reload</button>
			<br>
			<br>

			`
})
export class FilesearchComponent {
title = 'List of files';
loginId = 'Max';
titleImage = 'file:///C:/dev/eclipse/workspaces/Angular/FileServer/src/app/images/Files.jpg';
isActive = true;
firstFile = {
	uuid: '12345',
	name: 'readme.txt',
	size: 3636742,
	creationDateTime: new Date(2019, 10, 4),
	lastModificationDateTime: new Date(2019, 11, 13)
}
files : FileMetaData[]
fetchService: Filefetcher

	constructor(fetchService: Filefetcher) {
		this.fetchService = fetchService;
		this.onReload();
	}

	onReload() {
		this.files = this.fetchService.doYourJob();
	}
	
	onAdd($event) {
		this.files.push(this.firstFile);
	}	

	onRemove(fileData) {
		let index = this.files.indexOf(fileData);
		this.files.splice(index, 1);
	}

	onKeyUpLoginId() {
		console.log(this.loginId);
	}

	onKeyUp(password) {
		console.log(password);
	}

	tracking(index, fileData ) {
		return fileData ? fileData.uuid : undefined;
	}
}

