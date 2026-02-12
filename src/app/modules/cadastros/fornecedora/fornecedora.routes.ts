import { Routes } from '@angular/router';
import { FornecedoraAbastecimentoListComponent } from './fornecedora-list/fornecedora-list.component';
import { FornecedoraAbastecimentoEditComponent } from './fornecedora-edit/fornecedora-edit.component';
import { FornecedoraAbastecimentoUpdateComponent } from './fornecedora-update/fornecedora-update.component';

export default [
    { path: '', component: FornecedoraAbastecimentoListComponent},
    { path: 'novo', component: FornecedoraAbastecimentoEditComponent},
    { path: 'atualizar/:id', component: FornecedoraAbastecimentoUpdateComponent}
] as Routes;
