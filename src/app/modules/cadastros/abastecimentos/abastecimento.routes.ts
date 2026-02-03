import { Routes } from '@angular/router';
import { AeronaveAbastecimentoListComponent } from './abastecimento-list/abastecimento-list.component';
import { AeronaveAbastecimentoEditComponent } from './abastecimento-edit/abastecimento-edit.component';
import { AeronaveAbastecimentoUpdateComponent } from './abastecimento-update/abastecimento-update.component';
// import { AeronaveEditComponent } from './aeronave-edit/aeronave-edit.component';
// import { AeronaveUpdateComponent } from './aeronave-update/aeronave-update.component';
// import { AeronaveDetailsComponent } from './aeronave-details/aeronave-details.component';

export default [
    { path: ':id', component: AeronaveAbastecimentoListComponent},
    { path: ':id/novo', component: AeronaveAbastecimentoEditComponent},
    { path: 'atualizar/:id', component: AeronaveAbastecimentoUpdateComponent}
    // { path: 'details/:id', component: AeronaveDetailsComponent}
] as Routes;
