import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'USDPKR'
})
export class USDPKRPipe implements PipeTransform {

  transform(value: number, ...args: number[]): unknown {
    
    const x = args;
    return value * args[0];
  }

}
