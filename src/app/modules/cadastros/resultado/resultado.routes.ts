import { Routes } from '@angular/router';
import { AeronaveResultadoListComponent } from './resultado-list/resultado-list.component';

export default [
    { path: ':id', component: AeronaveResultadoListComponent},
] as Routes;
