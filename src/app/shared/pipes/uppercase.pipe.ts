import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercase'
})
export class UppercasePipe implements PipeTransform {

  transform(status: string, args?: any): string {
    let statusConvertido: string = "";

    let palavraMaiuscula = status.toLocaleUpperCase();
    
    return palavraMaiuscula;
  }
}