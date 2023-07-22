import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(itemName: string, value: string){
    localStorage.setItem(itemName, value)
  }

  getItem(itemName: string){
   return localStorage.getItem(itemName)
  }
}
