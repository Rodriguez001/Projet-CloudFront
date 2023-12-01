import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/template/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    FooterComponent
  ],
  exports:[
    FooterComponent,
    FormsModule,
    HttpClientModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule]
})
export class SharedModule { }
