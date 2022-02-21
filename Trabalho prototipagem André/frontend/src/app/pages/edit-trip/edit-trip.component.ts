import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { TripService } from 'src/app/trip.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.scss']
})
export class EditTripComponent implements OnInit {

  constructor(private route: ActivatedRoute, private tripService: TripService, private router: Router) { }

  tripId: string;
  listId: string;

  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.tripId = params.tripId;
        this.listId = params.listId;
      }
    )
  }

  updateTrip(title: string) {
    this.tripService.updateTrip(this.listId, this.tripId, title).subscribe(() => {
      this.router.navigate(['/lists', this.listId]);
    })
  }

}
