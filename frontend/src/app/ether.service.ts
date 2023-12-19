import { Injectable } from '@angular/core';
import { Alchemy } from 'alchemy-sdk';
import { ethers } from 'ethers';
import { alchemySettings, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EtherService {
  alchemy: Alchemy;
  wallet: string | undefined = undefined;
  readonly metamask: any;

  readonly provider = new ethers.providers.Web3Provider(
    (window as any).ethereum
  );
  private xes: any;

  constructor() {
    this.alchemy = new Alchemy(alchemySettings);
    this.metamask = (window as any).ethereum;

    this.xes = new ethers.Contract(
      environment.xesAddress,
      environment.xesAbi,
      this.provider
    );
  }

  async getNonce() {
    if (this.wallet == undefined) {
      this.wallet = (await this.getMetamaskAccounts())[0];
    }
    return this.alchemy.core.getTransactionCount(this.wallet, 'latest');
  }

  async getUsers(): Promise<string[]> {
    console.log(environment.xesAddress);
    return this.xes['getKeys']();
  }

  async getUserAddress(username: string): Promise<string> {
    return this.xes['users'](username);
  }

  async getMetamaskAccounts(): Promise<string[]> {
    return (window as any).ethereum.request({
      method: 'eth_requestAccounts',
    }) as Promise<string[]>;
  }

  async sendTransactionToUser(
    username: string
  ): Promise<ethers.providers.TransactionResponse> {
    const signer = this.provider.getSigner();
    return signer.sendTransaction({
      to: environment.xesAddress,
      gasLimit: 100000,
      gasPrice: await this.getGasPrice(),
      data: this.xes.interface.encodeFunctionData('userCreate', [username]),
    });
  }

  async getGasPrice() {
    return this.metamask.request({ method: 'eth_gasPrice' });
  }

  async userCreate(
    username: string
  ): Promise<ethers.providers.TransactionResponse> {
    const signer = this.provider.getSigner();

    return signer.sendTransaction({
      to: environment.xesAddress,
      data: this.xes.interface.encodeFunctionData('userCreate', [username]),
      gasLimit: 100000,
      gasPrice: await this.getGasPrice(),
    });
  }
}
