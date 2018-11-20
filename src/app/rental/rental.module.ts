import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgPipesModule, UcWordsPipe } from 'ngx-pipes';
import { Daterangepicker } from 'ng2-daterangepicker';

import { EditableModule } from '../common/components/editable/editable.module';
import { MapModule } from '../common/map/map.module';
import { ImageUploadModule }
	from '../common/components/image-upload/image-upload.module';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent }
	from './rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalDetailBookingComponent } from
	'./rental-detail/rental-detail-booking/rental-detail-booking.component';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';
import { RentalUpdateComponent } from './rental-update/rental-update.component';

import { RentalService } from './shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';
import { HelperService } from '../common/service/helper.service';

import { UppercasePipe } from '../common/pipes/uppercase.pipe';

import { AuthGuard } from '../auth/shared/auth.guard';
import { RentalGuard } from '../rental/shared/rental.guard';

const routes: Routes = [{
	path: 'rentals',
	component: RentalComponent,
	children: [
		{ path: '', component: RentalListComponent },
		{ path: 'new', component: RentalCreateComponent,
			canActivate: [AuthGuard]
		},
		{ path: ':rentalId/edit', component: RentalUpdateComponent,
			canActivate: [AuthGuard, RentalGuard]
		},
		{ path: ':rentalId', component: RentalDetailComponent },
		{ path: ':city/homes', component: RentalSearchComponent }
	]
}];

@NgModule({
	declarations: [
		RentalComponent,
		RentalListComponent,
		RentalListItemComponent,
		RentalDetailComponent,
		RentalDetailBookingComponent,
		UppercasePipe,
		RentalSearchComponent,
		RentalCreateComponent,
		RentalUpdateComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		HttpClientModule,
		FormsModule,
		NgPipesModule,
		MapModule,
		ImageUploadModule,
		Daterangepicker,
		EditableModule
	],
	providers: [
		RentalService,
		BookingService,
		HelperService,
		UcWordsPipe,
		RentalGuard
	]
})
export class RentalModule { }