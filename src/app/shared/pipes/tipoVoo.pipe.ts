import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoVoo'
})
export class TipoVooPipe implements PipeTransform {

  transform(tipo: number, args?: any): string {

    if(tipo == 1){
      return "Compartilhado"
    } else if(tipo == 2){
      return "Exclusivo"
    } else if(tipo == 3){
      return "Doors-Off"
    } else if(tipo == 4){
      return "Translado"
    }
  }
}