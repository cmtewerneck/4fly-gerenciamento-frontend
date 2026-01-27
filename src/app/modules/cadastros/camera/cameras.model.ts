import { Entity } from "app/shared/models/entity.model";

export interface Camera extends Entity{
    dataVenda: Date;
    horaVoo: string;
    nomePassageiro: string;
    telefonePassageiro: string;
    referencia: string;
    aeronave: string;
    vendedor: string;
    valorBruto: number;
    valorLiquido: number;
    status: string;
    linkYoutube: string;
    linkWeTransfer: string;
    mesmoVoo: boolean;
    privacidade: string;
    observacoes: string;
}
