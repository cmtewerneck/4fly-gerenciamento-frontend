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
import { CameraService } from '../cameras.service';
import { Camera } from '../cameras.model';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector: 'app-camera-detailed',
    templateUrl: './camera-detailed.component.html',
    styleUrls: ['./camera-detailed.component.scss'],
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
export class CameraDetailedComponent implements OnInit {
    @ViewChild('recentTransactionsTable', { read: MatSort })
    recentTransactionsTableMatSort: MatSort;
    camera: Camera;
    isLoading: boolean = false;
    cameraId: string;
    matriculaParte1: string;
    matriculaParte2: string;
    imagens: string = environment.imagensUrl; 
    
    constructor(private _cameraService: CameraService, private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef, private _fuseConfirmationService: FuseConfirmationService) {
        this.cameraId = this.route.snapshot.paramMap.get('id');
    }
    
    ngOnInit(): void {
        this.load();
    }
    
    load() {
        this.isLoading = true;
        this._cameraService.getById(this.cameraId).subscribe(result => {
            this.camera = result;
            this.cdr.detectChanges();
        }, error => {
            console.log(error);
        }, () => {
            this.isLoading = false;
        });
    }

    voltar(){
         this.router.navigate(['cameras']);
    }

    edit() {
        this.router.navigate(['/cameras/atualizar/' + this.cameraId]);
    }

    deletar() {
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
                const $obs = this._cameraService.updateDeleting(this.cameraId);

                this.isLoading = true;
                $obs.subscribe(_ => {
                    //this.toastr.success('Aeronave excluída com sucesso');
                    this.isLoading = false;
                    this.router.navigate(['cameras']);
                }, error => {
                    this.isLoading = false;
                });
            }
        });
    }
    
}
