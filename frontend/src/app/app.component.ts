import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig) {}
  title = 'frontend';
  items: MenuItem[] = [
    { label: 'Home' },
    { label: 'Transact' },
    { label: 'About' },
  ];

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
