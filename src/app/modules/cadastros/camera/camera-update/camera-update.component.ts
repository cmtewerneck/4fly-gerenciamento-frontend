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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AeronaveMatriculaDropdown, Camera, VendedoresDropdown } from '../cameras.model';
import { environment } from 'environments/environment';
import { VendedorService } from '../../vendedor/vendedor.service';
import { AeronaveService } from '../../aeronave/aeronave.service';

@Component({
    selector: 'app-camera-update',
    templateUrl: './camera-update.component.html',
    styleUrls: ['./camera-update.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports:[
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

export class CameraUpdateComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    cameraToEdit: Camera;
    matriculas: AeronaveMatriculaDropdown[];
    vendedores: VendedoresDropdown[];

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _vendedorService: VendedorService,
        private _aeronaveService: AeronaveService,
        private _cameraService: CameraService) {}

    ngOnInit(): void {
        this.carregarAeronaves();
        this.carregarVendedores();

        this.mainForm = this._formBuilder.group({
            id: ['', [Validators.required]],
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

        this.loadEntity();
    }

    carregarAeronaves() {
        this._aeronaveService.getAllMatriculas().subscribe(result => {
            this.matriculas = result;
            console.log(this.matriculas);
        }, error => {
            console.log(error);
        }, () => {
            this.isLoading = false;
        });
    }

    carregarVendedores() {
        this._vendedorService.getAllNomes().subscribe(result => {
            this.vendedores = result;
            console.log(this.vendedores);
        }, error => {
            console.log(error);
        }, () => {
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._cameraService.getById(this.route.snapshot.params["id"]).subscribe(model => {

            this.mainForm.patchValue(model);

             this.mainForm.patchValue({
                dataVenda: model.dataVenda?.toString().split('T')[0] ?? null,
            });


            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    save() {
        if (this.mainForm.invalid) {
            this.mainForm.markAllAsTouched();
            return;
        }

        if (this.mainForm.dirty && this.mainForm.valid) {
            this.cameraToEdit = Object.assign({}, this.cameraToEdit, this.mainForm.value)};

        this.cameraToEdit.valorBruto = Number(this.cameraToEdit.valorBruto);
        this.cameraToEdit.valorLiquido = Number(this.cameraToEdit.valorLiquido);
        if (this.cameraToEdit.dataVenda) { this.cameraToEdit.dataVenda = new Date(this.cameraToEdit.dataVenda); } else { this.cameraToEdit.dataVenda = null!; }

        const $obs = this._cameraService.update(this.cameraToEdit);

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