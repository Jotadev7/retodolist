import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Tarefa } from '../models/tarefa';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})

export class TarefaComponent implements OnInit {

  tarefaForm: FormGroup | any;

  constructor(private _tarefaService: TarefaService) {}
  public tarefas: Tarefa[] = [];

  ngOnInit() {
    this.tarefaForm = new FormGroup({
      titulo: new FormControl(''),
      descricao: new FormControl(''),
      finalizado: new FormControl(Boolean),
      categoria: new FormControl(''),
      dataConclusao: new FormControl(Date),
    })

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

  adicionarTarefa() {
    let x = this.tarefaForm.value;
    console.log(x);
  }
}
