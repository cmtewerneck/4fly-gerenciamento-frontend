import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CameraService } from '../cameras.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { Camera } from '../cameras.model';
import { SafePipe } from 'app/shared/pipes/safe.pipe';

@Component({
    selector: 'app-camera-edit',
    templateUrl: './camera-edit.component.html',
    styleUrls: ['./camera-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports:[
            SafePipe,
            MatButtonModule,
            MatCheckboxModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatMenuModule,
            MatPaginatorModule,
            MatProgressBarModule,
            MatRippleModule,
            MatSortModule,
            MatSelectModule,
            MatSlideToggleModule,
            MatTableModule,
            MatTooltipModule,
            MatExpansionModule,
            MatTabsModule,
            CommonModule,
            RouterModule,
            ReactiveFormsModule,
            FormsModule
        ]
})

export class CameraEditComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    camera: Camera;

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private _cameraService: CameraService) {}

    ngOnInit(): void {

        this.mainForm = this._formBuilder.group({
            dataVenda: ['', [Validators.required]],
            horaVoo: ['', [Validators.required]],
            nomePassageiro: ['', [Validators.required]],
            telefonePassageiro: [''],
            referencia: [''],
            aeronave: ['', [Validators.required]],
            vendedor: ['', [Validators.required]],
            valorBruto: ['', [Validators.required]],
            valorLiquido: ['', [Validators.required]],
            status: ['', [Validators.required]],
            linkYoutube: [''],
            linkWeTransfer: [''],
            mesmoVoo: [false],
            privacidade: [''],
            observacoes: ['']
        });
    }

    save() {
        if (this.mainForm.invalid) {
            this.mainForm.markAllAsTouched();
            return;
        }

        if (this.mainForm.dirty && this.mainForm.valid) {
            this.camera = Object.assign({}, this.camera, this.mainForm.value)};

        this.camera.valorBruto = Number(this.camera.valorBruto);
        this.camera.valorLiquido = Number(this.camera.valorLiquido);
        if (this.camera.dataVenda) { this.camera.dataVenda = new Date(this.camera.dataVenda); } else { this.camera.dataVenda = null!; }

        const $obs = this._cameraService.insert(this.camera);

        this.isLoading = true;
        $obs.subscribe(_ => {
            //this._toastr.success('Aeronave criada com sucesso');
            this.isLoading = false;

            this.router.navigate(['/cameras']);
        }, error => {
            this.isLoading = false;
        });
    }

}