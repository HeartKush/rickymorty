import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';
import { take, filter } from 'rxjs/operators';
import { CharacterService } from '@shared/services/character.service';
import { Character } from '@shared/interfaces/character.interface';


type RequestInfo = {
  next: string | null;
}

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  info: RequestInfo = {
    next: null,
  };
  private pageNum = 1;
  private query:any;
  private hideScrollHeight = 200;
  private showScrollHeight = 500;

  constructor(private characterService: CharacterService, private route: ActivatedRoute, private router: Router) { 
    this.onUrlChange();
  }

  ngOnInit(): void {
    this.getCharactersByQuery();
  }

  private getDataFromService(): void {
    this.characterService.searchCharacter(this.query, this.pageNum)
      .pipe(
        take(1)
      ).subscribe((res: any) => {
        if (res?.results?.length) {
          console.log(res);
          const { info, results } = res;;
          this.characters = [...this.characters, ...results];
          this.info = info;
        } else {
          this.characters = [];
        }
      })
  }

  private getCharactersByQuery(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: ParamMap) => {
      console.log(params);
      this.query = params['q'];
      this.getDataFromService();
    })
  }

  private onUrlChange(): void{
    this.router.events.
    pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      this.characters = [];
      this.pageNum = 1;
      this.getCharactersByQuery();
        }
      )
    
  }

}
