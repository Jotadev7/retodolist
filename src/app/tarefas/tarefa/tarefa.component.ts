import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../models/tarefa';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html'
})
export class TarefaComponent implements OnInit {

  constructor(private _tarefaService: TarefaService) { }
  public tarefas: Tarefa[] = [];

  ngOnInit(): void {
    this._tarefaService.getTarefas()
      .subscribe(
        tarefas => {
        this.tarefas = tarefas;
      },
      error => console.log(error)
    );
  }
}
