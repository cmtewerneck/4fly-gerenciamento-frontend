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
import { AeronaveAbastecimento } from '../abastecimento.model';
import { environment } from 'environments/environment';
import { AeronaveAbastecimentoService } from '../abastecimento.service';

@Component({
    selector: 'app-abastecimento-update',
    templateUrl: './abastecimento-update.component.html',
    styleUrls: ['./abastecimento-update.component.scss'],
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

export class AeronaveAbastecimentoUpdateComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    aeronaveAbastecimentoToEdit: AeronaveAbastecimento;
    aeronaveId: string;

   constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _aeronaveAbastecimentoService: AeronaveAbastecimentoService) {}

    ngOnInit(): void {
        this.mainForm = this._formBuilder.group({
            id: ['', [Validators.required]],
            data: ['', [Validators.required]],
            litros: ['', [Validators.required]],
            fornecedora: ['', [Validators.required]],
            valorUnitario: ['', [Validators.required]],
            valorTotal: ['', [Validators.required]],
            status: ['', [Validators.required]],
            dataPagamento: [''],
            nota: [''],
            codigoBarras: [''],
            vencimento: [''],
            aeronaveId: ['']
        });

        this.loadEntity();
    }

    loadEntity() {
        this.isLoading = true;
        this._aeronaveAbastecimentoService.getById(this.route.snapshot.params["id"]).subscribe(model => {

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
            this.aeronaveAbastecimentoToEdit = Object.assign({}, this.aeronaveAbastecimentoToEdit, this.mainForm.value)};


        this.aeronaveAbastecimentoToEdit.litros = Number(this.aeronaveAbastecimentoToEdit.litros);
        this.aeronaveAbastecimentoToEdit.valorUnitario = Number(this.aeronaveAbastecimentoToEdit.valorUnitario);
        this.aeronaveAbastecimentoToEdit.valorTotal = Number(this.aeronaveAbastecimentoToEdit.valorTotal);
        if (this.aeronaveAbastecimentoToEdit.data) { this.aeronaveAbastecimentoToEdit.data = new Date(this.aeronaveAbastecimentoToEdit.data); } else { this.aeronaveAbastecimentoToEdit.data = null!; }
        if (this.aeronaveAbastecimentoToEdit.dataPagamento) { this.aeronaveAbastecimentoToEdit.dataPagamento = new Date(this.aeronaveAbastecimentoToEdit.dataPagamento); } else { this.aeronaveAbastecimentoToEdit.dataPagamento = null!; }
        if (this.aeronaveAbastecimentoToEdit.vencimento) { this.aeronaveAbastecimentoToEdit.vencimento = new Date(this.aeronaveAbastecimentoToEdit.vencimento); } else { this.aeronaveAbastecimentoToEdit.vencimento = null!; }

        if(this.aeronaveAbastecimentoToEdit.data != null && this.aeronaveAbastecimentoToEdit.data.toString() == ""){
            this.aeronaveAbastecimentoToEdit.data = null;
        }

        if(this.aeronaveAbastecimentoToEdit.dataPagamento != null && this.aeronaveAbastecimentoToEdit.dataPagamento.toString() == ""){
            this.aeronaveAbastecimentoToEdit.dataPagamento = null;
        }

        if(this.aeronaveAbastecimentoToEdit.vencimento != null && this.aeronaveAbastecimentoToEdit.vencimento.toString() == ""){
            this.aeronaveAbastecimentoToEdit.vencimento = null;
        }

        const $obs = this._aeronaveAbastecimentoService.update(this.aeronaveAbastecimentoToEdit);

        this.isLoading = true;
        $obs.subscribe(_ => {
            this.isLoading = false;

            this.router.navigate(['/abastecimentos/' + this.aeronaveId]);
        }, error => {
            this.isLoading = false;
        });
    }

    voltar(){
        this.router.navigate(['/abastecimentos/' + this.aeronaveId]);
    }

}