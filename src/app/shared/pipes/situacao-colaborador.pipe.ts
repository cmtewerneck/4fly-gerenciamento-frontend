import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'situacaoColaborador'
})
export class SituacaoColaboradorPipe implements PipeTransform {

  transform(situacao: boolean, args?: any): string {

    if(situacao == true){
      return "Normal"
    } else if(situacao == false){
      return "Com pendência"
    }
  }
}