import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AeronaveAbastecimentoService } from '../abastecimento.service';
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
import { SafePipe } from 'app/shared/pipes/safe.pipe';

@Component({
    selector: 'app-abastecimento-edit',
    templateUrl: './abastecimento-edit.component.html',
    styleUrls: ['./abastecimento-edit.component.scss'],
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

export class AeronaveAbastecimentoEditComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    abastecimento: AeronaveAbastecimento;
    aeronaveId: string;

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _aeronaveAbastecimentoService: AeronaveAbastecimentoService) {this.aeronaveId = this.route.snapshot.paramMap.get('id');}

    ngOnInit(): void {

        this.mainForm = this._formBuilder.group({
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
            aeronaveId: [this.aeronaveId]
        });
    }

    save() {
        if (this.mainForm.invalid) {
            this.mainForm.markAllAsTouched();
            return;
        }

        if (this.mainForm.dirty && this.mainForm.valid) {
            this.abastecimento = Object.assign({}, this.abastecimento, this.mainForm.value)};

        this.abastecimento.litros = Number(this.abastecimento.litros);
        this.abastecimento.valorUnitario = Number(this.abastecimento.valorUnitario);
        this.abastecimento.valorTotal = Number(this.abastecimento.valorTotal);
        if (this.abastecimento.data) { this.abastecimento.data = new Date(this.abastecimento.data); } else { this.abastecimento.data = null!; }
        if (this.abastecimento.dataPagamento) { this.abastecimento.dataPagamento = new Date(this.abastecimento.dataPagamento); } else { this.abastecimento.dataPagamento = null!; }
        if (this.abastecimento.vencimento) { this.abastecimento.vencimento = new Date(this.abastecimento.vencimento); } else { this.abastecimento.vencimento = null!; }

        if(this.abastecimento.data != null && this.abastecimento.data.toString() == ""){
            this.abastecimento.data = null;
        }

        if(this.abastecimento.dataPagamento != null && this.abastecimento.dataPagamento.toString() == ""){
            this.abastecimento.dataPagamento = null;
        }

        if(this.abastecimento.vencimento != null && this.abastecimento.vencimento.toString() == ""){
            this.abastecimento.vencimento = null;
        }

        const $obs = this._aeronaveAbastecimentoService.insert(this.abastecimento);

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