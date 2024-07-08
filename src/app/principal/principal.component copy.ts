import { Component, OnInit, inject } from '@angular/core';
import { PokeService, PokeType, PokemonFromType, Result, opcionesIDs } from 'poke-service-lib';
import { PokemonService as PokemonServiceOriginal } from 'pokemon-lib';
import { Observable, map, tap } from 'rxjs';
import { PokemonElement, PokemonFromType as PokemonByType } from 'tabla-lib/lib/shared/models/poketypo.interface';
import { GeneradorUrlService } from '../generador-url.service';

@Component({
  selector: 'app-principal-copy',
  templateUrl: './principal.component copy.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponentCopy  {

  //#region PROPERTIES
  



}
