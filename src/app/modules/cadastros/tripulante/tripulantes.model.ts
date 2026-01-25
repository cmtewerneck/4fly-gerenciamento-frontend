import { Entity } from "app/shared/models/entity.model";

export interface Tripulante extends Entity{
    nome: string;
    cpf: string;
    canac: string;
    telefone: string;
    salario?: number;
    validadeHmnc?: Date;
    validadeHmnt?: Date;
    validadeHmlt?: Date;
    validadeIfrh?: Date;
    validadeInvh?: Date;
    validadeCma?: Date;
    imagem: string;
    imagemUpload: string;
}
