import { Routes } from '@angular/router';
import { VendedorListComponent } from './vendedor-list/vendedor-list.component';
import { VendedorEditComponent } from './vendedor-edit/vendedor-edit.component';
import { VendedorUpdateComponent } from './vendedor-update/vendedor-update.component';

export default [
    { path: '', component: VendedorListComponent},
    { path: 'novo', component: VendedorEditComponent},
    { path: 'atualizar/:id', component: VendedorUpdateComponent}
] as Routes;
