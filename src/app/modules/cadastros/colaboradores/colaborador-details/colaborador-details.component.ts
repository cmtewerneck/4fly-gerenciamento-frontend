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
import { ColaboradorService } from '../colaboradores.service';
import { Colaborador } from '../colaboradores.model';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-colaborador-details',
    templateUrl: './colaborador-details.component.html',
    styleUrls: ['./colaborador-details.component.scss'],
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
export class ColaboradorDetailsComponent implements OnInit {
    @ViewChild('recentTransactionsTable', { read: MatSort })
    recentTransactionsTableMatSort: MatSort;
    colaborador: Colaborador;
    isLoading: boolean = false;
    colaboradorId: string;
    imagens: string = environment.imagensUrl; 
    
    constructor(private _colaboradorService: ColaboradorService, private route: ActivatedRoute, private router: Router) {
        this.colaboradorId = this.route.snapshot.paramMap.get('id');
    }
    
    ngOnInit(): void {
        this.load();
    }
    
    load() {
        this.isLoading = true;
        this._colaboradorService.getById(this.colaboradorId).subscribe(result => {
            this.colaborador = result;
        }, error => {
            console.log(error);
        }, () => {
            this.isLoading = false;
        });
    }

    voltar(){
         this.router.navigate(['colaboradores']);
    }

    edit() {
        this.router.navigate(['/colaboradores/atualizar/' + this.colaboradorId]);
    }
    
}
