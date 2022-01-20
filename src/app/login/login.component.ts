import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UsuarioLogin = new UsuarioLogin()
  constructor(
    private auth: AuthService,
    private rota: Router
  ) { }

  ngOnInit() {
  }

  entrar(){
    this.auth.entrar(this.userLogin).subscribe((resp: UsuarioLogin) =>{      
      this.userLogin = resp
      
      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.idUsuario = this.userLogin.idUsuario

      this.rota.navigate(['/inicio'])

    }, erro =>{
      if(erro.status == 400 || erro.status == 500){
        alert('Usuário ou senha estão incorretos!')
      }
    })
  }
}

  

