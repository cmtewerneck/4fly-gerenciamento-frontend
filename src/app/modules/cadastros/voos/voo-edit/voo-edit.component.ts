import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AeronaveVooService } from '../voo.service';
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
import { SafePipe } from 'app/shared/pipes/safe.pipe';
import { TripulanteService } from '../../tripulante/tripulantes.service';

@Component({
    selector: 'app-voo-edit',
    templateUrl: './voo-edit.component.html',
    styleUrls: ['./voo-edit.component.scss'],
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

export class AeronaveVooEditComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    voo: AeronaveVoo;
    aeronaveId: string;
    tripulantes: TripulantesDropdown[];

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _tripulanteService: TripulanteService,
        private _aeronaveVooService: AeronaveVooService) {this.aeronaveId = this.route.snapshot.paramMap.get('id');}

    ngOnInit(): void {

        this.carregarTripulantes();

        this.mainForm = this._formBuilder.group({
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

        this.mainForm.valueChanges.subscribe(values => {
            this.calcular(values);
        });
    }

    calcular(values: any) {
        const c1 = parseFloat(values.horimetroFinal) || 0;
        const c2 = parseFloat(values.horimetroInicial) || 0;
        const total = c1 - c2;

        // 3. Popular o terceiro campo (patchValue para não disparar eventos infinitos)
        this.mainForm.patchValue({
        totalHorimetro: total
        }, { emitEvent: false }); // emitEvent: false é crucial para evitar loop
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

    save() {
        if (this.mainForm.invalid) {
            this.mainForm.markAllAsTouched();
            return;
        }

        if (this.mainForm.dirty && this.mainForm.valid) {
            this.voo = Object.assign({}, this.voo, this.mainForm.value)};

        this.voo.valor = Number(this.voo.valor);
        if (this.voo.data) { this.voo.data = new Date(this.voo.data); } else { this.voo.data = null!; }

        if(this.voo.data != null && this.voo.data.toString() == ""){
            this.voo.data = null;
        }

        const $obs = this._aeronaveVooService.insert(this.voo);

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