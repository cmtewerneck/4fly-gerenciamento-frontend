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
import { AeronaveOutrasDespesas } from '../outrasDespesas.model';
import { environment } from 'environments/environment';
import { AeronaveOutrasDespesasService } from '../outrasDespesas.service';

@Component({
    selector: 'app-outrasDespesas-update',
    templateUrl: './outrasDespesas-update.component.html',
    styleUrls: ['./outrasDespesas-update.component.scss'],
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

export class AeronaveOutrasDespesasUpdateComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    aeronaveOutrasDespesasToEdit: AeronaveOutrasDespesas;
    aeronaveId: string;

   constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _aeronaveOutrasDespesasService: AeronaveOutrasDespesasService) {}

    ngOnInit(): void {
        this.mainForm = this._formBuilder.group({
            id: ['', [Validators.required]],
            data: ['', [Validators.required]],
            descricao: ['', [Validators.required]],
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
        this._aeronaveOutrasDespesasService.getById(this.route.snapshot.params["id"]).subscribe(model => {

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
            this.aeronaveOutrasDespesasToEdit = Object.assign({}, this.aeronaveOutrasDespesasToEdit, this.mainForm.value)};


        this.aeronaveOutrasDespesasToEdit.valor = Number(this.aeronaveOutrasDespesasToEdit.valor);
        if (this.aeronaveOutrasDespesasToEdit.data) { this.aeronaveOutrasDespesasToEdit.data = new Date(this.aeronaveOutrasDespesasToEdit.data); } else { this.aeronaveOutrasDespesasToEdit.data = null!; }
        if (this.aeronaveOutrasDespesasToEdit.dataPagamento) { this.aeronaveOutrasDespesasToEdit.dataPagamento = new Date(this.aeronaveOutrasDespesasToEdit.dataPagamento); } else { this.aeronaveOutrasDespesasToEdit.dataPagamento = null!; }
        if (this.aeronaveOutrasDespesasToEdit.vencimento) { this.aeronaveOutrasDespesasToEdit.vencimento = new Date(this.aeronaveOutrasDespesasToEdit.vencimento); } else { this.aeronaveOutrasDespesasToEdit.vencimento = null!; }

        if(this.aeronaveOutrasDespesasToEdit.data != null && this.aeronaveOutrasDespesasToEdit.data.toString() == ""){
            this.aeronaveOutrasDespesasToEdit.data = null;
        }

        if(this.aeronaveOutrasDespesasToEdit.dataPagamento != null && this.aeronaveOutrasDespesasToEdit.dataPagamento.toString() == ""){
            this.aeronaveOutrasDespesasToEdit.dataPagamento = null;
        }

        if(this.aeronaveOutrasDespesasToEdit.vencimento != null && this.aeronaveOutrasDespesasToEdit.vencimento.toString() == ""){
            this.aeronaveOutrasDespesasToEdit.vencimento = null;
        }

        const $obs = this._aeronaveOutrasDespesasService.update(this.aeronaveOutrasDespesasToEdit);

        this.isLoading = true;
        $obs.subscribe(_ => {
            this.isLoading = false;

            this.router.navigate(['/outrasDespesas/' + this.aeronaveId]);
        }, error => {
            this.isLoading = false;
        });
    }

    voltar(){
        this.router.navigate(['/outrasDespesas/' + this.aeronaveId]);
    }

}