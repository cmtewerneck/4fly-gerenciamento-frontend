import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Vendedor } from "./vendedor.model";
import { Observable } from "rxjs";
import { VendedoresDropdown } from "../camera/cameras.model";

@Injectable({
    providedIn: 'root'
})
export class VendedorService extends BaseApiService<Vendedor>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'vendedores');
    }

    getAllNomes(): Observable<VendedoresDropdown[]> {
        return this.api.get(this.path);
    }
}