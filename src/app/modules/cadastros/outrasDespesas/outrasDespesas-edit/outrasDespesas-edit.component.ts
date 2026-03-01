import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AeronaveOutrasDespesasService } from '../outrasDespesas.service';
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
import { SafePipe } from 'app/shared/pipes/safe.pipe';

@Component({
    selector: 'app-outrasDespesas-edit',
    templateUrl: './outrasDespesas-edit.component.html',
    styleUrls: ['./outrasDespesas-edit.component.scss'],
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

export class AeronaveOutrasDespesasEditComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    outrasDespesas: AeronaveOutrasDespesas;
    aeronaveId: string;

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _aeronaveOutrasDespesasService: AeronaveOutrasDespesasService) {this.aeronaveId = this.route.snapshot.paramMap.get('id');}

    ngOnInit(): void {

        this.mainForm = this._formBuilder.group({
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
    }

    save() {
        if (this.mainForm.invalid) {
            this.mainForm.markAllAsTouched();
            return;
        }

        if (this.mainForm.dirty && this.mainForm.valid) {
            this.outrasDespesas = Object.assign({}, this.outrasDespesas, this.mainForm.value)};

        this.outrasDespesas.valor = Number(this.outrasDespesas.valor);
        if (this.outrasDespesas.data) { this.outrasDespesas.data = new Date(this.outrasDespesas.data); } else { this.outrasDespesas.data = null!; }
        if (this.outrasDespesas.dataPagamento) { this.outrasDespesas.dataPagamento = new Date(this.outrasDespesas.dataPagamento); } else { this.outrasDespesas.dataPagamento = null!; }
        if (this.outrasDespesas.vencimento) { this.outrasDespesas.vencimento = new Date(this.outrasDespesas.vencimento); } else { this.outrasDespesas.vencimento = null!; }

        if(this.outrasDespesas.data != null && this.outrasDespesas.data.toString() == ""){
            this.outrasDespesas.data = null;
        }

        if(this.outrasDespesas.dataPagamento != null && this.outrasDespesas.dataPagamento.toString() == ""){
            this.outrasDespesas.dataPagamento = null;
        }

        if(this.outrasDespesas.vencimento != null && this.outrasDespesas.vencimento.toString() == ""){
            this.outrasDespesas.vencimento = null;
        }

        const $obs = this._aeronaveOutrasDespesasService.insert(this.outrasDespesas);

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