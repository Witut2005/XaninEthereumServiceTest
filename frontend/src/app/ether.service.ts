import { Injectable } from '@angular/core';
import { Alchemy } from 'alchemy-sdk';
import { Wallet, ethers } from 'ethers';
import { alchemySettings, environment } from 'src/environments/environment';

export enum VerificationMethods {
  METAMASK = 'Metamask Wallet',
  PRIVATE_KEY = 'Private Key',
}

@Injectable({
  providedIn: 'root',
})
export class EtherService {
  alchemy: Alchemy;
  wallet: Wallet | undefined = undefined;
  verifcationMethod: VerificationMethods = VerificationMethods.METAMASK;
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

  // async getNonce() {
  //   if (this.wallet == undefined) {
  //     this.wallet = (await this.getMetamaskAccounts())[0];
  //   }
  //   return this.alchemy.core.getTransactionCount(this.wallet, 'latest');
  // }

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

  setVerificationMethod(method: VerificationMethods) {
    this.verifcationMethod = method;
  }

  setWalletPk(pk: string) {
    this.wallet = new Wallet(pk);
  }

  getVerificationMethod() {
    return this.verifcationMethod;
  }

  async sendTransaction(
    transaction: ethers.utils.Deferrable<ethers.providers.TransactionRequest>
  ): Promise<any> {
    if (this.verifcationMethod === VerificationMethods.PRIVATE_KEY) {
      return this.wallet?.sendTransaction(transaction);
    } else if (this.verifcationMethod === VerificationMethods.METAMASK) {
      const signer = this.provider.getSigner();
      return signer.sendTransaction(transaction);
    }
  }

  async sendTransactionToUser(
    username: string,
    amount: number
  ): Promise<ethers.providers.TransactionResponse> {
    if (username.trim().length == 0)
      return Promise.reject('Username is required');

    return this.sendTransaction({
      to: environment.xesAddress,
      data: this.xes.interface.encodeFunctionData('send', [
        username,
        ethers.utils.parseEther(amount.toString()),
      ]),
      value: ethers.utils.parseEther(amount.toString()),
      gasLimit: 100000,
      gasPrice: await this.getMarketGasPrice(),
    });
  }

  async getMarketGasPrice() {
    return this.metamask.request({ method: 'eth_gasPrice' });
  }

  async userCreate(
    username: string
  ): Promise<ethers.providers.TransactionResponse | string> {
    const signer = this.provider.getSigner();

    if (username.trim().length == 0)
      return Promise.reject('Username is required');

    return signer.sendTransaction({
      to: environment.xesAddress,
      data: this.xes.interface.encodeFunctionData('userCreate', [username]),
      gasLimit: 100000,
      gasPrice: await this.getMarketGasPrice(),
    });
  }
}
