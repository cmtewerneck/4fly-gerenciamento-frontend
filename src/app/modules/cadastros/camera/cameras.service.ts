import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Camera } from "./cameras.model";

@Injectable({
    providedIn: 'root'
})
export class CameraService extends BaseApiService<Camera>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'cameras');
    }
}