import { Routes } from '@angular/router';
import { AeronaveListComponent } from './aeronave-list/aeronave-list.component';
import { AeronaveEditComponent } from './aeronave-edit/aeronave-edit.component';
import { AeronaveUpdateComponent } from './aeronave-update/aeronave-update.component';
import { AeronaveDetailsComponent } from './aeronave-details/aeronave-details.component';

export default [
    { path: '', component: AeronaveListComponent},
    { path: 'novo', component: AeronaveEditComponent},
    { path: 'atualizar/:id', component: AeronaveUpdateComponent},
    { path: 'details/:id', component: AeronaveDetailsComponent}
] as Routes;
