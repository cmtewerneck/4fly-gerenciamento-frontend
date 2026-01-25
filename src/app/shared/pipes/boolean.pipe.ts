import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {

  transform(boolean: boolean, args?: any): string {

    if(boolean == true){
      return "Sim"
    } else if(boolean == false){
      return "Não"
    }
  }
}