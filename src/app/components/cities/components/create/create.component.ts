import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  private form:FormGroup;
  private formValid:boolean = false;
  constructor(
    private cityService: CityService,
    private router: Router,
    private fb:FormBuilder,
    private flashMessagesService: FlashMessagesService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {

    this.form = this.fb.group({
      Name: ['', Validators.required],
      CountryCode: ['', Validators.required],
      District: ['', Validators.required],
      Population: ['', Validators.required]
    })

    this.form.valueChanges.subscribe(data => {
      if(this.form.touched && this.form.status.toLowerCase()==='valid'){
        this.formValid=true;
      }
    });

  }

  public addCity():void {
    this.spinner.show();
    this.cityService.storeCity(this.form.value)
      .subscribe(
          (city)=>{
            this.flashMessagesService.show(`City ${this.form.value.Name} Created succesfully!`, { cssClass: 'alert-success', timeout: 4000 });
            this.router.navigateByUrl('/cities');
          },
          (err:HttpErrorResponse) => {
            if(err instanceof Error){
              // client side error
              console.log(`an error occured ${err.error.message}`)
            }else{
              // backend error
              console.log(`backend retured error code ${err.status}, body was: ${err.message}`)
            }
          },
          ()=>{
            // add city completed
            this.spinner.hide();
          }
      );
  }



}
