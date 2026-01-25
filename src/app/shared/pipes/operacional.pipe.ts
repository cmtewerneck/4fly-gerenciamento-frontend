import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'operacional'
})
export class OperacionalPipe implements PipeTransform {

  transform(situacao: boolean, args?: any): string {

    if(situacao == true){
      return "Operacional"
    } else if(situacao == false){
      return "Não Operacional"
    }
  }
}