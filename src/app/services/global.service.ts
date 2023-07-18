import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  baseUrl = 'http://localhost:3000'
  // baseUrl = 'http://13.228.246.186:3111',
  

  constructor() { }
}
