import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';

export interface Capital {
  capital: string;
  lat: string;
  lon: string;
  state: string;
  state_code: string;
}

export interface CountryCapitals {
  country: string;
  capitals: Capital[];
}

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  //Mock data
  private capitals: CountryCapitals = {
    country: 'Brazil',
    capitals: [
      {
        capital: 'Aracaju',
        lat: "-10.9162061",
        lon: "-37.0774655",
        state: 'Sergipe',
        state_code: 'SE',
      },
      {
        capital: 'Belém',
        lat: "-1.45056",
        lon: "-48.4682453",
        state: 'Pará',
        state_code: 'PA',
      },
      {
        capital: 'Belo Horizonte',
        lat: "-19.9227318",
        lon: "-43.9450948",
        state: 'Minas Gerais',
        state_code: 'MG',
      },
      {
        capital: 'Boa Vista',
        lat: "2.8208478",
        lon: "-60.6719582",
        state: 'Roraima',
        state_code: 'PR',
      },
      {
        capital: 'Brasília',
        lat: "-15.7934036",
        lon: "-47.8823172",
        state: 'Distrito Federal',
        state_code: 'DF',
      },
      {
        capital: 'Campo Grande',
        lat: "-20.4640173",
        lon: "-54.6162947",
        state: 'Mato Grosso do Sul',
        state_code: 'MS',
      },
      {
        capital: 'Cuiabá',
        lat: "-15.5986686",
        lon: "-56.0991301",
        state: 'Mato Grosso',
        state_code: 'MT',
      },
      {
        capital: 'Curitiba',
        lat: "-25.4295963",
        lon: "-49.2712724",
        state: 'Paraná',
        state_code: 'PR',
      },
      {
        capital: 'Florianópolis',
        lat: "-27.5973002",
        lon: "-48.5496098",
        state: 'Santa Catarina',
        state_code: 'SC',
      },
      {
        capital: 'Fortaleza',
        lat: "-3.7304512",
        lon: "-38.5217989",
        state: 'Ceará',
        state_code: 'CE',
      },
      {
        capital: 'Goiânia',
        lat: "-16.680882",
        lon: "-49.2532691",
        state: 'Goiás',
        state_code: 'GO',
      },
      {
        capital: 'João Pessoa',
        lat: "-7.1215981",
        lon: "-34.882028",
        state: 'Paraíba',
        state_code: 'PB',
      },
      {
        capital: 'Macapá',
        lat: "0.0401529",
        lon: "-51.0569588",
        state: 'Amapá',
        state_code: 'AP',
      },
      {
        capital: 'Maceió',
        lat: "-9.6476843",
        lon: "-35.7339264",
        state: 'Alagoas',
        state_code: 'AL',
      },
      {
        capital: 'Manaus',
        lat: "-3.1316333",
        lon: "-59.9825041",
        state: 'Amazonas',
        state_code: 'AM',
      },
      {
        capital: 'Natal',
        lat: "-5.805398",
        lon: "-35.2080905",
        state: 'Rio Grande do Norte',
        state_code: 'RN',
      },
      {
        capital: 'Palmas',
        lat: "-10.1837852",
        lon: "-48.3336423",
        state: 'Tocantins',
        state_code: 'TO',
      },
      {
        capital: 'Porto Alegre',
        lat: "-30.0324999",
        lon: "-51.2303767",
        state: 'Rio Grande do Sul',
        state_code: 'RS',
      },
      {
        capital: 'Porto Velho',
        lat: "-8.7494525",
        lon: "-63.8735438",
        state: 'Rondônia',
        state_code: 'RO',
      },
      {
        capital: 'Recife',
        lat: "-8.0584933",
        lon: "-34.8848193",
        state: 'Pernambuco',
        state_code: 'PE',
      },
      {
        capital: 'Rio Branco',
        lat: "-9.9765362",
        lon: "-67.8220778",
        state: 'Acre',
        state_code: 'AC',
      },
      {
        capital: 'Rio de Janeiro',
        lat: "-22.9110137",
        lon: "-43.2093727",
        state: 'Rio de Janeiro',
        state_code: 'RJ',
      },
      {
        capital: 'Salvador',
        lat: "-12.9822499",
        lon: "-38.4812772",
        state: 'Bahia',
        state_code: 'BA',
      },
      {
        capital: 'São Luís',
        lat: "-2.5295265",
        lon: "-44.2963942",
        state: 'Maranhão',
        state_code: 'MA',
      },
      {
        capital: 'São Paulo',
        lat: "-23.5506507",
        lon: "-46.6333824",
        state: 'São Paulo',
        state_code: 'SP',
      },
      {
        capital: 'Teresina',
        lat: "-5.0896403",
        lon: "-42.809588",
        state: 'Piauí',
        state_code: 'PI',
      },
      {
        capital: 'Vitória',
        lat: "-20.3200917",
        lon: "-40.3376682",
        state: 'Espírito Santo',
        state_code: 'ES',
      },
    ],

  }
  constructor(private http: HttpClient) { }

  getCapitals():Observable<CountryCapitals>{

    //Fake the request to a backend or geolocation API to get the lati
    return of(this.capitals);
  }
}
