import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Tarefa } from '../models/tarefa';
import { TarefaService } from '../services/tarefa.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})

export class TarefaComponent implements OnInit {

  private unsubscriber = new Subject();

  tarefaForm: FormGroup | any;
  tarefa: Tarefa | any;
  formResult: string = '';

  constructor(private _tarefaService: TarefaService,
              private fb: FormBuilder) {}
  public tarefas: Tarefa[] = [];

  ngOnInit() {
    this.tarefaForm = this.fb.group({
      id: [0],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      finalizado: [Boolean],
      categoria: ['', Validators.required],
      dataConclusao: [Date, Validators.required],
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

  carregarTarefas() {
    this._tarefaService.getTarefas()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((tarefas: Tarefa[]) => {
        this.tarefas = tarefas;
    })
  }

  guardaTarefa(){
    this.tarefa = Object.assign({}, this.tarefa, this.tarefaForm.value);
    this._tarefaService.adicionarTarefa(this.tarefa).subscribe(
      () => {
        this.carregarTarefas();
      }
    );
  }

  removeTarefa(id: number) {
    this._tarefaService.deletarTarefa(id).subscribe(
      (tarefa: any) => {
        console.log(tarefa);
        this.carregarTarefas();
      }
    )
  }
}
