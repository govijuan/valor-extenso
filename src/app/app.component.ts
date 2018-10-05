import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Gerando valor por extenso';
  unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove' ];
  dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrozentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
  doDezAoDezenove = ['dez','onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  valorNumerico: number = 0
  valueString: any = '' 
  
  convertirMilhoes (num, mil:boolean = false) {
    this.valorNumerico = num
    let milhoesString: string = (num % 1000000) == 0 ? ' milhões de' : ' milhões ';
    if(num >= 1000000) {
      if(num >= 1000000 && num < 2000000){
        return "um milhão " + this.convertirMilhoes(num % 1000000, mil)
      }else{
        console.log('Paso 1')
        return this.convertirMilhoes(Math.floor(num / 1000000), true) + milhoesString + this.convertirMiles(num % 1000000, mil)
      }  
    }else{
      if(num >= 1000){
        return this.convertirMiles(num, true);
      }else if( num < 1000){
        return this.convertirMiles(num, mil);
      }
      
    }
  }
  
  convertirMiles (num, mil:boolean = false) {
    
    if(num >= 1000){
      if( num >= 1000 && num < 2000){
        return "mil " + this.convertirCentos(num % 1000, false)
      }else{
        if(num >= 2000 && num < 10000){
          return this.unidades[Math.floor(num / 1000)] + " mil " + this.convertirCentos(num % 1000, false)
        }else if(num >= 10000 && num < 20000){
          return this.doDezAoDezenove[(Math.floor(num / 1000)) - 10] + " mil " + this.convertirCentos(num % 1000, false)
        }else{
          return this.convertirCentos(Math.floor(num / 1000), true) + " mil " + this.convertirCentos(num % 1000, false)
        }
      }
    }else{
      return this.convertirCentos(num, mil)
    }
  }

  convertirCentos (num, mil:boolean = false) {
    if(num > 99){
        if( num == 100){
          return " cem reais"
        }else{
          if(Math.floor(num % 100) === 0 ){
            return this.centenas[Math.floor(num / 100)] + this.convertirCentavos(num % 100, mil)
          }else{
            return this.centenas[Math.floor(num / 100)] + " e " + this.convertirDezenas( num % 100, mil)
          }
        }
    }else{
      return this.convertirDezenas(num, mil)
    }
  }

  convertirDezenas (num, mil:boolean) {
    if(num < 10){
      return this.unidades[Math.floor(num / 1)] + this.convertirCentavos(num % 1, mil)
    }else if(num >= 10 && num < 20 ){
      return this.doDezAoDezenove[Math.floor((num - 10) / 1)] + this.convertirCentavos(num % 1, mil)
    }else{
      if((num % 10) != 0){
        if((num % 10) > 0 && (num % 10) < 1){
          return this.dezenas[Math.floor(num / 10)] + this.convertirCentavos(num % 1, mil);
        }else{
          return this.dezenas[Math.floor(num / 10)] + " e " + this.unidades[Math.floor(num % 10)] + this.convertirCentavos(num % 1, mil)
        }
      }else{
        return this.dezenas[Math.floor(num / 10)]  + this.convertirCentavos(num % 1, mil)
      }
      
    }
  }

  convertirCentavos (num, mil:boolean) {
    num = Math.round(num * 100) / 100
    let reaisString: string = this.valorNumerico < 2 && mil == false ? " real" : " reais";
    if(num > 0 && num < 1){
      if((num * 100) < 10){
        return reaisString + " e " + this.unidades[num * 100] + " centavos"
      }else if((num * 100) >= 10 && (num * 100) < 20){
        return reaisString + " e " + this.doDezAoDezenove[(num * 100) - 10] + " centavos"
      }else{
        if(((num * 100) % 10) != 0){
          return reaisString + " e " + this.dezenas[Math.floor(num * 10)] + " e "  + this.unidades[Math.round((num * 100) % 10)] + " centavos"
        }else{
          return reaisString + " e " + this.dezenas[Math.floor(num * 10)] + " centavos"
        }
      }
    }else if(num === 0 && mil == false){
        return reaisString
    }else{
      return ""
    }
  }
  
  convertir (num) {
    if (num === 0) {
      return "zero"
    }else{
      if(num > 999999999.99){
        return 'Infelizmente o sistema não foi pensado para preencher  um valor maior a R$ 999.999.999.999,99'
      }else if(num < 0){
        return 'O sistema não trabalha com números negativos, e não faz sentido um cheque com números negativos'
      }else if(num < 1 && num > 0){
        return 'O sistema não preenche valores inferiores a $R 1,00 pois não faz sentido emitir cheque por um valor inferior a $R 1,00.'
      }else{
        return this.convertirMilhoes(num)
      }
    }
  }

  definirValorExtenso (numericValue) {
    this.valueString = this.convertir(numericValue);
  }
}
