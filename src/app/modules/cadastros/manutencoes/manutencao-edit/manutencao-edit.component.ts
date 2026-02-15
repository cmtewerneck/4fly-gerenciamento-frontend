import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AeronaveManutencaoService } from '../manutencao.service';
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
import { AeronaveManutencao } from '../manutencao.model';
import { SafePipe } from 'app/shared/pipes/safe.pipe';

@Component({
    selector: 'app-manutencao-edit',
    templateUrl: './manutencao-edit.component.html',
    styleUrls: ['./manutencao-edit.component.scss'],
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

export class AeronaveManutencaoEditComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    manutencao: AeronaveManutencao;
    aeronaveId: string;

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _aeronaveManutencaoService: AeronaveManutencaoService) {this.aeronaveId = this.route.snapshot.paramMap.get('id');}

    ngOnInit(): void {

        this.mainForm = this._formBuilder.group({
            data: ['', [Validators.required]],
            descricao: ['', [Validators.required]],
            realizadoPor: ['', [Validators.required]],
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
            this.manutencao = Object.assign({}, this.manutencao, this.mainForm.value)};

        this.manutencao.valor = Number(this.manutencao.valor);
        if (this.manutencao.data) { this.manutencao.data = new Date(this.manutencao.data); } else { this.manutencao.data = null!; }
        if (this.manutencao.dataPagamento) { this.manutencao.dataPagamento = new Date(this.manutencao.dataPagamento); } else { this.manutencao.dataPagamento = null!; }
        if (this.manutencao.vencimento) { this.manutencao.vencimento = new Date(this.manutencao.vencimento); } else { this.manutencao.vencimento = null!; }

        if(this.manutencao.data != null && this.manutencao.data.toString() == ""){
            this.manutencao.data = null;
        }

        if(this.manutencao.dataPagamento != null && this.manutencao.dataPagamento.toString() == ""){
            this.manutencao.dataPagamento = null;
        }

        if(this.manutencao.vencimento != null && this.manutencao.vencimento.toString() == ""){
            this.manutencao.vencimento = null;
        }

        const $obs = this._aeronaveManutencaoService.insert(this.manutencao);

        this.isLoading = true;
        $obs.subscribe(_ => {
            this.isLoading = false;

            this.router.navigate(['/manutencoes/' + this.aeronaveId]);
        }, error => {
            this.isLoading = false;
        });
    }   
    
    voltar(){
        this.router.navigate(['/manutencoes/' + this.aeronaveId]);
    }

}