import { Routes } from '@angular/router';
import { ColaboradorListComponent } from './colaboradores-list/colaboradores-list.component';
import { ColaboradorEditComponent } from './colaboradores-edit/colaboradores-edit.component';
import { ColaboradorUpdateComponent } from './colaboradores-update/colaboradores-update.component';
import { ColaboradorDetailsComponent } from './colaborador-details/colaborador-details.component';

export default [
    { path: '', component: ColaboradorListComponent},
    { path: 'novo', component: ColaboradorEditComponent},
    { path: 'atualizar/:id', component: ColaboradorUpdateComponent},
    { path: 'details/:id', component: ColaboradorDetailsComponent}
] as Routes;
