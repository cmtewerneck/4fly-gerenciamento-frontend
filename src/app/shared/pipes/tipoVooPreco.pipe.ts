import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoVooPreco'
})
export class TipoVooPrecoPipe implements PipeTransform {

  transform(tipoVoo: number, args?: any): string {

    if(tipoVoo == 1){
      return "Compartilhado"
    } else if(tipoVoo == 2){
      return "Exclusivo"
    } else if(tipoVoo == 3){
      return "Foto ou Vídeo"
    } else if(tipoVoo == 4){
      return "Foto e Vídeo"
    }
  }
}