import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AeronaveTarifaService } from '../tarifa.service';
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
import { AeronaveTarifa } from '../tarifa.model';
import { SafePipe } from 'app/shared/pipes/safe.pipe';

@Component({
    selector: 'app-tarifa-edit',
    templateUrl: './tarifa-edit.component.html',
    styleUrls: ['./tarifa-edit.component.scss'],
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

export class AeronaveTarifaEditComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    tarifa: AeronaveTarifa;
    aeronaveId: string;

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _aeronaveTarifaService: AeronaveTarifaService) {this.aeronaveId = this.route.snapshot.paramMap.get('id');}

    ngOnInit(): void {

        this.mainForm = this._formBuilder.group({
            data: ['', [Validators.required]],
            origem: ['', [Validators.required]],
            valor: ['', [Validators.required]],
            status: ['', [Validators.required]],
            dataPagamento: [''],
            nota: [''],
            codigoBarras: [''],
            vencimento: [''],
            aeronaveId: [this.aeronaveId]
        });
    }

    save() {
        if (this.mainForm.invalid) {
            this.mainForm.markAllAsTouched();
            return;
        }

        if (this.mainForm.dirty && this.mainForm.valid) {
            this.tarifa = Object.assign({}, this.tarifa, this.mainForm.value)};

        this.tarifa.valor = Number(this.tarifa.valor);
        if (this.tarifa.data) { this.tarifa.data = new Date(this.tarifa.data); } else { this.tarifa.data = null!; }
        if (this.tarifa.dataPagamento) { this.tarifa.dataPagamento = new Date(this.tarifa.dataPagamento); } else { this.tarifa.dataPagamento = null!; }
        if (this.tarifa.vencimento) { this.tarifa.vencimento = new Date(this.tarifa.vencimento); } else { this.tarifa.vencimento = null!; }

        if(this.tarifa.data != null && this.tarifa.data.toString() == ""){
            this.tarifa.data = null;
        }

        if(this.tarifa.dataPagamento != null && this.tarifa.dataPagamento.toString() == ""){
            this.tarifa.dataPagamento = null;
        }

        if(this.tarifa.vencimento != null && this.tarifa.vencimento.toString() == ""){
            this.tarifa.vencimento = null;
        }

        const $obs = this._aeronaveTarifaService.insert(this.tarifa);

        this.isLoading = true;
        $obs.subscribe(_ => {
            this.isLoading = false;

            this.router.navigate(['/tarifas/' + this.aeronaveId]);
        }, error => {
            this.isLoading = false;
        });
    }   
    
    voltar(){
        this.router.navigate(['/tarifas/' + this.aeronaveId]);
    }

}