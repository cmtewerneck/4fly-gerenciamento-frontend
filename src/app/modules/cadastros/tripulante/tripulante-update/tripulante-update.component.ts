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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Tripulante } from '../tripulantes.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-tripulante-update',
    templateUrl: './tripulante-update.component.html',
    styleUrls: ['./tripulante-update.component.scss'],
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

export class TripulanteUpdateComponent implements OnInit {

    isLoading: boolean = false;
    mainForm: FormGroup;
    tripulanteToEdit: Tripulante;
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
        private _tripulanteService: TripulanteService) {}

    ngOnInit(): void {
        this.mainForm = this._formBuilder.group({
            id: ['', [Validators.required]],
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

        this.loadEntity();
    }

    loadEntity() {
        this.isLoading = true;
        this._tripulanteService.getById(this.route.snapshot.params["id"]).subscribe(model => {
            this.mainForm.patchValue(model);
            
            this.mainForm.patchValue({
                validadeHmnc: model.validadeHmnc?.toString().split('T')[0] ?? null,
                validadeHmnt: model.validadeHmnt?.toString().split('T')[0] ?? null,
                validadeHmlt: model.validadeHmlt?.toString().split('T')[0] ?? null,
                validadeIfrh: model.validadeIfrh?.toString().split('T')[0] ?? null,
                validadeInvh: model.validadeInvh?.toString().split('T')[0] ?? null,
                validadeCma: model.validadeCma?.toString().split('T')[0] ?? null
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
            this.tripulanteToEdit = Object.assign({}, this.tripulanteToEdit, this.mainForm.value)};

        this.tripulanteToEdit.imagemUpload = this.croppedImage.split(',')[1];
        this.tripulanteToEdit.imagem = this.imagemNome;

        this.tripulanteToEdit.salario = Number(this.tripulanteToEdit.salario);
        if (this.tripulanteToEdit.validadeHmnc) { this.tripulanteToEdit.validadeHmnc = new Date(this.tripulanteToEdit.validadeHmnc); } else { this.tripulanteToEdit.validadeHmnc = null!; }
        if (this.tripulanteToEdit.validadeHmnt) { this.tripulanteToEdit.validadeHmnt = new Date(this.tripulanteToEdit.validadeHmnt); } else { this.tripulanteToEdit.validadeHmnt = null!; }
        if (this.tripulanteToEdit.validadeHmlt) { this.tripulanteToEdit.validadeHmlt = new Date(this.tripulanteToEdit.validadeHmlt); } else { this.tripulanteToEdit.validadeHmlt = null!; }
        if (this.tripulanteToEdit.validadeIfrh) { this.tripulanteToEdit.validadeIfrh = new Date(this.tripulanteToEdit.validadeIfrh); } else { this.tripulanteToEdit.validadeIfrh = null!; }
        if (this.tripulanteToEdit.validadeInvh) { this.tripulanteToEdit.validadeInvh = new Date(this.tripulanteToEdit.validadeInvh); } else { this.tripulanteToEdit.validadeInvh = null!; }
        if (this.tripulanteToEdit.validadeCma) { this.tripulanteToEdit.validadeCma = new Date(this.tripulanteToEdit.validadeCma); } else { this.tripulanteToEdit.validadeCma = null!; }

        if(this.tripulanteToEdit.validadeHmnc != null && this.tripulanteToEdit.validadeHmnc.toString() == ""){
            this.tripulanteToEdit.validadeHmnc = null;
        }

        if(this.tripulanteToEdit.validadeHmnt != null && this.tripulanteToEdit.validadeHmnt.toString() == ""){
            this.tripulanteToEdit.validadeHmnt = null;
        }

        if(this.tripulanteToEdit.validadeHmlt != null && this.tripulanteToEdit.validadeHmlt.toString() == ""){
            this.tripulanteToEdit.validadeHmlt = null;
        }

        if(this.tripulanteToEdit.validadeIfrh != null && this.tripulanteToEdit.validadeIfrh.toString() == ""){
            this.tripulanteToEdit.validadeIfrh = null;
        }

        if(this.tripulanteToEdit.validadeInvh != null && this.tripulanteToEdit.validadeInvh.toString() == ""){
            this.tripulanteToEdit.validadeInvh = null;
        }

        if(this.tripulanteToEdit.validadeCma != null && this.tripulanteToEdit.validadeCma.toString() == ""){
            this.tripulanteToEdit.validadeCma = null;
        }

        const $obs = this._tripulanteService.update(this.tripulanteToEdit);

        this.isLoading = true;
        $obs.subscribe(_ => {
            //this._toastr.success('Aeronave criada com sucesso');
            this.isLoading = false;
            this.openSnackBar("Alterações realizadas com sucesso.","Fechar");
            this.router.navigate(['/tripulantes']);
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