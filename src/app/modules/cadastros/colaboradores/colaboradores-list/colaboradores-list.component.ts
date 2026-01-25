import { Component, inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { FieldTypeEnum } from 'app/shared/enums/fieldType.enum';
import { FilterOperatorEnum } from 'app/shared/enums/filterOperator.enum';
import { OrderDirectionEnum } from 'app/shared/enums/orderDirection.enum';
import { FilterInfo } from 'app/shared/models/filterInfo.model';
import { QueryInfo } from 'app/shared/models/queryInfo.model';
import { MatDialog } from '@angular/material/dialog';
import { Colaborador } from '../colaboradores.model';
import { ColaboradorService } from '../colaboradores.service';
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
import { SituacaoColaboradorPipe } from 'app/shared/pipes/situacao-colaborador.pipe';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
    selector: 'app-colaborador-list',
    templateUrl: './colaboradores-list.component.html',
    styleUrls: ['./colaboradores-list.component.scss'],
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
        OperacionalPipe,
        SituacaoColaboradorPipe
    ]
})

export class ColaboradorListComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    private _snackBar = inject(MatSnackBar);
        horizontalPosition: MatSnackBarHorizontalPosition = 'center';
        verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    colaboradores: Colaborador[] = [];
    colaboradoresRab: string[] = [];

    pagination = {
        length: 0,
        page: 0,
        size: 25
    };

    private query = new QueryInfo();

    isLoading: boolean = false;
    productsCount: number = 0;
    productsTableColumns: string[] = ['nome', 'cpf', 'cargo', 'telefone', 'admissao', 'demissao', 'actions'];

    searchInputControl: FormControl = new FormControl();

    isEdit = false;
    selectedId: string = null;

    filtersExpanded = false;
    filterForm: FormGroup;

    constructor(
        private _colaboradorService: ColaboradorService,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        public dialog: MatDialog,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.filterForm = this._formBuilder.group({
            nome: [''],
            cargo: [''],
        });

        this.query.filters = [];
        this.query.order = {
            fieldName: "nome",
            direction: OrderDirectionEnum.Ascending
        };
        this.query.pageNumber = 1;
        this.query.pageSize = 25;

        this.load();
    }

    ngOnDestroy(): void {
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    onPage($event: PageEvent) {
        this.query.pageNumber = $event.pageIndex + 1;
        this.query.pageSize = $event.pageSize;
        this.pagination.size = $event.pageSize;
        this.pagination.page = $event.pageIndex;
        this.load();
    }

    onSort($event: Sort) {
        this.query.order.direction = $event.direction === 'desc' ? OrderDirectionEnum.Descending : OrderDirectionEnum.Ascending;
        this.query.order.fieldName = $event.active;
        this.query.pageNumber = 1;
        this.pagination.page = 0;
        this.load();
    }

    loadThiago() {
        this.isLoading = true;
        this._colaboradorService.getAll().subscribe(result => {
            this.colaboradores = result;
            console.log("Colaborador: " + result);
            // this.pagination.length = result.totalRecords;
        }, error => {
            console.log(error);
        }, () => {
            this.isLoading = false;
        });
    }

    load() {
        this.isLoading = true;
        this._colaboradorService.list(this.query).subscribe(result => {
            this.colaboradores = result.data;
            this.pagination.length = result.totalRecords;
        }, error => {
            console.log(error);
        }, () => {
            this.isLoading = false;
        });
    }

    onCloseDetail($event: Boolean) {
        if ($event) {
            this.query.pageNumber = 1;
            this.pagination.page = 0;
            this.pagination.length = 0;
            this.load();
        }
        this.isEdit = false;
    }

    details(id: string) {
        this.selectedId = id;

        this.router.navigate(['/colaboradores/details/' + this.selectedId]);
    }

    edit(id: string) {
        this.selectedId = id;

        this.router.navigate(['/colaboradores/atualizar/' + this.selectedId]);
    }

    delete(id: string) {
        this.isLoading = true;
        this._colaboradorService.delete(id).subscribe(_ => {
            console.log("Exclusão com sucesso");
            this.load();
        }, error => {
            console.log(error);
        }, () => {
            this.openSnackBar("Exclusão realizada com sucesso.","Fechar");
            this.isLoading = false;
        });
    }

    deletar(id: string) {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Deletar Colaborador',
            message:
                'Tem certeza que deseja deletar o colaborador? Não será possível desfazer.',
            actions: {
                confirm: {
                    label: 'Deletar',
                },
                cancel: {
                    label: 'Cancelar',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                this.isLoading = true;
                this._colaboradorService.delete(id).subscribe(_ => {
                    this.load();
                }, error => {
                    console.log(error);
                }, () => {
                    this.openSnackBar("Exclusão realizada com sucesso.","Fechar");
                    this.isLoading = false;
                });
            }
        });
    }

    onFilterExpanded() {
        this.filtersExpanded = !this.filtersExpanded;
    }

    filter() {
        this.query.filters = [];
        const filter = this.filterForm.value;

        if (filter.nome?.trim()) {
            this.query.filters.push(new FilterInfo('nome', FieldTypeEnum.String, FilterOperatorEnum.Contains, filter.nome.trim()));
        }

        if (filter.cargo?.trim()) {
            this.query.filters.push(new FilterInfo('cargo', FieldTypeEnum.String, FilterOperatorEnum.Contains, filter.cargo.trim()));
        }

        this.query.pageNumber = 1;
        this.pagination.page = 0;

        this.load();
    }

    clearFilter() {
        this.filterForm.reset();
    }

    openSnackBar(message1: string, message2: string) {
        this._snackBar.open(message1, message2, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
}
