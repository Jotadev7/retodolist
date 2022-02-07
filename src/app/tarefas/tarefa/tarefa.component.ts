import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Tarefa } from '../models/tarefa';
import { TarefaService } from '../services/tarefa.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})

export class TarefaComponent implements OnInit {

  tarefaForm: FormGroup | any;
  tarefa = {} as Tarefa;
  formResult: string = '';
  public tarefas: Tarefa[] = [];

  constructor(private _tarefaService: TarefaService,
              private fb: FormBuilder,
              private toastr: ToastrService) {}
              
  // Ao iniciar, cria o formulário e carrega todas as tarefas.
  ngOnInit() {
    this.criarForm();
    this.carregarTarefas();
  }

  // Cria o formulário usando FormBuilder e validações básicas.
  criarForm() {
    this.tarefaForm = this.fb.group({
      id: [0],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      finalizado: [Boolean],
      categoria: ['', Validators.required],
      dataConclusao: [Date, Validators.required],
    })
  }

  // Define se a tarefa será criada ou atualizada, com base no ID ser diferente de indefinido. (Chama os serviços de adicionar ou alterar)
  guardaTarefa() {
    if(this.tarefa.id !== undefined) {
      this._tarefaService.alterarTarefa(this.tarefa).subscribe(() => {
        this.criarForm();
        this.carregarTarefas();
        this.toastr.success('Tarefa salva com sucesso!', 'Sucesso!', {positionClass: 'toast-top-left', timeOut: 5000});
      })
    } else {
      this._tarefaService.adicionarTarefa(this.tarefa).subscribe(() => {
        this.criarForm();
      })
    }
  }

  // Antigo método para salvar
  // guardaTarefa(){
  //   this.tarefa = Object.assign({}, this.tarefa, this.tarefaForm.value);
  //   this._tarefaService.adicionarTarefa(this.tarefa).subscribe(
  //     () => {
  //       this.carregarTarefas();
  //       this.toastr.success('Tarefa salva com sucesso!', 'Sucesso!', {positionClass: 'toast-top-left', timeOut: 5000});
  //       this.criarForm();
  //     }
  //   );
  // }

  // Chama o serviço para carregar todas as tarefas
  carregarTarefas() {
    this._tarefaService.getTarefas()
      .subscribe((tarefas: Tarefa[]) => {
        this.tarefas = tarefas;
    })
  }

  // Remove uma tarefa (Chama o serviço de deletarTarefa passando uma tarefa)
  removeTarefa(tarefa: Tarefa) {
    this._tarefaService.deletarTarefa(tarefa).subscribe(
      () => {
        this.toastr.success('Tarefa excluída com sucesso!', 'Sucesso!', {positionClass: 'toast-top-center', timeOut: 5000});
        this.carregarTarefas();
      }
    )
  }

  // Copia a tarefa para ser editada
  atualizarTarefa(tarefa: Tarefa) {
    this.tarefa = { ...tarefa };
  }

}
