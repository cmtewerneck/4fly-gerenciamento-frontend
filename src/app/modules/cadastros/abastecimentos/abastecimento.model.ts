import { Entity } from "app/shared/models/entity.model";

export interface AeronaveAbastecimento extends Entity{
    data: Date;
    litros: number;
    fornecedora: string;
    valorUnitario: number;
    valorTotal: number;
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