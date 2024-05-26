import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Game Shop';
  mostrarMenu: boolean = true;
  constructor(private _loginService: LoginService) { }
  ngOnInit() {
    this._loginService.getMostraMenu().subscribe(res => {
      this.mostrarMenu = res;
    })
  }
  ngOnDestroy() {
    localStorage.clear();
  }
}
