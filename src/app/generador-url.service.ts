import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { opcionesIDs } from 'poke-service-lib';
import { urls } from 'src/urls';

@Injectable({
  providedIn: 'root'
})
export class GeneradorUrlService {

  constructor() { }
  buildEndpointFromComponentID(idComponent: opcionesIDs,  paramsMap?: Map<string, string>) {
    let url = '';
    let params = new HttpParams();
    if (paramsMap) {
      for (var [key, value] of paramsMap) {
        console.log(key + " = " + value);
        params = params.append(key, value)
      }
    }
    switch (idComponent) {
      case 'pokemonInfo':
        url = urls.pokemonInfo
        break;

      case 'selectTipoPokemon':
        url = urls.tiposPokemon
        break;

      case 'tablaPokemonFireType':
        url = urls.pokemonsByFireType
        break;

      case 'tablaPokemonFlyingType':
        url = urls.pokemonsByFlyingType
        break;

      case 'tablaPokemonWaterType':
        url = urls.pokemonsByWaterType
        break;
      case 'tablaPokemonNormalType':
        url = urls.pokemonsByNormalType
        break;

      default:
        break;
    }
    return { url, params }
  }

}
