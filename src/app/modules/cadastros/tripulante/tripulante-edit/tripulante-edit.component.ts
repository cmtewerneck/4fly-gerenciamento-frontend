import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TripulanteService } from '../tripulantes.service';
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
import { Tripulante } from '../tripulantes.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
    selector: 'app-tripulante-edit',
    templateUrl: './tripulante-edit.component.html',
    styleUrls: ['./tripulante-edit.component.scss'],
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

export class TripulanteEditComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    tripulante: Tripulante;
    private _snackBar = inject(MatSnackBar);
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    // VARIÁVEIS PARA IMAGEM
    imageChangedEvent: any = '';
    croppedImage: any = '';
    imageUrl!: string;
    imagemNome!: string;
    imgSrc: string = "assets/img/causes_1.jpg";
    // FIM DA IMAGEM

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private _tripulanteService: TripulanteService) {}

    ngOnInit(): void {

        this.mainForm = this._formBuilder.group({
            nome: ['', [Validators.required]],
            cpf: ['', [Validators.required]],
            canac: ['', [Validators.required]],
            telefone: [''],
            salario: [null],
            validadeHmnc: [null],
            validadeHmnt: [null],
            validadeHmlt: [null],
            validadeIfrh: [null],
            validadeInvh: [null],
            validadeCma: [null],
            imagem: [''],
            imagemUpload: ['']
        });
    }

    save() {
        if (this.mainForm.invalid) {
            this.mainForm.markAllAsTouched();
            return;
        }

        if (this.mainForm.dirty && this.mainForm.valid) {
            this.tripulante = Object.assign({}, this.tripulante, this.mainForm.value)};

        this.tripulante.imagemUpload = this.croppedImage.split(',')[1];
        this.tripulante.imagem = this.imagemNome;

        this.tripulante.salario = Number(this.tripulante.salario)
        if (this.tripulante.validadeHmnc) { this.tripulante.validadeHmnc = new Date(this.tripulante.validadeHmnc); } else { this.tripulante.validadeHmnc = null!; }
        if (this.tripulante.validadeHmnt) { this.tripulante.validadeHmnt = new Date(this.tripulante.validadeHmnt); } else { this.tripulante.validadeHmnt = null!; }
        if (this.tripulante.validadeHmlt) { this.tripulante.validadeHmlt = new Date(this.tripulante.validadeHmlt); } else { this.tripulante.validadeHmlt = null!; }
        if (this.tripulante.validadeIfrh) { this.tripulante.validadeIfrh = new Date(this.tripulante.validadeIfrh); } else { this.tripulante.validadeIfrh = null!; }
        if (this.tripulante.validadeInvh) { this.tripulante.validadeInvh = new Date(this.tripulante.validadeInvh); } else { this.tripulante.validadeInvh = null!; }
        if (this.tripulante.validadeCma) { this.tripulante.validadeCma = new Date(this.tripulante.validadeCma); } else { this.tripulante.validadeCma = null!; }

        if(this.tripulante.validadeHmnc != null && this.tripulante.validadeHmnc.toString() == ""){
            this.tripulante.validadeHmnc = null;
        }

        if(this.tripulante.validadeHmnt != null && this.tripulante.validadeHmnt.toString() == ""){
            this.tripulante.validadeHmnt = null;
        }

        if(this.tripulante.validadeHmlt != null && this.tripulante.validadeHmlt.toString() == ""){
            this.tripulante.validadeHmlt = null;
        }

        if(this.tripulante.validadeIfrh != null && this.tripulante.validadeIfrh.toString() == ""){
            this.tripulante.validadeIfrh = null;
        }

        if(this.tripulante.validadeInvh != null && this.tripulante.validadeInvh.toString() == ""){
            this.tripulante.validadeInvh = null;
        }

        if(this.tripulante.validadeCma != null && this.tripulante.validadeCma.toString() == ""){
            this.tripulante.validadeCma = null;
        }

        const $obs = this._tripulanteService.insert(this.tripulante);

        this.isLoading = true;
        $obs.subscribe(_ => {
            this.isLoading = false;
            this.openSnackBar("Tripulante adicionado com sucesso.","Fechar");
            this.router.navigate(['/tripulantes']);
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

    fileChangeEvent(event: any): void {

      this.mainForm.markAsDirty();

      if (event.target.files && event.target.files[0]) {
        this.imgSrc = URL.createObjectURL(event.target.files[0]);
      }

      this.imagemNome = event.currentTarget.files[0].name;

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
          if(event.target.files[0].size > 3145728){
            this.removerFoto();
            return;
          }

          if(event.target.files[0].type != "image/png" && event.target.files[0].type != "image/jpg" && event.target.files[0].type != "image/jpeg"){
            this.removerFoto();
            return;
          }

          this.croppedImage = reader.result;
      };
    }
    
    removerFoto(){
      this.imagemNome = "";
      this.imgSrc = "assets/img/causes_1.jpg";
    }

}