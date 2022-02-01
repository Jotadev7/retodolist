import { Component, OnDestroy, OnInit } from '@angular/core';

import { Tarefa } from '../models/tarefa';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html'
})

export class TarefaComponent implements OnInit {

  constructor(private _tarefaService: TarefaService) {}
  public tarefas: Tarefa[] = [];

  ngOnInit() {
    this._tarefaService.getTarefas()
      .subscribe(
        retorno => {
          this.tarefas = retorno.map(item => 
            {
            return new Tarefa(
              item.id,
              item.titulo,
              item.descricao,
              item.finalizado,
              item.categoria,
              item.dataConclusao
            )
          })
        }
      )
  }
}
