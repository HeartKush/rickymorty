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
  public focusPages = [1,2,3,4,5];
  public pageNum = null;
  private query: any;
  private hideScrollHeight = 200;
  private showScrollHeight = 500;
  private totalEntries = 0;

  constructor(private characterService: CharacterService, private route: ActivatedRoute, private router: Router) {
    this.onUrlChange();
  }

  ngOnInit(): void {
    this.characterService.searchCharacter(this.query, this.pageNum)
      .pipe(
        take(1)
      ).subscribe((res: any) => {
        if (res?.results?.length) {
          const { info} = res;
          this.info = info;
          this.totalEntries = info.count;
        } else {
          this.characters = [];
        }
      });
    this.loadPage(1);
    this.getCharactersByQuery();
  }

  private getDataFromService(): void {
    
    this.characterService.searchCharacter(this.query, this.pageNum)
      .pipe(
        take(1)
      ).subscribe((res: any) => {
        if (res?.results?.length) {
          console.log(res);
          const { info, results } = res;
          this.info = info;
          this.totalEntries = info.count;
          this.characters = [...results]
        } else {
          this.characters = [];
        }
        
      });
  }


  private getCharactersByQuery(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: ParamMap) => {
      console.log(params);
      this.query = params['q'];
      this.getDataFromService();
    });
  }

  private onUrlChange(): void {
    this.router.events.
      pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters = [];
        this.pageNum = 1;
        this.getCharactersByQuery();
      }
      )

  }


  onGoUp(): void {
    window.scrollTo(0, 0);
  }

  public loadPage(number){
    
    this.focusPages = [];
    this.pageNum = number;
    let idsToLoad = [];
    if(number > 1){
      idsToLoad.push( ((number - 1) * 12) + 1);
      for(let i = idsToLoad[0]++; i < (number * 12) + 1; i++){
        while(i <= this.totalEntries){
          idsToLoad.push(i);
          break;
        }
      }
    }else{
      idsToLoad.push(1);
      for(let i = idsToLoad[0]++; i < 13; i++){
          idsToLoad.push(i);
      }
    }
    idsToLoad.shift();

    this.characterService.getMultipleCharacters(idsToLoad.join(',')).subscribe((res: any) => {
      this.characters = [...res];    
      this.updateFocusPages();
    });
  }

  public loadNextPage(){
    if(this.pageNum < (Math.ceil(this.totalEntries / 12))){
      this.pageNum += 1;
      this.loadPage(this.pageNum);
    }
  }

  public loadPreviousPage(){
    if(this.pageNum > 1){
      this.pageNum -= 1;
      this.loadPage(this.pageNum);
    }
  }

  private updateFocusPages(){
    for(let i = this.pageNum; i < this.pageNum + 5; i++){
      if(i <= (Math.ceil(this.totalEntries / 12))){
        this.focusPages.push(i);
      }

    }
  }
}
