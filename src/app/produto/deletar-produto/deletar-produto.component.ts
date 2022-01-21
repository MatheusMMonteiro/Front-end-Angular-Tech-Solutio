import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produtos } from 'src/app/model/Produtos';
import { ProdutosService } from 'src/app/service/produtos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-deletar-produto',
  templateUrl: './deletar-produto.component.html',
  styleUrls: ['./deletar-produto.component.css']
})
export class DeletarProdutoComponent implements OnInit {

  produto: Produtos = new Produtos()
  idProduto: number
  constructor(
    private produtoService: ProdutosService,
    private rota: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.rota.navigate(['/cadastrar-produto'])
    }
    this.idProduto = this.route.snapshot.params['id']
    this.getByIdProduto(this.idProduto)
  }

  getByIdProduto(id: number){
    this.produtoService.getIdProdutos(id).subscribe((resp: Produtos) =>{
      this.produto = resp
    })
  }
  delete(){
    this.produtoService.deleteProduto(this.produto.id).subscribe(()=>{
      alert('Produto deletado com sucesso')
      this.rota.navigate(['/inicio'])
    })
  }
}

