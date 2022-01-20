import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  
  user: Usuario = new Usuario
  confirmarSenha: string
  constructor(
    private auth: AuthService,
    private rota: Router
  ) { }

  ngOnInit() {
  }
  
  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }
  cadastrar(){

    if(this.user.senha != this.confirmarSenha){
      alert('As senhas estão incorretas')
    }else{
      this.auth.cadastrar(this.user).subscribe((resp: Usuario) =>{
        this.user = resp
        alert('Usuário cadastrado com sucesso')
        this.rota.navigate(['/login'])
      })

    }

  }
}
