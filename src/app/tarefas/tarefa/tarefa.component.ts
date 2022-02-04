import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Tarefa } from '../models/tarefa';
import { TarefaService } from '../services/tarefa.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  public tarefas: Tarefa[] = [];

  constructor(private _tarefaService: TarefaService,
              private fb: FormBuilder,
              private toastr: ToastrService) {}
              

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
        this.toastr.success('Tarefa salva com sucesso!', 'Sucesso!', {positionClass: 'toast-top-left', timeOut: 5000});
      }
    );
  }

  removeTarefa(id: number) {
    this._tarefaService.deletarTarefa(id).subscribe(
      (tarefa: any) => {
        console.log(tarefa);
        this.toastr.success('Tarefa excluída com sucesso!', 'Sucesso!', {positionClass: 'toast-top-center', timeOut: 5000});
        this.carregarTarefas();
      }
    )
  }
}
