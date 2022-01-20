import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produtos } from 'src/app/model/Produtos';
import { Usuario } from 'src/app/model/Usuario';
import { ProdutosService } from 'src/app/service/produtos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {

  produto: Produtos = new Produtos()
  listaProdutos: Produtos[]
  usuario: Usuario = new Usuario()
  constructor(
    private produtoService: ProdutosService,
    private rota: Router
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

  cadastrar(){
    this.usuario.id = environment.idUsuario
    this.produto.usuario = this.usuario
    this.produtoService.postProduto(this.produto).subscribe((resp: Produtos) =>{
      alert('Produto criado com sucesso')
      this.produto = new Produtos()
      this.getAllProdutos()
      this.rota.navigate(['/cadastrar-produto'])
    })
  }

}
