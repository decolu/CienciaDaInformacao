import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Trip } from './models/trip.model';

@Injectable({
  providedIn: 'root'
})

export class TripService {

  constructor(private webReqService: WebRequestService) { }

  getLists() {
    return this.webReqService.get('lists');
  }

  createList(title: string) {
    return this.webReqService.post('lists', { title });
  }

  updateList(id: string, title: string) {
    return this.webReqService.patch(`lists/${id}`, { title });
  }

  updateTrip(listId: string, tripId: string, title: string) {
    return this.webReqService.patch(`lists/${listId}/trips/${tripId}`, { title });
  }

  deleteTrip(listId: string, tripId: string) {
    return this.webReqService.delete(`lists/${listId}/trips/${tripId}`);
  }

  deleteList(id: string) {
    return this.webReqService.delete(`lists/${id}`);
  }

  getTrips(listId: string) {
    return this.webReqService.get(`lists/${listId}/trips`);
  }

  createTrip(title: string, date: Date, listId: string) {
    return this.webReqService.post(`lists/${listId}/trips`, { title });
  }

  complete(trip: Trip) {
    return this.webReqService.patch(`lists/${trip._listId}/trips/${trip._id}`, {
      completed: !trip.completed
    });
  }
}
