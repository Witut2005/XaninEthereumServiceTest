import { Component } from '@angular/core';
import { EtherService } from '../ether.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userInput!: string;

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
          severity: 'error',
        });
      });
  }

  userCreate(): void {
    this.ether
      .userCreate(this.userInput)
      .then((data) => {
        this.ether.provider.waitForTransaction(data.hash, 5).then(() => {
          this.message.add({
            summary: 'Transaction successfully ',
            severity: 'success',
          });
        });
        console.log('data: ', data);
      })
      .catch((err) => {
        console.error(err);
        this.message.add({
          summary: `Something went wrong. Error code: ${err.code}`,
          severity: 'error',
        });
      });
  }
}
