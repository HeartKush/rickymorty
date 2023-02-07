import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterDetailsComponent } from '@characters/character-details/character-details.component';
import { CharacterListComponent } from '@characters/character-list/character-list.component';
import { RouterModule } from '@angular/router';

const myComponents = [CharacterListComponent,CharacterDetailsComponent];

@NgModule({
  declarations: [
    ...myComponents
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ...myComponents
  ]
})
export class CharactersModule { }
