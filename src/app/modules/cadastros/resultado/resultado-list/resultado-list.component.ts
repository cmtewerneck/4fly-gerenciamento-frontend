import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { FieldTypeEnum } from 'app/shared/enums/fieldType.enum';
import { FilterOperatorEnum } from 'app/shared/enums/filterOperator.enum';
import { OrderDirectionEnum } from 'app/shared/enums/orderDirection.enum';
import { FilterInfo } from 'app/shared/models/filterInfo.model';
import { QueryInfo } from 'app/shared/models/queryInfo.model';
import { MatDialog } from '@angular/material/dialog';
import { AeronaveResultado } from '../resultado.model';
import { AeronaveResultadoService } from '../resultado.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { UppercasePipe } from 'app/shared/pipes/uppercase.pipe';
import { OperacionalPipe } from 'app/shared/pipes/operacional.pipe';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ManutencaoQuery } from 'app/shared/models/manutencaoQuery.model';
import { AeronaveSocio, AeronaveSocioResultado } from '../../socios/socio.model';
import { AeronaveSocioService } from '../../socios/socio.service';
import { AeronaveVooService } from '../../voos/voo.service';
import { AeronaveOutrasDespesasService } from '../../outrasDespesas/outrasDespesas.service';

@Component({
    selector: 'app-resultado-list',
    templateUrl: './resultado-list.component.html',
    styleUrls: ['./resultado-list.component.scss'],
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
        FormsModule,
        UppercasePipe,
        OperacionalPipe
    ]
})

export class AeronaveResultadoListComponent implements OnInit, OnDestroy {

    @ViewChild(MatSort) private _sort: MatSort;

    resultado: AeronaveResultado;
    aeronaveId: string;
    resultadoFinal: number;
    valorCaixaAntesRetirada: number;
    valorCaixaDepoisRetirada: number;
    valorEmConta: number;
    caixa: number;

    private query = new QueryInfo();
    private resultadoQuery = new ManutencaoQuery();

    isLoading: boolean = false;
    productsCount: number = 0;
    productsTableColumns: string[] = ['descricao', 'valor'];

    searchInputControl: FormControl = new FormControl();

    isEdit = false;
    selectedId: string = null;

    filtersExpanded = false;
    filterForm: FormGroup;

    socios: AeronaveSocioResultado[] = [];
    valorDevidoSocio1: any;
    valorDevidoSocio2: any;
    retiradaSociosDespesa: any;
    retiradaOverhallDespesa: any;

    dataInicio = "2000-02-25T14:30:00";
    dataTermino = "2028-02-25T14:30:00";

    constructor(
        private _aeronaveResultadoService: AeronaveResultadoService,
        private _aeronaveOutrasDespesasService: AeronaveOutrasDespesasService,
        private _aeronaveSocioService: AeronaveSocioService,
        private _aeronaveVooService: AeronaveVooService,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router
    ) {this.aeronaveId = this.route.snapshot.paramMap.get('id');}

    ngOnInit(): void {
        this.filterForm = this._formBuilder.group({
            dataInicio: [null],
            dataTermino: [null]
        });

        this.query.filters = [];
        this.query.order = {
            fieldName: "data",
            direction: OrderDirectionEnum.Descending
        };
        this.query.pageNumber = 1;
        this.query.pageSize = 25;

        this.obterSocio();
        this.retiradaSocios();
        this.retiradaOverhall();
        this.load();
    }

    ngOnDestroy(): void {
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    load() {
        this.isLoading = true;
        this._aeronaveResultadoService.listByAeronaveId(this.dataInicio, this.dataTermino, this.aeronaveId).subscribe(result => {
            this.resultado = result;

            this.resultadoFinal = result.custoVoosTotal - (result.abastecimentosTotal + result.frellancerTotal + result.manutencoesTotal + result.outrasDespesasTotal + result.overhallTotal + result.tarifasTotal);
            this.caixa = 36102;
            this.valorCaixaAntesRetirada = this.caixa + result.custoVoosTotal - (result.abastecimentosTotal + result.frellancerTotal + result.manutencoesTotal + result.outrasDespesasTotal + result.tarifasTotal);
            this.valorCaixaDepoisRetirada = this.caixa + result.custoVoosTotal - (result.abastecimentosTotal + result.frellancerTotal + result.manutencoesTotal + result.outrasDespesasTotal + result.tarifasTotal);
            
            
            this.valorEmConta = this.valorCaixaDepoisRetirada - this.resultado.voosPagar + (this.resultado.abastecimentosPagar + this.resultado.tarifasPagar + this.resultado.freelancersPagar + this.resultado.manutencoesPagar + this.resultado.outrasDespesasPagar);
        }, error => {
            console.log(error);
        }, () => {
            this.isLoading = false;
        });
    }

    obterSocio() {
        this.isLoading = true;
        this._aeronaveSocioService.listByAeronaveId(this.aeronaveId).subscribe(result => {
            this.socios = result;

            if(this.socios.length == 1){
                this._aeronaveVooService.sociosDevidos(this.socios[0].nome).subscribe(result => {
                    this.valorDevidoSocio1 = result;
                }, error => {
                    console.log(error);
                }, () => {});
            }

            if(this.socios.length == 2){
                this._aeronaveVooService.sociosDevidos(this.socios[0].nome).subscribe(result => {
                    this.valorDevidoSocio1 = result;
                }, error => {
                    console.log(error);
                }, () => {});

                this._aeronaveVooService.sociosDevidos(this.socios[1].nome).subscribe(result => {
                    this.valorDevidoSocio2 = result;
                }, error => {
                    console.log(error);
                }, () => {});
            }

        }, error => {
            console.log(error);
        }, () => {
            this.isLoading = false;
        });
    }

    retiradaSocios() {
        this.isLoading = true;
        this._aeronaveOutrasDespesasService.retiradaSocios(this.aeronaveId, this.dataInicio, this.dataTermino).subscribe(result => {
            this.retiradaSociosDespesa = result;
        }, error => {
            console.log(error);
        }, () => {
            this.isLoading = false;
        });
    }

    retiradaOverhall() {
        this.isLoading = true;
        this._aeronaveOutrasDespesasService.retiradaOverhall(this.aeronaveId, this.dataInicio, this.dataTermino).subscribe(result => {
            this.retiradaOverhallDespesa = result;
        }, error => {
            console.log(error);
        }, () => {
            this.isLoading = false;
        });
    }
    
    onFilterExpanded() {
        this.filtersExpanded = !this.filtersExpanded;
    }

    voltar(){
         this.router.navigate(['/aeronaves/details/' + this.aeronaveId]);
    }

    filter() {
        this.query.filters = [];
        const filter = this.filterForm.value;

        if (filter.dataInicio?.trim()) {
            this.query.filters.push(new FilterInfo('dataInicio', FieldTypeEnum.DateTime, FilterOperatorEnum.HigherOrEqual, filter.dataInicio.trim()));
        }

        if (filter.dataTermino?.trim()) {
            this.query.filters.push(new FilterInfo('dataTermino', FieldTypeEnum.DateTime, FilterOperatorEnum.LessOrEqual, filter.dataTermino.trim()));
        }

        this.load();
    }

    clearFilter() {
        this.filterForm.reset();
    }
}
