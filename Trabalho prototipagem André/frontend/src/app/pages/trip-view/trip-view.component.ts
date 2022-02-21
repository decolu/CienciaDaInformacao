import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/trip.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Trip } from 'src/app/models/trip.model';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.scss']
})
export class TripViewComponent implements OnInit {

  lists: List[];
  trips: Trip[];

  selectedListId: string;

  constructor(private tripService: TripService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
          this.tripService.getTrips(params.listId).subscribe((trips: Trip[]) => {
            this.trips = trips;
          })
        } else {
          this.trips = undefined;
        }
      }
    )

    this.tripService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    })
  }

  onTripClick(trip: Trip) {
    this.tripService.complete(trip).subscribe(() => {
      trip.completed = !trip.completed;
    })
  }

  onDeleteListClick() {
    this.tripService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTripClick(id: string) {
    this.tripService.deleteTrip(this.selectedListId, id).subscribe((res: any) => {
      this.trips = this.trips.filter(val => val._id !== id);
      console.log(res);
    })
  }

}
