import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EtherService {
  readonly provider: ethers.providers.JsonRpcProvider;
  readonly xes;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(
      environment.xesRpcProviderUrl
    );
    this.xes = new ethers.Contract(
      environment.xesAddress,
      environment.xesAbi,
      this.provider
    );
  }

  async getUsers(): Promise<string[]> {
    console.log(this.xes);
    return this.xes['getKeys']();
  }
}
