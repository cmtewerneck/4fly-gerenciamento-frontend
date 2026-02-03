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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Vendedor } from '../vendedor.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-vendedor-update',
    templateUrl: './vendedor-update.component.html',
    styleUrls: ['./vendedor-update.component.scss'],
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

export class VendedorUpdateComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    vendedorToEdit: Vendedor;
    private _snackBar = inject(MatSnackBar);
            horizontalPosition: MatSnackBarHorizontalPosition = 'center';
            verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _vendedorService: VendedorService) {}

    ngOnInit(): void {
        this.mainForm = this._formBuilder.group({
            id: ['', [Validators.required]],
            nome: ['', [Validators.required]],
            ativo: ['', [Validators.required]]
        });

        this.loadEntity();
    }

    loadEntity() {
        this.isLoading = true;
        this._vendedorService.getById(this.route.snapshot.params["id"]).subscribe(model => {
            this.mainForm.patchValue(model);

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
            this.vendedorToEdit = Object.assign({}, this.vendedorToEdit, this.mainForm.value)};

        this.vendedorToEdit.ativo = this.vendedorToEdit.ativo.toString() == "true";

        const $obs = this._vendedorService.update(this.vendedorToEdit);

        this.isLoading = true;
        $obs.subscribe(_ => {
            //this._toastr.success('Aeronave criada com sucesso');
            this.isLoading = false;
            this.openSnackBar("Alterações realizadas com sucesso.","Fechar");
            this.router.navigate(['/vendedores']);
        }, error => {
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