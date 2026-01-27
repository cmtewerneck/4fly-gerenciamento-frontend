import { Routes } from '@angular/router';
import { CameraDetailsComponent } from './camera-details/camera-details.component';
import { CameraEditComponent } from './camera-edit/camera-edit.component';
import { CameraDetailedComponent } from './camera-detailed/camera-detailed.component';
import { CameraUpdateComponent } from './camera-update/camera-update.component';

export default [
    { path: '', component: CameraDetailsComponent},
    { path: 'novo', component: CameraEditComponent},
    { path: 'detailed/:id', component: CameraDetailedComponent},
    { path: 'atualizar/:id', component: CameraUpdateComponent}
] as Routes;
