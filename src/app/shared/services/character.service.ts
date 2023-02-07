import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { Character } from '@shared/interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  searchCharacter(query = '', page = 1) {
    const filter = `${environment.apiUrl}?name=${query}&page=${page}`;
    return this.http.get<Character[]>(filter);
  }
  getDetailCharacter(id: number) {
    return this.http.get<Character>(`${environment.apiUrl}${id}`);
  }
}
