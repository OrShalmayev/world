import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/models/city';
import { HttpErrorResponse } from '@angular/common/http';

// Flash Messages Service
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  public cities$;
  p: number = 1;

  constructor(
    private cityService:CityService,
    private flashMessagesService: FlashMessagesService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.spinner.show();

    this.cityService.fetchCities().subscribe(
      (d)=>{
        this.cities$ = d;
      },
      (err:HttpErrorResponse)=>{
          if(err instanceof Error){
            // client side error
            console.log(`an error occured ${err.error.message}`)
          }else{
            // backend error
            console.log(`backend retured error code ${err.status}, body was: ${err.message}`)
          }
      },
      () => {
        // When all data is complete hide the spinner
        this.spinner.hide();
      }
    )//END subscribe;

  }


  public deleteCity(city:City){
    this.spinner.show();
    this.cityService.deleteCity(city.ID)
    .subscribe(
      (d)=>{
        this.flashMessagesService.show(`City ${city.Name} Deleted succesfully!`, { cssClass: 'alert-success', timeout: 4000 });

        this.cities$ = this.cities$.filter(c => c.ID !== city.ID);
      },
      (err:HttpErrorResponse)=>{
          if(err instanceof Error){
            // client side error
            console.log(`an error occured ${err.error.message}`)
          }else{
            // backend error
            console.log(`backend retured error code ${err.status}, body was: ${err.message}`)
          }
      },
      ()=>{
        // city deleted successfully
        this.spinner.hide();
      }
    )//END subscribe
  }//END deleteCity

}
