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

  async getMetamaskAccounts(): Promise<string[]> {
    // Check if Metamask is installed
    if (typeof (window as any).ethereum != undefined) {
      return Promise.resolve(
        (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        })
      );
    }
    return Promise.reject([]);
  }
  //     .then((accounts) => {
  //       // Get the first account (current selected account)
  //       const address = accounts[0];
  //       console.log("Public Key (Address):", address);
  //     })
  //     .catch((error) => {
  //       console.error("Error getting public key:", error);
  //     });
  // } else {
  //   console.error("Metamask not found. Please install Metamask extension.");
  // }
}
