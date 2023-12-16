import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private readonly router: Router
  ) {}

  title = 'XaninEthereumTestService';

  items: MenuItem[] = [
    { label: 'Home' },
    {
      label: 'Register',
      command: () => {
        this.router.navigateByUrl('register');
      },
    },
    {
      label: 'Transact',
      command: () => {
        this.router.navigateByUrl('transact');
      },
    },
    { label: 'About' },
  ];

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
