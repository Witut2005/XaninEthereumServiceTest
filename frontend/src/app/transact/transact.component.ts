import { Component } from '@angular/core';
import { EtherService } from '../ether.service';

@Component({
  selector: 'app-transact',
  templateUrl: './transact.component.html',
  styleUrls: ['./transact.component.css'],
})
export class TransactComponent {
  usersFinded: string[] = [];
  userInput: string = '';

  constructor(private readonly ether: EtherService) {
    this.ether
      .getUsers()
      .then((users) => {
        console.log(users);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleUserInputChange(): void {
    this.ether.getUsers().then((users: string[]) => {
      this.usersFinded = [];
      for (const i in users) {
        if (users[i].indexOf(this.userInput) != -1) {
          this.usersFinded.push(users[i]);
        }
      }
    });
  }
}
