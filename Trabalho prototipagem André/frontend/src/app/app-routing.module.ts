import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripViewComponent } from './pages/trip-view/trip-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTripComponent } from './pages/new-trip/new-trip.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTripComponent } from './pages/edit-trip/edit-trip.component';

const routes: Routes = [
  { path: '', redirectTo: '/lists', pathMatch: 'full' },
  { path: 'new-list', component: NewListComponent },
  { path: 'edit-list/:listId', component: EditListComponent },
  { path: 'lists', component: TripViewComponent },
  { path: 'lists/:listId', component: TripViewComponent },
  { path: 'lists/:listId/new-trip', component: NewTripComponent },
  { path: 'lists/:listId/edit-trip/:tripId', component: EditTripComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
