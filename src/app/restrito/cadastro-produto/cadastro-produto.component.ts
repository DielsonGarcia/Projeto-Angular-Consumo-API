import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/Produto.model';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent {
  public produto: Produto = new Produto(0, "", "", "", 0);
  private ultimoIdAtribuido: number = 0;

  constructor(private _produtoService: ProdutoService, private _router: Router) { this.getUltimoIdExistente(); }

  private getUltimoIdExistente(): void {
   
    this._produtoService.getProdutos().subscribe({
      next: (produtos) => {
   
        if (produtos && produtos.length > 0) {
   
          this.ultimoIdAtribuido = produtos.reduce((maxId, produto) => {
            const id = typeof produto.id === 'number' ? produto.id : parseInt(produto.id, 10);
            return Math.max(maxId, id);
          }, 0);
        }
      },
      error: (error) => {
        console.error("Erro ao obter produtos", error);
      }
    });
  }

  cadastrar(): void {
    this.ultimoIdAtribuido++;
    this.produto.id = this.ultimoIdAtribuido;

    this._produtoService.cadastrarProduto(this.produto).subscribe({
      next: (produto) => {
        this.produto = new Produto(0, "", "", "", 0);
        alert("Cadastro Efetuado com sucesso");
        this._router.navigate(["restrito/lista"]);
      },
      error: (err) => {
        console.error("Erro ao Cadastrar", err);
        alert("Erro ao Cadastrar");
      }
    });
  }
}