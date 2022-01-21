import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produtos } from 'src/app/model/Produtos';
import { Usuario } from 'src/app/model/Usuario';
import { ProdutosService } from 'src/app/service/produtos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {
  usuario: Usuario = new Usuario()
  produto: Produtos = new Produtos()
  constructor(
    private produtoService: ProdutosService,
    private rota: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    if(environment.token == ""){
      this.rota.navigate(["/login"])
      alert("Sua sessão expirou, faça o login novamente")      
    }
    let id = this.route.snapshot.params['id']
    this.getByIdProduto(id)
  }

  getByIdProduto(id: number){
    this.produtoService.getIdProdutos(id).subscribe((resp: Produtos) =>{
      this.produto = resp
    })
  }

  editar(){
    this.usuario.id = environment.idUsuario
    this.produto.usuario = this.usuario
    this.produtoService.putProduto(this.produto).subscribe((resp: Produtos) =>{
      this.produto = resp
      alert('Produto atualizado com sucesso')
      this.rota.navigate(['/inicio'])
    })
  }

}
