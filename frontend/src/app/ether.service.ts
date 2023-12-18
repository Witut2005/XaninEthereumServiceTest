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
  metamask: any;

  private provider = new ethers.providers.JsonRpcProvider(
    'https://eth-sepolia.g.alchemy.com/v2/2XqlXsXpIO-Y2sk4QOnaS7vUeiVK5WTe'
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

  async sendTransactionToUser(username: string): Promise<void> {
    const signer = this.provider.getSigner();
    const address = await this.getUserAddress(username);

    if (Number(address) == 0) {
      return Promise.reject();
    } else {
      signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther('0.0001'),
      });
    }
  }

  async getGasPrice() {
    return this.metamask.request({ method: 'eth_gasPrice' });
  }

  async sendTransaction(
    to: string,
    value: string,
    gas: string,
    gasPrice: string,
    nonce: string,
    data: string
  ) {
    const param = {
      to,
      from: (await this.getMetamaskAccounts())[0],
      value,
      gas,
      gasPrice,
      nonce,
      data,
    };

    console.log('signing transaction: ', param);

    return this.metamask.request({
      method: 'eth_sendTransaction',
      params: [param],
    });
  }

  async userCreate(username: string): Promise<any> {
    return this.sendTransaction(
      environment.xesAddress,
      '0x0',
      '100000',
      await this.getGasPrice(),
      (await this.getNonce()).toString(),
      this.xes.interface.encodeFunctionData('userCreate', [username])
    );
  }
}
