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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Colaborador } from '../colaboradores.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-colaborador-update',
    templateUrl: './colaboradores-update.component.html',
    styleUrls: ['./colaboradores-update.component.scss'],
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

export class ColaboradorUpdateComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    colaboradorToEdit: Colaborador;
    private _snackBar = inject(MatSnackBar);
            horizontalPosition: MatSnackBarHorizontalPosition = 'center';
            verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    // VARIÁVEIS PARA IMAGEM
    imageChangedEvent: any = '';
    croppedImage: any = '';
    imageUrl!: string;
    imagemNome!: string;
    imgSrc: string = "assets/img/causes_1.jpg";
    imagens: string = environment.imagensUrl; 
    // FIM DA IMAGEM

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _colaboradorService: ColaboradorService) {}

    ngOnInit(): void {
        this.mainForm = this._formBuilder.group({
            id: ['', [Validators.required]],
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

        this.loadEntity();
    }

    loadEntity() {
        this.isLoading = true;
        this._colaboradorService.getById(this.route.snapshot.params["id"]).subscribe(model => {
            this.mainForm.patchValue(model);
            
            this.mainForm.patchValue({
                admissao: model.admissao?.toString().split('T')[0] ?? null,
                demissao: model.demissao?.toString().split('T')[0] ?? null,
                validadeFamiliarizacaoSGSO: model.validadeFamiliarizacaoSGSO?.toString().split('T')[0] ?? null,
                validadeConscientizacaoAvsec: model.validadeConscientizacaoAvsec?.toString().split('T')[0] ?? null,
                validadeDDA: model.validadeDDA?.toString().split('T')[0] ?? null,
                validadeApam: model.validadeApam?.toString().split('T')[0] ?? null,
                validadeCredencial: model.validadeCredencial?.toString().split('T')[0] ?? null
            });

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
            this.colaboradorToEdit = Object.assign({}, this.colaboradorToEdit, this.mainForm.value)};

        this.colaboradorToEdit.imagemUpload = this.croppedImage.split(',')[1];
        this.colaboradorToEdit.imagem = this.imagemNome;

        this.colaboradorToEdit.salario = Number(this.colaboradorToEdit.salario);
        if (this.colaboradorToEdit.admissao) { this.colaboradorToEdit.admissao = new Date(this.colaboradorToEdit.admissao); } else { this.colaboradorToEdit.admissao = null!; }
        if (this.colaboradorToEdit.demissao) { this.colaboradorToEdit.demissao = new Date(this.colaboradorToEdit.demissao); } else { this.colaboradorToEdit.demissao = null!; }
        if (this.colaboradorToEdit.validadeFamiliarizacaoSGSO) { this.colaboradorToEdit.validadeFamiliarizacaoSGSO = new Date(this.colaboradorToEdit.validadeFamiliarizacaoSGSO); } else { this.colaboradorToEdit.validadeFamiliarizacaoSGSO = null!; }
        if (this.colaboradorToEdit.validadeConscientizacaoAvsec) { this.colaboradorToEdit.validadeConscientizacaoAvsec = new Date(this.colaboradorToEdit.validadeConscientizacaoAvsec); } else { this.colaboradorToEdit.validadeConscientizacaoAvsec = null!; }
        if (this.colaboradorToEdit.validadeDDA) { this.colaboradorToEdit.validadeDDA = new Date(this.colaboradorToEdit.validadeDDA); } else { this.colaboradorToEdit.validadeDDA = null!; }
        if (this.colaboradorToEdit.validadeApam) { this.colaboradorToEdit.validadeApam = new Date(this.colaboradorToEdit.validadeApam); } else { this.colaboradorToEdit.validadeApam = null!; }
        if (this.colaboradorToEdit.validadeCredencial) { this.colaboradorToEdit.validadeCredencial = new Date(this.colaboradorToEdit.validadeCredencial); } else { this.colaboradorToEdit.validadeCredencial = null!; }

        if(this.colaboradorToEdit.admissao != null && this.colaboradorToEdit.admissao.toString() == ""){
            this.colaboradorToEdit.admissao = null;
        }

        if(this.colaboradorToEdit.demissao != null && this.colaboradorToEdit.demissao.toString() == ""){
            this.colaboradorToEdit.demissao = null;
        }

        if(this.colaboradorToEdit.validadeFamiliarizacaoSGSO != null && this.colaboradorToEdit.validadeFamiliarizacaoSGSO.toString() == ""){
            this.colaboradorToEdit.validadeFamiliarizacaoSGSO = null;
        }

        if(this.colaboradorToEdit.validadeConscientizacaoAvsec != null && this.colaboradorToEdit.validadeConscientizacaoAvsec.toString() == ""){
            this.colaboradorToEdit.validadeConscientizacaoAvsec = null;
        }

        if(this.colaboradorToEdit.validadeDDA != null && this.colaboradorToEdit.validadeDDA.toString() == ""){
            this.colaboradorToEdit.validadeDDA = null;
        }

        if(this.colaboradorToEdit.validadeApam != null && this.colaboradorToEdit.validadeApam.toString() == ""){
            this.colaboradorToEdit.validadeApam = null;
        }

        if(this.colaboradorToEdit.validadeCredencial != null && this.colaboradorToEdit.validadeCredencial.toString() == ""){
            this.colaboradorToEdit.validadeCredencial = null;
        }

        const $obs = this._colaboradorService.update(this.colaboradorToEdit);

        this.isLoading = true;
        $obs.subscribe(_ => {
            //this._toastr.success('Aeronave criada com sucesso');
            this.isLoading = false;
            this.openSnackBar("Alterações realizadas com sucesso.","Fechar");
            this.router.navigate(['/colaboradores']);
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
      this.imgSrc = "public/images/cards/causes_1.jpg";
    }

}