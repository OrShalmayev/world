import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from 'src/app/models/city';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public form:FormGroup;
  public city$;
  public formValid:boolean = false;
  public cityId;
  constructor(
    private cityService: CityService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private spinner: NgxSpinnerService
    
    ) { }

  ngOnInit() {
    this.spinner.show();
        // getting the city id from the url parameters
        this.cityId = this.route.snapshot.paramMap.get('id');
        
        // Fetching the city
        this.cityService.fetchCity(this.cityId)
          .subscribe(
            (d) => {
              this.city$ = d;

              // setting starting values for form
              this.form.setValue({
                Name: d.Name,
                CountryCode: d.CountryCode,
                District: d.District,
                Population: d.Population
              });
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
              // show spinner when the city is fetched from server successfully
              this.spinner.hide();
            }
        );//END fetchCity

    // Handling form
    this.form = this.fb.group({
      Name: ['', Validators.required],
      CountryCode: ['', Validators.required],
      District: ['', Validators.required],
      Population: ['', Validators.required]
    });



    // Listening for changes in the form
    this.form.valueChanges.subscribe(data => {
      console.log(this.form);
      if(this.form.touched && this.form.status.toLowerCase()==='valid'){
        this.formValid=true;
      }else{
        this.formValid=false;
      }
    });




  }//END ngOnInit




  public updateCity():void{
    if(this.formValid){
      this.cityService.updateCity(this.form.value, this.cityId).subscribe(
        (d)=>{
          console.log(d);
        },
        (err:HttpErrorResponse)=>{
          if(err instanceof Error){
            // client side error
            console.log(`an error occured ${err.error.message}`)
          }else{
            // backend error
            console.log(`backend retured error code ${err.status}, body was: ${err.message}`)
          }
        }
      );//END fetchCity
      this.router.navigateByUrl('/cities');
      this.flashMessagesService.show(`${this.form.value.Name} updated successfully.`, { cssClass: 'alert-success', timeout:4000});
    }else{
      this.flashMessagesService.show("Please fill all fields correctly.", {cssClass: 'alert-danger', timeout: 4000});
    }
  }

}
