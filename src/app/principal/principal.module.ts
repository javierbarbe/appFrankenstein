import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { PokemonLibModule } from 'pokemon-lib';
import { TablaModule } from 'tabla-lib';
import { SelectorModule } from 'selector';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PrincipalComponentCopy } from './principal.component copy';

@NgModule({
  declarations: [
    PrincipalComponent,
    PrincipalComponentCopy
  ],
  imports: [
    CommonModule,
    PokemonLibModule,
    TablaModule,
    SelectorModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    PrincipalComponent,
    PokemonLibModule,
    TablaModule,
    SelectorModule,

  ]
})
export class PrincipalModule { }
