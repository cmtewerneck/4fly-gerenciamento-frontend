import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FinanceService } from 'app/modules/admin/dashboards/finance/finance.service';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { TripulanteService } from '../tripulantes.service';
import { Tripulante } from '../tripulantes.model';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-tripulante-details',
    templateUrl: './tripulante-details.component.html',
    styleUrls: ['./tripulante-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        NgApexchartsModule,
        MatTableModule,
        MatSortModule,
        NgClass,
        MatProgressBarModule,
        CurrencyPipe,
        DatePipe
    ],
})
export class TripulanteDetailsComponent implements OnInit {
    @ViewChild('recentTransactionsTable', { read: MatSort })
    recentTransactionsTableMatSort: MatSort;
    tripulante: Tripulante;
    isLoading: boolean = false;
    tripulanteId: string;
    imagens: string = environment.imagensUrl; 
    
    constructor(private _tripulanteService: TripulanteService, private route: ActivatedRoute, private router: Router) {
        this.tripulanteId = this.route.snapshot.paramMap.get('id');
    }
    
    ngOnInit(): void {
        this.load();
    }
    
    load() {
        this.isLoading = true;
        this._tripulanteService.getById(this.tripulanteId).subscribe(result => {
            this.tripulante = result;
        }, error => {
            console.log(error);
        }, () => {
            this.isLoading = false;
        });
    }

    voltar(){
         this.router.navigate(['tripulantes']);
    }

    edit() {
        this.router.navigate(['/tripulantes/atualizar/' + this.tripulanteId]);
    }
    
}
