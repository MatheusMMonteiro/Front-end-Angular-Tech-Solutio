import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome = environment.nome
  constructor(
    private rota: Router
  ) { }

  ngOnInit() {
  }

  sair(){
    this.rota.navigate(['/login'])
    environment.token = ''
    environment.nome = ''
  }

}
