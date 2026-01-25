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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Aeronave } from '../aeronave.model';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-aeronave-update',
    templateUrl: './aeronave-update.component.html',
    styleUrls: ['./aeronave-update.component.scss'],
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

export class AeronaveUpdateComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    aeronaveToEdit: Aeronave;

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
        private _aeronaveService: AeronaveService) {}

    ngOnInit(): void {
        this.mainForm = this._formBuilder.group({
            id: ['', [Validators.required]],
            matricula: ['', [Validators.required]],
            fabricante: ['', [Validators.required]],
            modelo: ['', [Validators.required]],
            numeroSerie: ['',],
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

        this.loadEntity();
    }

    loadEntity() {
        this.isLoading = true;
        this._aeronaveService.getById(this.route.snapshot.params["id"]).subscribe(model => {

            this.mainForm.patchValue(model);

             this.mainForm.patchValue({
                validadeCVA: model.validadeCVA?.toString().split('T')[0] ?? null,
                validadeLicencaEstacao: model.validadeLicencaEstacao?.toString().split('T')[0] ?? null,
                validadeReta: model.validadeReta?.toString().split('T')[0] ?? null,
                validadeCasco: model.validadeCasco?.toString().split('T')[0] ?? null,
                validadeResponsabilidadeCivil: model.validadeResponsabilidadeCivil?.toString().split('T')[0] ?? null,
                validadePesagem: model.validadePesagem?.toString().split('T')[0] ?? null,
                emissaoCA: model.emissaoCA?.toString().split('T')[0] ?? null,
                emissaoCM: model.emissaoCM?.toString().split('T')[0] ?? null
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
            this.aeronaveToEdit = Object.assign({}, this.aeronaveToEdit, this.mainForm.value)};

        this.aeronaveToEdit.imagemUpload = this.croppedImage.split(',')[1];
        this.aeronaveToEdit.imagem = this.imagemNome;

        this.aeronaveToEdit.capacidade = Number(this.aeronaveToEdit.capacidade);
        this.aeronaveToEdit.ano = Number(this.aeronaveToEdit.ano);
        this.aeronaveToEdit.situacao = this.aeronaveToEdit.situacao.toString() == "true";
        if (this.aeronaveToEdit.validadeCVA) { this.aeronaveToEdit.validadeCVA = new Date(this.aeronaveToEdit.validadeCVA); } else { this.aeronaveToEdit.validadeCVA = null!; }
        if (this.aeronaveToEdit.validadeLicencaEstacao) { this.aeronaveToEdit.validadeLicencaEstacao = new Date(this.aeronaveToEdit.validadeLicencaEstacao); } else { this.aeronaveToEdit.validadeLicencaEstacao = null!; }
        if (this.aeronaveToEdit.validadeReta) { this.aeronaveToEdit.validadeReta = new Date(this.aeronaveToEdit.validadeReta); } else { this.aeronaveToEdit.validadeReta = null!; }
        if (this.aeronaveToEdit.validadeCasco) { this.aeronaveToEdit.validadeCasco = new Date(this.aeronaveToEdit.validadeCasco); } else { this.aeronaveToEdit.validadeCasco = null!; }
        if (this.aeronaveToEdit.validadeResponsabilidadeCivil) { this.aeronaveToEdit.validadeResponsabilidadeCivil = new Date(this.aeronaveToEdit.validadeResponsabilidadeCivil); } else { this.aeronaveToEdit.validadeResponsabilidadeCivil = null!; }
        if (this.aeronaveToEdit.validadePesagem) { this.aeronaveToEdit.validadePesagem = new Date(this.aeronaveToEdit.validadePesagem); } else { this.aeronaveToEdit.validadePesagem = null!; }
        if (this.aeronaveToEdit.emissaoCA) { this.aeronaveToEdit.emissaoCA = new Date(this.aeronaveToEdit.emissaoCA); } else { this.aeronaveToEdit.emissaoCA = null!; }
        if (this.aeronaveToEdit.emissaoCM) { this.aeronaveToEdit.emissaoCM = new Date(this.aeronaveToEdit.emissaoCM); } else { this.aeronaveToEdit.emissaoCM = null!; }

        if(this.aeronaveToEdit.validadeCVA != null && this.aeronaveToEdit.validadeCVA.toString() == ""){
            this.aeronaveToEdit.validadeCVA = null;
        }

        if(this.aeronaveToEdit.validadeLicencaEstacao != null && this.aeronaveToEdit.validadeLicencaEstacao.toString() == ""){
            this.aeronaveToEdit.validadeLicencaEstacao = null;
        }

        if(this.aeronaveToEdit.validadeReta != null && this.aeronaveToEdit.validadeReta.toString() == ""){
            this.aeronaveToEdit.validadeReta = null;
        }

        if(this.aeronaveToEdit.validadeCasco != null && this.aeronaveToEdit.validadeCasco.toString() == ""){
            this.aeronaveToEdit.validadeCasco = null;
        }

        if(this.aeronaveToEdit.validadeResponsabilidadeCivil != null && this.aeronaveToEdit.validadeResponsabilidadeCivil.toString() == ""){
            this.aeronaveToEdit.validadeResponsabilidadeCivil = null;
        }

        if(this.aeronaveToEdit.validadePesagem != null && this.aeronaveToEdit.validadePesagem.toString() == ""){
            this.aeronaveToEdit.validadePesagem = null;
        }

        if(this.aeronaveToEdit.emissaoCA != null && this.aeronaveToEdit.emissaoCA.toString() == ""){
            this.aeronaveToEdit.emissaoCA = null;
        }

        if(this.aeronaveToEdit.emissaoCM != null && this.aeronaveToEdit.emissaoCM.toString() == ""){
            this.aeronaveToEdit.emissaoCM = null;
        }

        const $obs = this._aeronaveService.update(this.aeronaveToEdit);

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
      this.imgSrc = "public/images/cards/causes_1.jpg";
    }

}