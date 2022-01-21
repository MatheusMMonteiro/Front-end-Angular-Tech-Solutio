import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produtos } from '../model/Produtos';
import { AuthService } from '../service/auth.service';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  key = 'data'
  reverse = true
  nomeProduto: string
  listaProdutos: Produtos[]
  produto: Produtos = new Produtos()
  constructor(
    private rota: Router,
    private produtoService: ProdutosService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    if(environment.token == ""){
      this.rota.navigate(["/login"])
      alert("Sua sessão expirou, faça o login novamente")      
    }
    this.getAllProdutos()
  }
  getAllProdutos(){
    this.produtoService.getAllProdutos().subscribe((resp: Produtos[]) =>{
      this.listaProdutos = resp
    })
  }
  findByNomeProduto(){
    if (this.nomeProduto == ''){  
      this.btnClear()
    }else(            
      document.getElementById('button-addon1')?.classList.remove('visually-hidden'),
      this.produtoService.getNomeProdutos(this.nomeProduto).subscribe((resp: Produtos[]) =>{
        this.listaProdutos = resp
      })
    )
  }
  btnClear(){
    document.getElementById('button-addon1')?.classList.toggle('visually-hidden')
    this.getAllProdutos()
    

  }

}
