import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { Character } from "@shared/interfaces/character.interface";

@Component({
    selector: "app-character",
    template: `
    <div class="card">
      <div class="image">
        <a [routerLink]="['/character-details', character.id]">
        <button class="btn btn-number">#{{character.id}}</button>
          <img
            class="card-img-top"
            [src]="character.image"
            [alt]="character.name"
          />
          
        </a>
      </div>
      <div class="card-inner">
        <div class="header">
            <h2 class="card-title">{{ character.name | slice : 0 : 12 | uppercase }}</h2>
          <h6 class="text-bold">Status: <span class="text-muted">{{ character.status }}</span></h6>
          <h6 class="text-bold">Gender: <span class="text-muted">{{ character.gender }}</span></h6>
          <h6 class="text-bold">Specie: <span class="text-muted">{{ character.species }}</span></h6>
         
        </div>
      </div>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CharacterComponent {
    @Input() character: Character;
}