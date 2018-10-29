import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';

@Component({
	selector: 'bwm-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent {

	@Input() location: string;
	isPositionError: boolean = false;

	lat: number;
	lng: number;

	constructor(private mapService: MapService,
		private ref: ChangeDetectorRef) { }

	mapReadyHandler() {
		let currentLocation = this.location;

		// if (Math.round(Math.random()*10) > 5) {
		// 	currentLocation = "fdfergergthna";
		// }

		this.mapService.getGeoLocation(currentLocation).subscribe(
			(coordinates) => {
				this.lat = coordinates.lat;
				this.lng = coordinates.lng;

				this.ref.detectChanges();
			}, () => {
				this.isPositionError = true;
			});
	}
}
