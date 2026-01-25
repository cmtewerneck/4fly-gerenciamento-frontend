import { Entity } from "app/shared/models/entity.model";

export interface Aeronave extends Entity{
    matricula: string;
    fabricante: string;
    modelo: string;
    numeroSerie: string;
    ano?: number;
    capacidade?: number;
    situacao: boolean;
    validadeCVA?: Date; 
    validadeLicencaEstacao?: Date; 
    validadeReta?: Date; 
    validadeCasco?: Date; 
    validadeResponsabilidadeCivil?: Date; 
    validadePesagem?: Date; 
    emissaoCA?: Date; 
    emissaoCM?: Date; 
    imagem: string;
    imagemUpload: string;
}

export interface AeronaveDropdown{
    matricula: string;
    id: string;
}