import { Component, OnInit, inject } from '@angular/core';
import { PokeService, PokeType, PokemonFromType, Result, opcionesIDs } from 'poke-service-lib';
import { Observable, map, tap } from 'rxjs';
import { PokemonElement, PokemonFromType as PokemonByType } from 'tabla-lib/lib/shared/models/poketypo.interface';
import { GeneradorUrlService } from '../generador-url.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  //#region PROPERTIES
  pokeServiceBasadoEnIDs = inject(PokeService)
  generadorUrl = inject(GeneradorUrlService)
  private _listaPokemons: any[] = [];
  pokeTypes$: Observable<PokeType> = new Observable();
  pokemonList$: Observable<PokemonByType> | undefined = new Observable();
  listaTipos: string[] = []
  tipoElegido: string = 'normal';

  error?: Error;
  //#endregion

  //#region GETTERS
  get listaPokemon() {
    return this._listaPokemons;
  }
  //#endregion

  //#region LIFECYCLE
  ngOnInit(): void {
   
    const urlTipos = this.generadorUrl.buildEndpointFromComponentID('selectTipoPokemon');
    this.pokeTypes$ = this.pokeServiceBasadoEnIDs.getDataFromID2<PokeType>(urlTipos)
    this.pokeTypes$
      .pipe(
        map((response: PokeType) => {
          //SE RECIBE UN OBJETO CON PROPIEDADES, EN ESTE CASO SOLO SE REQUIERE LA PROPIEDAD NAME
          return response.results.map((lista: Result) => lista.name);
        }),
        tap((listaTipos: string[]) => {
          // ASIGNAMOS LA LISTA RECIBIDA TRANSFORMADA AL OBJETO QUE SE PASA AL ELEMENTO HIJO
          this.listaTipos = [...listaTipos]
        })
      )
      .subscribe()

    // SE PREPARA POR DEFECTO LA URL DE LOS POKEMON NORMALES, QUE ES LA OPCION ELEGIDA POR DEFECTO, ASÍ SE PERMITE HACER CLICK
    // SIN ELEGIR UN TIPO EL USUARIO MEDIANTE CLICKS
    const urlListaPokemonByTipo = this.generadorUrl.buildEndpointFromComponentID('tablaPokemonNormalType');
    this.pokemonList$ = this.pokeServiceBasadoEnIDs.getDataFromID2<PokemonFromType>(urlListaPokemonByTipo)
  }
  //#endregion

  //#region EVENTS FROM COMPONENTES DE LA IMPORTADOS COMO LIBRERÍAS
  cambioOpcionCombo(tipoElegido: string) {
    this.tipoElegido = tipoElegido;
    console.log('tipoElegido:', tipoElegido)
    this._listaPokemons = [];
    this.error = undefined;
    ///////////
    let idObjetivo: opcionesIDs = '';
    switch (tipoElegido) {
      case 'water':
        idObjetivo = 'tablaPokemonWaterType'
        break;
      case 'fire':
        idObjetivo = 'tablaPokemonFireType'
        break;
      case 'normal':
        idObjetivo = 'tablaPokemonNormalType'
        break;
      case 'flying':
        idObjetivo = 'tablaPokemonFlyingType'
        break;
      // en caso de no coincidir, mostramos error en pantalla
      default:
        this.pokemonList$ = undefined;
        this.error = new Error('Tipo no definido en endpoints')
        break;
    }
    //// Preparación de observable para llamar con los parametros a la url deseada
    const urlListaPokemonByTipo = this.generadorUrl.buildEndpointFromComponentID(idObjetivo);
    this.pokemonList$ = this.pokeServiceBasadoEnIDs.getDataFromID2<PokemonByType>(urlListaPokemonByTipo)
  }

  clickEnPokemon(pokemon: Result) {
    // A EJECUTAR CUANDO SE HAGA CLICK EN UNA FILA
    console.log(pokemon)
    const infoPokemon = this.generadorUrl.buildEndpointFromComponentID("pokemonInfo")
    infoPokemon.url += '/' + pokemon.name;
    this.pokeServiceBasadoEnIDs.getDataFromID2<PokemonFromType>(infoPokemon).subscribe(res => console.log('infoPokemon:', pokemon.name, res))
  }
  //#endregion

  //#region BUTTON EVENTS
  buscarPokemonPorTipo() {
    if (this.error) return;
    // Se ejecuta la llamada al endpoint configurado a través del metodo cambioOpcionCombo()
    this.pokemonList$!
      .pipe(
        // se transforma la respuesta 
        map((res: PokemonByType) => res.pokemon.map((pokemon: PokemonElement) => pokemon.pokemon))
      ).subscribe(res => {
        // ACTUALIZAMOS LA LISTA DE POKEMON, QUE ES LA LISTA QUE SE PASA AL COMPONENTE HIJO TABLA-LIB
        this._listaPokemons = [...res]
        console.log('buscaPokemon() resultado:', res)
      });
  }
  //#endregion



}
