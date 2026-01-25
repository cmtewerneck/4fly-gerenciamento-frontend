import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { Aeronave } from '../aeronave.model';
import { AeronaveService } from '../aeronave.service';
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

@Component({
    selector: 'app-aeronave-list',
    templateUrl: './aeronave-list.component.html',
    styleUrls: ['./aeronave-list.component.scss'],
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

export class AeronaveListComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    aeronaves: Aeronave[] = [];
    aeronavesRab: string[] = [];

    pagination = {
        length: 0,
        page: 0,
        size: 25
    };

    private query = new QueryInfo();

    isLoading: boolean = false;
    productsCount: number = 0;
    productsTableColumns: string[] = ['matricula', 'fabricante', 'modelo', 'ano', 'numeroSerie', 'capacidade', 'situacao', 'actions'];

    searchInputControl: FormControl = new FormControl();

    isEdit = false;
    selectedId: string = null;

    filtersExpanded = false;
    filterForm: FormGroup;

    constructor(
        private _aeronaveService: AeronaveService,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        public dialog: MatDialog,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.filterForm = this._formBuilder.group({
            matricula: [''],
            fabricante: [''],
        });

        this.query.filters = [];
        this.query.order = {
            fieldName: "matricula",
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
        this._aeronaveService.getAll().subscribe(result => {
            this.aeronaves = result;
            console.log("Aeronave: " + result);
            // this.pagination.length = result.totalRecords;
        }, error => {
            console.log(error);
        }, () => {
            this.isLoading = false;
        });
    }

    load() {
        this.isLoading = true;
        this._aeronaveService.list(this.query).subscribe(result => {
            this.aeronaves = result.data;
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

        this.router.navigate(['/aeronaves/details/' + this.selectedId]);
    }

    edit(id: string) {
        this.selectedId = id;

        this.router.navigate(['/aeronaves/atualizar/' + this.selectedId]);
    }

    delete(id: string) {
        this.isLoading = true;
        this._aeronaveService.delete(id).subscribe(_ => {
            console.log("Exclusão com sucesso");
            this.load();
        }, error => {
            console.log(error);
        }, () => {
            this.isLoading = false;
        });
    }

    deletar(id: string) {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Deletar Aeronave',
            message:
                'Tem certeza que deseja deletar a aeronave? Não será possível desfazer.',
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
                const $obs = this._aeronaveService.updateDeleting(id);

                this.isLoading = true;
                $obs.subscribe(_ => {
                    //this.toastr.success('Aeronave excluída com sucesso');
                    this.isLoading = false;
                    this.load();
                }, error => {
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

        if (filter.matricula?.trim()) {
            this.query.filters.push(new FilterInfo('matricula', FieldTypeEnum.String, FilterOperatorEnum.Contains, filter.matricula.trim()));
        }

        if (filter.fabricante?.trim()) {
            this.query.filters.push(new FilterInfo('fabricante', FieldTypeEnum.String, FilterOperatorEnum.Contains, filter.fabricante.trim()));
        }

        this.query.pageNumber = 1;
        this.pagination.page = 0;

        this.load();
    }

    clearFilter() {
        this.filterForm.reset();
    }
}
