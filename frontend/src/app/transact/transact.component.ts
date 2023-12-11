import { Component } from '@angular/core';
import { EtherService } from '../ether.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transact',
  templateUrl: './transact.component.html',
  styleUrls: ['./transact.component.css'],
})
export class TransactComponent {
  usersFinded: string[] = [];

  userInput: string = '';
  amount!: number;
  suggestions: string[] = ['nicho'];

  constructor(
    private readonly ether: EtherService,
    private readonly mess: MessageService
  ) {
    this.ether
      .getUsers()
      .then((users) => {
        console.log(users);
      })
      .catch((err) => {
        console.error(err);
      });
    this.ether
      .getMetamaskAccounts()
      .then((accounts) => {
        console.log(accounts);
      })
      .catch((err) => {
        console.error('METAMASK NOT INSTALLED');
      });
  }

  autoCompleteInput(event: any): void {
    this.ether.getUsers().then((users: string[]) => {
      this.suggestions = [];
      for (const i in users) {
        if (users[i].indexOf(this.userInput) != -1) {
          this.suggestions.push(users[i]);
        }
      }
      console.log(this.suggestions);
    });
  }

  async sendTransaction(): Promise<void> {
    this.ether
      .sendTransactionToUser(this.userInput)
      .then(() => {
        this.userInput = '';
        this.amount = undefined as unknown as number;
        this.mess.add({
          severity: 'success',
          summary: 'Transaction sent successfully',
        });
      })
      .catch(() => {
        this.mess.add({
          severity: 'error',
          summary: 'Transaction error',
        });
      });
  }
}
