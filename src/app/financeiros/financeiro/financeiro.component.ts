import { ToastrService } from 'ngx-toastr';
import { Financeiro } from './../models/financeiro';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FinanceiroService } from '../services/financeiro.service';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.css']
})
export class FinanceiroComponent implements OnInit {

  financeiroForm: FormGroup | any;
  financeiro = {} as Financeiro;
  financeiroSelecionado: Financeiro | any;
  acao = 'post';
  public financeiros: Financeiro[] = [];

  // Ordenação
  key: string = 'id';
  reverse: boolean = false;
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(private _financeiroService: FinanceiroService,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

  // Ao iniciar, cria o formulário e carrega todos financeiros.
  ngOnInit() {
    this.criarForm();
    this.carregarFinanceiros();
  }

  // Cria o formulário usando FormBuilder e validações básicas.
  criarForm() {
    this.financeiroForm = this.fb.group({
      id: [0],
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      tipo: ['', Validators.required],
      empresa: ['', Validators.required]
    })
  }

  // Define se o financeiro será criado ou atualizado, com base na ação. (Chama os serviços de adicionar ou alterar)

  guardaFinanceiro() {
    if(this.financeiroForm.valid) {
      if(this.acao === 'post') {
        this.financeiro = { ...this.financeiroForm.value};
        this._financeiroService.adicionarFinanceiro(this.financeiro).subscribe(() => {
          this.carregarFinanceiros();
          this.toastr.success('Financeiro salvo com sucesso!', 'Sucesso!', {positionClass: 'toast-top-left', timeOut: 5000});
          this.criarForm();
        })
      } else {
        this.financeiro = { id: this.financeiroSelecionado.id, ...this.financeiroForm.value};
        this._financeiroService.alterarFinanceiro(this.financeiro).subscribe(() => {
          this.carregarFinanceiros();
          this.toastr.success('Financeiro atualizado com sucesso!', 'Sucesso!', {positionClass: 'toast-top-right', timeOut: 5000});
          this.criarForm();
          this.acao = 'post';
        })
      }
    }
  }

  // Chama o serviço para carregar todos financeiros
  carregarFinanceiros() {
    this._financeiroService.getFinanceiros()
      .subscribe((financeiros: Financeiro[]) => {
        this.financeiros = financeiros;
    })
  }

  // Remove um financeiro
  removeFinanceiro(financeiro: Financeiro) {
    this._financeiroService.deletarFinanceiro(financeiro).subscribe(
      () => {
        this.toastr.success('Financeiro excluído com sucesso!', 'Sucesso!', {positionClass: 'toast-top-center', timeOut: 5000});
        this.carregarFinanceiros();
      }
    )
  }

  // Copia o financeiro para ser editado
  atualizaFinanceiro(financeiro: Financeiro) {
    this.acao = 'put';
    this.financeiroSelecionado = financeiro;
    this.financeiroForm.patchValue(financeiro);
  }

  // Limpa form do financeiro
  limpaFinanceiro(){
    this.financeiroSelecionado = null;
    this.criarForm();
  }

}
