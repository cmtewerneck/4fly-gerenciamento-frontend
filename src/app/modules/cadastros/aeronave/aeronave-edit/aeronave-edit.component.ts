import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AeronaveService } from '../aeronave.service';
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
import { Aeronave } from '../aeronave.model';
import { SafePipe } from 'app/shared/pipes/safe.pipe';

@Component({
    selector: 'app-aeronave-edit',
    templateUrl: './aeronave-edit.component.html',
    styleUrls: ['./aeronave-edit.component.scss'],
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

export class AeronaveEditComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    aeronave: Aeronave;

    imgSrc: string = "assets/img/causes_1.jpg";
    descricao_curta_card: string = "";
    nome_pet_card: string = "";
    celular_card: string = "";
    tipo_pet_card: any = "";
    tipoAnuncianteToggle: string = "";

    // VARIÁVEIS PARA IMAGEM
    imageChangedEvent: any = '';
    croppedImage: any = '';
    imageUrl!: string;
    imagemNome!: string;
    // FIM DA IMAGEM

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private _aeronaveService: AeronaveService) {}

    ngOnInit(): void {

        this.mainForm = this._formBuilder.group({
            matricula: ['', [Validators.required]],
            fabricante: ['', [Validators.required]],
            modelo: ['', [Validators.required]],
            numeroSerie: [''],
            ano: [''],
            capacidade: [''],
            situacao: ['', [Validators.required]],
            validadeCVA: [null],
            validadeLicencaEstacao: [null],
            validadeReta: [null],
            validadeCasco: [null],
            validadeResponsabilidadeCivil: [null],
            validadePesagem: [null],
            emissaoCA: [null],
            emissaoCM: [null],
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
            this.aeronave = Object.assign({}, this.aeronave, this.mainForm.value)};

        this.aeronave.imagemUpload = this.croppedImage.split(',')[1];
        this.aeronave.imagem = this.imagemNome;

        this.aeronave.capacidade = Number(this.aeronave.capacidade);
        this.aeronave.ano = Number(this.aeronave.ano);
        this.aeronave.situacao = this.aeronave.situacao.toString() == "true";
        if (this.aeronave.validadeCVA) { this.aeronave.validadeCVA = new Date(this.aeronave.validadeCVA); } else { this.aeronave.validadeCVA = null!; }
        if (this.aeronave.validadeLicencaEstacao) { this.aeronave.validadeLicencaEstacao = new Date(this.aeronave.validadeLicencaEstacao); } else { this.aeronave.validadeLicencaEstacao = null!; }
        if (this.aeronave.validadeReta) { this.aeronave.validadeReta = new Date(this.aeronave.validadeReta); } else { this.aeronave.validadeReta = null!; }
        if (this.aeronave.validadeCasco) { this.aeronave.validadeCasco = new Date(this.aeronave.validadeCasco); } else { this.aeronave.validadeCasco = null!; }
        if (this.aeronave.validadeResponsabilidadeCivil) { this.aeronave.validadeResponsabilidadeCivil = new Date(this.aeronave.validadeResponsabilidadeCivil); } else { this.aeronave.validadeResponsabilidadeCivil = null!; }
        if (this.aeronave.validadePesagem) { this.aeronave.validadePesagem = new Date(this.aeronave.validadePesagem); } else { this.aeronave.validadePesagem = null!; }
        if (this.aeronave.emissaoCA) { this.aeronave.emissaoCA = new Date(this.aeronave.emissaoCA); } else { this.aeronave.emissaoCA = null!; }
        if (this.aeronave.emissaoCM) { this.aeronave.emissaoCM = new Date(this.aeronave.emissaoCM); } else { this.aeronave.emissaoCM = null!; }

        if(this.aeronave.validadeCVA != null && this.aeronave.validadeCVA.toString() == ""){
            this.aeronave.validadeCVA = null;
        }

        if(this.aeronave.validadeLicencaEstacao != null && this.aeronave.validadeLicencaEstacao.toString() == ""){
            this.aeronave.validadeLicencaEstacao = null;
        }

        if(this.aeronave.validadeReta != null && this.aeronave.validadeReta.toString() == ""){
            this.aeronave.validadeReta = null;
        }

        if(this.aeronave.validadeCasco != null && this.aeronave.validadeCasco.toString() == ""){
            this.aeronave.validadeCasco = null;
        }

        if(this.aeronave.validadeResponsabilidadeCivil != null && this.aeronave.validadeResponsabilidadeCivil.toString() == ""){
            this.aeronave.validadeResponsabilidadeCivil = null;
        }

        if(this.aeronave.validadePesagem != null && this.aeronave.validadePesagem.toString() == ""){
            this.aeronave.validadePesagem = null;
        }

        if(this.aeronave.emissaoCA != null && this.aeronave.emissaoCA.toString() == ""){
            this.aeronave.emissaoCA = null;
        }

        if(this.aeronave.emissaoCM != null && this.aeronave.emissaoCM.toString() == ""){
            this.aeronave.emissaoCM = null;
        }

        // const model = this.mainForm.value;

        const $obs = this._aeronaveService.insert(this.aeronave);

        this.isLoading = true;
        $obs.subscribe(_ => {
            //this._toastr.success('Aeronave criada com sucesso');
            this.isLoading = false;

            this.router.navigate(['/aeronaves']);
        }, error => {
            this.isLoading = false;
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