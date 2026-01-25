import { Routes } from '@angular/router';
import { TripulanteListComponent } from './tripulante-list/tripulante-list.component';
import { TripulanteEditComponent } from './tripulante-edit/tripulante-edit.component';
import { TripulanteUpdateComponent } from './tripulante-update/tripulante-update.component';
import { TripulanteDetailsComponent } from './tripulante-details/tripulante-details.component';

export default [
    { path: '', component: TripulanteListComponent},
    { path: 'novo', component: TripulanteEditComponent},
    { path: 'atualizar/:id', component: TripulanteUpdateComponent},
    { path: 'details/:id', component: TripulanteDetailsComponent}
] as Routes;
