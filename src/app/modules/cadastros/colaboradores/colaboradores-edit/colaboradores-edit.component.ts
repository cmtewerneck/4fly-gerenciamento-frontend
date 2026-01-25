import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColaboradorService } from '../colaboradores.service';
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
import { Colaborador } from '../colaboradores.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
    selector: 'app-colaborador-edit',
    templateUrl: './colaboradores-edit.component.html',
    styleUrls: ['./colaboradores-edit.component.scss'],
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

export class ColaboradorEditComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    colaborador: Colaborador;
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
        private _colaboradorService: ColaboradorService) {}

    ngOnInit(): void {

        this.mainForm = this._formBuilder.group({
            nome: ['', [Validators.required]],
            cargo: ['', [Validators.required]],
            cpf: ['', [Validators.required]],
            telefone: [''],
            admissao: [null],
            demissao: [null],
            salario: [null],
            validadeFamiliarizacaoSGSO: [null],
            validadeConscientizacaoAvsec: [null],
            validadeDDA: [null],
            validadeApam: [null],
            validadeCredencial: [null],
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
            this.colaborador = Object.assign({}, this.colaborador, this.mainForm.value)};

        this.colaborador.imagemUpload = this.croppedImage.split(',')[1];
        this.colaborador.imagem = this.imagemNome;

        this.colaborador.salario = Number(this.colaborador.salario)
        if (this.colaborador.admissao) { this.colaborador.admissao = new Date(this.colaborador.admissao); } else { this.colaborador.admissao = null!; }
        if (this.colaborador.demissao) { this.colaborador.demissao = new Date(this.colaborador.demissao); } else { this.colaborador.demissao = null!; }
        if (this.colaborador.validadeFamiliarizacaoSGSO) { this.colaborador.validadeFamiliarizacaoSGSO = new Date(this.colaborador.validadeFamiliarizacaoSGSO); } else { this.colaborador.validadeFamiliarizacaoSGSO = null!; }
        if (this.colaborador.validadeConscientizacaoAvsec) { this.colaborador.validadeConscientizacaoAvsec = new Date(this.colaborador.validadeConscientizacaoAvsec); } else { this.colaborador.validadeConscientizacaoAvsec = null!; }
        if (this.colaborador.validadeDDA) { this.colaborador.validadeDDA = new Date(this.colaborador.validadeDDA); } else { this.colaborador.validadeDDA = null!; }
        if (this.colaborador.validadeApam) { this.colaborador.validadeApam = new Date(this.colaborador.validadeApam); } else { this.colaborador.validadeApam = null!; }
        if (this.colaborador.validadeCredencial) { this.colaborador.validadeCredencial = new Date(this.colaborador.validadeCredencial); } else { this.colaborador.validadeCredencial = null!; }

        if(this.colaborador.admissao != null && this.colaborador.admissao.toString() == ""){
            this.colaborador.admissao = null;
        }

        if(this.colaborador.demissao != null && this.colaborador.demissao.toString() == ""){
            this.colaborador.demissao = null;
        }

        if(this.colaborador.validadeFamiliarizacaoSGSO != null && this.colaborador.validadeFamiliarizacaoSGSO.toString() == ""){
            this.colaborador.validadeFamiliarizacaoSGSO = null;
        }

        if(this.colaborador.validadeConscientizacaoAvsec != null && this.colaborador.validadeConscientizacaoAvsec.toString() == ""){
            this.colaborador.validadeConscientizacaoAvsec = null;
        }

        if(this.colaborador.validadeDDA != null && this.colaborador.validadeDDA.toString() == ""){
            this.colaborador.validadeDDA = null;
        }

        if(this.colaborador.validadeApam != null && this.colaborador.validadeApam.toString() == ""){
            this.colaborador.validadeApam = null;
        }

        if(this.colaborador.validadeCredencial != null && this.colaborador.validadeCredencial.toString() == ""){
            this.colaborador.validadeCredencial = null;
        }

        // const model = this.mainForm.value;

        const $obs = this._colaboradorService.insert(this.colaborador);

        this.isLoading = true;
        $obs.subscribe(_ => {
            this.isLoading = false;
            this.openSnackBar("Colaborador adicionado com sucesso.","Fechar");
            this.router.navigate(['/colaboradores']);
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