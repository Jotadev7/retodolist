import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Tarefa } from '../models/tarefa';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})

export class TarefaComponent implements OnInit {

  tarefaForm: FormGroup | any;
  tarefa: Tarefa | any;

  constructor(private _tarefaService: TarefaService,
              private fb: FormBuilder) {}
  public tarefas: Tarefa[] = [];

  ngOnInit() {
    this.tarefaForm = this.fb.group({
      titulo: [''],
      descricao: [''],
      finalizado: [Boolean],
      categoria: [''],
      dataConclusao: [Date],
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
    this.tarefa = Object.assign({}, this.tarefa, this.tarefaForm.value);
    console.log(this.tarefa);
  }
}
