import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Camera, CameraResultado } from "./cameras.model";
import { Observable } from "rxjs";
import { QueryInfo } from "app/shared/models/queryInfo.model";
import { CameraQuery } from "app/shared/models/cameraQuery.model";

@Injectable({
    providedIn: 'root'
})
export class CameraService extends BaseApiService<Camera>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'cameras');
    }

    getResultados(entity: CameraQuery): Observable<CameraResultado> {
        return this.api.post(`${this.path}/resultados`, entity, {});
    }
}