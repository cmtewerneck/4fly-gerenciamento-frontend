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
import { AeronaveService } from '../aeronave.service';
import { Aeronave } from '../aeronave.model';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-aeronave-details',
    templateUrl: './aeronave-details.component.html',
    styleUrls: ['./aeronave-details.component.scss'],
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
export class AeronaveDetailsComponent implements OnInit {
    @ViewChild('recentTransactionsTable', { read: MatSort })
    recentTransactionsTableMatSort: MatSort;
    aeronave: Aeronave;
    isLoading: boolean = false;
    aeronaveId: string;
    matriculaParte1: string;
    matriculaParte2: string;
    imagens: string = environment.imagensUrl; 
    
    constructor(private _aeronaveService: AeronaveService, private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) {
        this.aeronaveId = this.route.snapshot.paramMap.get('id');
    }
    
    ngOnInit(): void {
        this.load();
    }
    
    load() {
        this.isLoading = true;
        this._aeronaveService.getById(this.aeronaveId).subscribe(result => {
            this.aeronave = result;
            
            const m = (result?.matricula ?? '').trim();
            this.matriculaParte1 = m.substring(0, 2);
            this.matriculaParte2 = m.substring(2, 5);
            this.cdr.detectChanges();
        }, error => {
            console.log(error);
        }, () => {
            this.isLoading = false;
        });
    }

    voltar(){
         this.router.navigate(['aeronaves']);
    }

    edit() {
        this.router.navigate(['/aeronaves/atualizar/' + this.aeronaveId]);
    }

    abastecimentos() {
        this.router.navigate(['/abastecimentos/' + this.aeronaveId]);
    }
    
    tarifas() {
        this.router.navigate(['/tarifas/' + this.aeronaveId]);
    }
}
