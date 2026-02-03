import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VendedorService } from '../vendedor.service';
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
import { Router, RouterModule } from '@angular/router';
import { Vendedor } from '../vendedor.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
    selector: 'app-vendedor-edit',
    templateUrl: './vendedor-edit.component.html',
    styleUrls: ['./vendedor-edit.component.scss'],
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

export class VendedorEditComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    vendedor: Vendedor;
    private _snackBar = inject(MatSnackBar);
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private _vendedorService: VendedorService) {}

    ngOnInit(): void {

        this.mainForm = this._formBuilder.group({
            nome: ['', [Validators.required]],
            ativo: ['', [Validators.required]]
        });
    }

    save() {
        if (this.mainForm.invalid) {
            this.mainForm.markAllAsTouched();
            return;
        }

        if (this.mainForm.dirty && this.mainForm.valid) {
            this.vendedor = Object.assign({}, this.vendedor, this.mainForm.value)};

        this.vendedor.ativo = this.vendedor.ativo.toString() == "true";

        const $obs = this._vendedorService.insert(this.vendedor);

        this.isLoading = true;
        $obs.subscribe(_ => {
            this.isLoading = false;
            this.openSnackBar("Vendedor adicionado com sucesso.","Fechar");
            this.router.navigate(['/vendedores']);
        }, error => {
            this.openSnackBar(error.error.errors[0],"Fechar");
            this.isLoading = false;
        });
    }

    openSnackBar(message1: string, message2: string) {
        this._snackBar.open(message1, message2, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

}