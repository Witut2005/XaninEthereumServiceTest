import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class EtherService {
  constructor() {}

  async getUsers(): Promise<string[]> {}
}
