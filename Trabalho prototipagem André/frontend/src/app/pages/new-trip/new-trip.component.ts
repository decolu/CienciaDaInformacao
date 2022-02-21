import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/trip.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Trip } from 'src/app/models/trip.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss']
})
export class NewTripComponent implements OnInit {

  constructor(private tripService: TripService, private route: ActivatedRoute, private router: Router) { }

  listId: string;
  showValidationErrors: boolean = false
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params.listId;
      }
    )
  }

  createTrip(title: string, date: Date) {
      this.tripService.createTrip(title, date, this.listId).subscribe((newTrip: Trip) => {
        this.router.navigate(['../'], { relativeTo: this.route });
      })
  }

  onFormSubmit(form: NgForm){
    console.log(form)
    if(form.invalid) return this.showValidationErrors = true

    if(form.valid){
      this.showValidationErrors = false
      this.createTrip(form.value.title, form.value.date);
    }
  }
}
