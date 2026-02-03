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
import { AeronaveTarifa } from '../tarifa.model';
import { environment } from 'environments/environment';
import { AeronaveTarifaService } from '../tarifa.service';

@Component({
    selector: 'app-tarifa-update',
    templateUrl: './tarifa-update.component.html',
    styleUrls: ['./tarifa-update.component.scss'],
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

export class AeronaveTarifaUpdateComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    aeronaveTarifaToEdit: AeronaveTarifa;
    aeronaveId: string;

   constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _aeronaveTarifaService: AeronaveTarifaService) {}

    ngOnInit(): void {
        this.mainForm = this._formBuilder.group({
            id: ['', [Validators.required]],
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

        this.loadEntity();
    }

    loadEntity() {
        this.isLoading = true;
        this._aeronaveTarifaService.getById(this.route.snapshot.params["id"]).subscribe(model => {

            this.mainForm.patchValue(model);

             this.mainForm.patchValue({
                data: model.data?.toString().split('T')[0] ?? null,
                dataPagamento: model.dataPagamento?.toString().split('T')[0] ?? null,
                vencimento: model.vencimento?.toString().split('T')[0] ?? null,
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
            this.aeronaveTarifaToEdit = Object.assign({}, this.aeronaveTarifaToEdit, this.mainForm.value)};


        this.aeronaveTarifaToEdit.valor = Number(this.aeronaveTarifaToEdit.valor);
        if (this.aeronaveTarifaToEdit.data) { this.aeronaveTarifaToEdit.data = new Date(this.aeronaveTarifaToEdit.data); } else { this.aeronaveTarifaToEdit.data = null!; }
        if (this.aeronaveTarifaToEdit.dataPagamento) { this.aeronaveTarifaToEdit.dataPagamento = new Date(this.aeronaveTarifaToEdit.dataPagamento); } else { this.aeronaveTarifaToEdit.dataPagamento = null!; }
        if (this.aeronaveTarifaToEdit.vencimento) { this.aeronaveTarifaToEdit.vencimento = new Date(this.aeronaveTarifaToEdit.vencimento); } else { this.aeronaveTarifaToEdit.vencimento = null!; }

        if(this.aeronaveTarifaToEdit.data != null && this.aeronaveTarifaToEdit.data.toString() == ""){
            this.aeronaveTarifaToEdit.data = null;
        }

        if(this.aeronaveTarifaToEdit.dataPagamento != null && this.aeronaveTarifaToEdit.dataPagamento.toString() == ""){
            this.aeronaveTarifaToEdit.dataPagamento = null;
        }

        if(this.aeronaveTarifaToEdit.vencimento != null && this.aeronaveTarifaToEdit.vencimento.toString() == ""){
            this.aeronaveTarifaToEdit.vencimento = null;
        }

        const $obs = this._aeronaveTarifaService.update(this.aeronaveTarifaToEdit);

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