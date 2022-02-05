import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Tarefa } from '../models/tarefa';
import { TarefaService } from '../services/tarefa.service';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})

export class TarefaComponent implements OnInit, OnDestroy {

  private unsubscriber = new Subject();

  tarefaForm: FormGroup | any;
  tarefa: Tarefa | any;
  formResult: string = '';
  public tarefas: Tarefa[] = [];

  constructor(private _tarefaService: TarefaService,
              private fb: FormBuilder,
              private toastr: ToastrService) {}
              

  ngOnInit() {
    this.criarForm();
    this.carregarTarefas();
  }

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

  ngOnDestroy(): void {
      this.unsubscriber.next();
      this.unsubscriber.complete();
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
        this.criarForm();
      }
    );
  }

  update(taref : FormData){
    
  }

  atualizarTarefa() {
    const { data } = this.tarefaForm.getRawValue()
    this.tarefa = Object.assign({}, this.tarefa, this.tarefaForm.value);
    console.log();
    this._tarefaService.alterarTarefa(this.tarefa).subscribe(
      sucesso => {
        this.carregarTarefas();
        this.toastr.success('Tarefa atualizada!');
      }
    )
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
