import { Routes } from '@angular/router';
import { AeronaveOutrasDespesasListComponent } from './outrasDespesas-list/outrasDespesas-list.component';
import { AeronaveOutrasDespesasEditComponent } from './outrasDespesas-edit/outrasDespesas-edit.component';
import { AeronaveOutrasDespesasUpdateComponent } from './outrasDespesas-update/outrasDespesas-update.component';
// import { AeronaveEditComponent } from './aeronave-edit/aeronave-edit.component';
// import { AeronaveUpdateComponent } from './aeronave-update/aeronave-update.component';
// import { AeronaveDetailsComponent } from './aeronave-details/aeronave-details.component';

export default [
    { path: ':id', component: AeronaveOutrasDespesasListComponent},
    { path: ':id/novo', component: AeronaveOutrasDespesasEditComponent},
    { path: 'atualizar/:id', component: AeronaveOutrasDespesasUpdateComponent}
    // { path: 'details/:id', component: AeronaveDetailsComponent}
] as Routes;
