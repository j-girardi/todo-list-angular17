import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoSignalsService {
  public todoState = signal

  constructor() { }
}
