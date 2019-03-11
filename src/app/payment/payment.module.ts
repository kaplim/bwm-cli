import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentComponent } from './payment.component';
import { PaymentService } from './shared/payment.service';

@NgModule({
  declarations: [
    PaymentComponent
  ],
  exports: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    //HttpClientModule,
  ],
  providers: [PaymentService]
})
export class PaymentModule { }