import { Injectable, Type } from '@angular/core';
import { plainToClass } from "class-transformer"; 

@Injectable({
    providedIn: 'root'
  })

  export class AppService {
    public Saludar: Boolean = true;

    constructor() { }
    public setNoSaludar(){
        this.Saludar= false;
    }
  }

  