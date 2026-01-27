import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CameraService } from '../cameras.service';
import { Camera } from '../cameras.model';
import { Router, RouterModule } from '@angular/router';
import { environment } from 'environments/environment';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { QueryInfo } from 'app/shared/models/queryInfo.model';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDirectionEnum } from 'app/shared/enums/orderDirection.enum';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FilterInfo } from 'app/shared/models/filterInfo.model';
import { FieldTypeEnum } from 'app/shared/enums/fieldType.enum';
import { FilterOperatorEnum } from 'app/shared/enums/filterOperator.enum';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-camera-details',
    templateUrl: './camera-details.component.html',
    styleUrls: ['./camera-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        NgApexchartsModule,
        MatTableModule,
        MatSortModule,
        MatRippleModule,
        MatInputModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatButtonToggleModule,
        NgClass,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        CurrencyPipe,
        MatSlideToggleModule,
        MatTooltipModule,
        MatTabsModule,
        CommonModule,
        DatePipe
    ],
})
export class CameraDetailsComponent implements OnInit {
    @ViewChild('recentTransactionsTable', { read: MatSort })
    recentTransactionsTableMatSort: MatSort;
    camera: Camera;
    isLoading: boolean = false;
    cameraId: string;
    imagens: string = environment.imagensUrl; 
    cameras: Camera[] = [];

    pagination = {
            length: 0,
            page: 0,
            size: 25
        };
    
    private query = new QueryInfo();

    isEdit = false;
    selectedId: string = null;

    productsCount: number = 0;
    productsTableColumns: string[] = ['dataVenda', 'horaVoo', 'nomePassageiro', 'aeronave', 'vendedor', 'valorBruto', 'valorLiquido', 'status', 'actions'];

    searchInputControl: FormControl = new FormControl();

    filtersExpanded = false;
    filterForm: FormGroup;

    constructor(
        private _cameraService: CameraService, 
        private router: Router,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}
    
    ngOnInit(): void {
        this.filterForm = this._formBuilder.group({
            vendedor: [''],
            aeronave: [''],
        });

        this.query.filters = [];
        this.query.order = {
            fieldName: "dataVenda",
            direction: OrderDirectionEnum.Descending
        };
        this.query.pageNumber = 1;
        this.query.pageSize = 25;

        this.load();
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
    
    load() {
        this.isLoading = true;
        this._cameraService.list(this.query).subscribe(result => {
            this.cameras = result.data;
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

    onFilterExpanded() {
        this.filtersExpanded = !this.filtersExpanded;
    }

    details(id: string) {
        this.selectedId = id;

        this.router.navigate(['/cameras/detailed/' + this.selectedId]);
    }

    edit(id: string) {
        this.selectedId = id;

        this.router.navigate(['/cameras/atualizar/' + this.selectedId]);
    }

    deletar(id: string) {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Deletar lançamento',
            message:
                'Tem certeza que deseja deletar a câmera? Não será possível desfazer.',
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
                const $obs = this._cameraService.updateDeleting(id);

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
    
    filter() {
        this.query.filters = [];
        const filter = this.filterForm.value;

        if (filter.vendedor?.trim()) {
            this.query.filters.push(new FilterInfo('vendedor', FieldTypeEnum.String, FilterOperatorEnum.Contains, filter.vendedor.trim()));
        }

        if (filter.aeronave?.trim()) {
            this.query.filters.push(new FilterInfo('aeronave', FieldTypeEnum.String, FilterOperatorEnum.Contains, filter.aeronave.trim()));
        }

        this.query.pageNumber = 1;
        this.pagination.page = 0;

        this.load();
    }

    clearFilter() {
        this.filterForm.reset();
    }
    
}
