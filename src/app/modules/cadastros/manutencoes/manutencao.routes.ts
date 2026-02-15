import { Routes } from '@angular/router';
import { AeronaveTarifaListComponent } from './tarifa-list/tarifa-list.component';
import { AeronaveTarifaEditComponent } from './tarifa-edit/tarifa-edit.component';
import { AeronaveTarifaUpdateComponent } from './tarifa-update/tarifa-update.component';
// import { AeronaveEditComponent } from './aeronave-edit/aeronave-edit.component';
// import { AeronaveUpdateComponent } from './aeronave-update/aeronave-update.component';
// import { AeronaveDetailsComponent } from './aeronave-details/aeronave-details.component';

export default [
    { path: ':id', component: AeronaveTarifaListComponent},
    { path: ':id/novo', component: AeronaveTarifaEditComponent},
    { path: 'atualizar/:id', component: AeronaveTarifaUpdateComponent}
    // { path: 'details/:id', component: AeronaveDetailsComponent}
] as Routes;
