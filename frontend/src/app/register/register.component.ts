import { Component } from '@angular/core';
import { EtherService, VerificationMethods } from '../ether.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ethers } from 'ethers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  VerificationMethods = VerificationMethods;

  userInput: string = '';
  verificationModeSelected: string = VerificationMethods.METAMASK;
  readonly verificationOptions: string[] = ['Metamask Wallet', 'Private Key'];

  constructor(
    private readonly ether: EtherService,
    private readonly message: MessageService
  ) {
    this.ether
      .getUsers()
      .then((users) => {
        console.log(users);
      })
      .catch((err) => {
        console.error('nicerror', err);
      });
    this.ether
      .getMetamaskAccounts()
      .then((accounts) => {
        console.log(accounts);
      })
      .catch((err) => {
        if (err.code === 4001)
          this.message.add({ summary: 'User rejected', severity: 'warn' });
        this.message.add({
          summary: 'Metamask error. Check if metamask is connected to the app',
          severity: 'warn',
        });
      });
  }

  handleVerificationModeChange() {
    this.ether.setVerificationMethod(
      this.verificationModeSelected as VerificationMethods
    );
    console.log(this.verificationModeSelected);
  }

  getError(error: any): string {
    let message = `${error.code}${
      error.operation ? `: ${error.operation}` : ''
    }`;
    if (
      error.code === 'UNSUPPORTED_OPERATION' &&
      error.operation === 'getAddress'
    )
      message += '. Check if metamask is connected to the app';
    return message;
  }

  userCreate(): void {
    this.ether
      .userCreate(this.userInput)
      .then((transaction) => {
        this.ether.provider
          .waitForTransaction(
            (transaction as ethers.providers.TransactionResponse).hash,
            1
          )
          .then(() => {
            this.message.add({
              summary: 'Transaction successfully ',
              severity: 'success',
            });
          });
      })
      .catch((err) => {
        console.error(err);
        this.message.add({
          summary: `Something went wrong. ${
            typeof err === 'string' ? err : this.getError(err)
          }`,
          severity: 'error',
        });
      });
  }
}
