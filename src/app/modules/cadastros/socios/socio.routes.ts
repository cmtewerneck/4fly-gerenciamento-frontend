import { Routes } from '@angular/router';
import { AeronaveSocioListComponent } from './socio-list/socio-list.component';
import { AeronaveSocioEditComponent } from './socio-edit/socio-edit.component';
import { AeronaveSocioUpdateComponent } from './socio-update/socio-update.component';

export default [
    { path: ':id', component: AeronaveSocioListComponent},
    { path: ':id/novo', component: AeronaveSocioEditComponent},
    { path: 'atualizar/:id', component: AeronaveSocioUpdateComponent}
] as Routes;
