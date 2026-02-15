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
import { AeronaveManutencao } from '../manutencao.model';
import { environment } from 'environments/environment';
import { AeronaveManutencaoService } from '../manutencao.service';

@Component({
    selector: 'app-manutencao-update',
    templateUrl: './manutencao-update.component.html',
    styleUrls: ['./manutencao-update.component.scss'],
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

export class AeronaveManutencaoUpdateComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    aeronaveManutencaoToEdit: AeronaveManutencao;
    aeronaveId: string;

   constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _aeronaveManutencaoService: AeronaveManutencaoService) {}

    ngOnInit(): void {
        this.mainForm = this._formBuilder.group({
            id: ['', [Validators.required]],
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

        this.loadEntity();
    }

    loadEntity() {
        this.isLoading = true;
        this._aeronaveManutencaoService.getById(this.route.snapshot.params["id"]).subscribe(model => {

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
            this.aeronaveManutencaoToEdit = Object.assign({}, this.aeronaveManutencaoToEdit, this.mainForm.value)};


        this.aeronaveManutencaoToEdit.valor = Number(this.aeronaveManutencaoToEdit.valor);
        if (this.aeronaveManutencaoToEdit.data) { this.aeronaveManutencaoToEdit.data = new Date(this.aeronaveManutencaoToEdit.data); } else { this.aeronaveManutencaoToEdit.data = null!; }
        if (this.aeronaveManutencaoToEdit.dataPagamento) { this.aeronaveManutencaoToEdit.dataPagamento = new Date(this.aeronaveManutencaoToEdit.dataPagamento); } else { this.aeronaveManutencaoToEdit.dataPagamento = null!; }
        if (this.aeronaveManutencaoToEdit.vencimento) { this.aeronaveManutencaoToEdit.vencimento = new Date(this.aeronaveManutencaoToEdit.vencimento); } else { this.aeronaveManutencaoToEdit.vencimento = null!; }

        if(this.aeronaveManutencaoToEdit.data != null && this.aeronaveManutencaoToEdit.data.toString() == ""){
            this.aeronaveManutencaoToEdit.data = null;
        }

        if(this.aeronaveManutencaoToEdit.dataPagamento != null && this.aeronaveManutencaoToEdit.dataPagamento.toString() == ""){
            this.aeronaveManutencaoToEdit.dataPagamento = null;
        }

        if(this.aeronaveManutencaoToEdit.vencimento != null && this.aeronaveManutencaoToEdit.vencimento.toString() == ""){
            this.aeronaveManutencaoToEdit.vencimento = null;
        }

        const $obs = this._aeronaveManutencaoService.update(this.aeronaveManutencaoToEdit);

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