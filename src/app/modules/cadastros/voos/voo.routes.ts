import { Routes } from '@angular/router';
import { AeronaveVooListComponent } from './voo-list/voo-list.component';
import { AeronaveVooEditComponent } from './voo-edit/voo-edit.component';
import { AeronaveVooUpdateComponent } from './voo-update/voo-update.component';
// import { AeronaveEditComponent } from './aeronave-edit/aeronave-edit.component';
// import { AeronaveUpdateComponent } from './aeronave-update/aeronave-update.component';
// import { AeronaveDetailsComponent } from './aeronave-details/aeronave-details.component';

export default [
    { path: ':id', component: AeronaveVooListComponent},
    { path: ':id/novo', component: AeronaveVooEditComponent},
    { path: 'atualizar/:id', component: AeronaveVooUpdateComponent}
    // { path: 'details/:id', component: AeronaveDetailsComponent}
] as Routes;
