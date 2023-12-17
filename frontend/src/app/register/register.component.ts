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

    this.ether.getNonce().then((nonce) => {
      console.log('NONCE', nonce);
    });
  }

  userCreate(): void {
    this.ether
      .userCreate(this.userInput)
      .then(() => {
        this.message.add({
          summary: 'User successfully created',
          severity: 'success',
        });
      })
      .catch((err) => {
        console.error(err);
        this.message.add({
          summary: 'Something went wrong',
          severity: 'error',
        });
      });
  }
}
