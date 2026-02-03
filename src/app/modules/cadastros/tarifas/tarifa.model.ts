import { Entity } from "app/shared/models/entity.model";

export interface AeronaveTarifa extends Entity{
    data: Date;
    origem: string;
    valor: number;
    status: string;
    dataPagamento?: Date;
    nota: string;
    codigoBarras: string;
    vencimento?: Date;
    aeronaveId: string;
}

export interface AeronaveDropdown{
    matricula: string;
    id: string;
}