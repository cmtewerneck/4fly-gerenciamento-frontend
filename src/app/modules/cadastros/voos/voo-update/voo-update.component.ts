import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { AeronaveVoo, TripulantesDropdown } from '../voo.model';
import { environment } from 'environments/environment';
import { AeronaveVooService } from '../voo.service';
import { TripulanteService } from '../../tripulante/tripulantes.service';

@Component({
    selector: 'app-voo-update',
    templateUrl: './voo-update.component.html',
    styleUrls: ['./voo-update.component.scss'],
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

export class AeronaveVooUpdateComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    aeronaveVooToEdit: AeronaveVoo;
    aeronaveId: string;
    tripulantes: TripulantesDropdown[];

   constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _tripulanteService: TripulanteService,
        private _aeronaveVooService: AeronaveVooService) {}

    ngOnInit(): void {

        this.carregarTripulantes();

        this.mainForm = this._formBuilder.group({
            id: ['', [Validators.required]],
            data: ['', [Validators.required]],
            descricao: ['', [Validators.required]],
            horimetroInicial: ['', [Validators.required]],
            horimetroFinal: ['', [Validators.required]],
            totalHorimetro: ['', [Validators.required]],
            empresa: [''],
            piloto: [''],
            valor: ['', [Validators.required]],
            statusPgtoVoo: [''],
            statusPgtoPiloto: [''],
            aeronaveId: [this.aeronaveId]
        });

        this.loadEntity();
    }

    carregarTripulantes() {
        this._tripulanteService.getAllNomes().subscribe(result => {
            this.tripulantes = result;
            console.log(this.tripulantes);
        }, error => {
            console.log(error);
        }, () => {
            this.isLoading = false;
        });
    }

    loadEntity() {
        this.isLoading = true;
        this._aeronaveVooService.getById(this.route.snapshot.params["id"]).subscribe(model => {

            this.mainForm.patchValue(model);

             this.mainForm.patchValue({
                data: model.data?.toString().split('T')[0] ?? null,
            });

            this.aeronaveId = model.aeronaveId;

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
            this.aeronaveVooToEdit = Object.assign({}, this.aeronaveVooToEdit, this.mainForm.value)};


        this.aeronaveVooToEdit.valor = Number(this.aeronaveVooToEdit.valor);
        if (this.aeronaveVooToEdit.data) { this.aeronaveVooToEdit.data = new Date(this.aeronaveVooToEdit.data); } else { this.aeronaveVooToEdit.data = null!; }

        if(this.aeronaveVooToEdit.data != null && this.aeronaveVooToEdit.data.toString() == ""){
            this.aeronaveVooToEdit.data = null;
        }

        const $obs = this._aeronaveVooService.update(this.aeronaveVooToEdit);

        this.isLoading = true;
        $obs.subscribe(_ => {
            this.isLoading = false;

            this.router.navigate(['/voos/' + this.aeronaveId]);
        }, error => {
            this.isLoading = false;
        });
    }

    voltar(){
        this.router.navigate(['/voos/' + this.aeronaveId]);
    }

}