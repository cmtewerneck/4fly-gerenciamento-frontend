import { Routes } from '@angular/router';
import { AeronaveManutencaoListComponent } from './manutencao-list/manutencao-list.component';
import { AeronaveManutencaoEditComponent } from './manutencao-edit/manutencao-edit.component';
import { AeronaveManutencaoUpdateComponent } from './manutencao-update/manutencao-update.component';
// import { AeronaveEditComponent } from './aeronave-edit/aeronave-edit.component';
// import { AeronaveUpdateComponent } from './aeronave-update/aeronave-update.component';
// import { AeronaveDetailsComponent } from './aeronave-details/aeronave-details.component';

export default [
    { path: ':id', component: AeronaveManutencaoListComponent},
    { path: ':id/novo', component: AeronaveManutencaoEditComponent},
    { path: 'atualizar/:id', component: AeronaveManutencaoUpdateComponent}
    // { path: 'details/:id', component: AeronaveDetailsComponent}
] as Routes;
