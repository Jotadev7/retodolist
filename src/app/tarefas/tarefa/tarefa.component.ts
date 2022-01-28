import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Tarefa } from '../models/tarefa';
import { takeUntil } from 'rxjs/operators';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html'
})

export class TarefaComponent implements OnInit, OnDestroy {

  public tarefaForm: FormGroup | any;
  public titulo = 'Tarefas';
  public tarefaSelecionada: Tarefa | any;
  public textSimple: string = '';
  Disable : boolean = true;
  public orderby : string = "Categoria";
  public categoria: object = {
    Prioritaria: 4,
    Urgente: 3,
    Dificil: 2,
    Facil: 1
  }

  private unsubscriber = new Subject();

  public tarefas: Tarefa[] = [];
  public tarefa: Tarefa | any;
  public txtDeleteTarefa: string = '';
  public tarefaSave = 'post';
  public isAsc = true;
  private _ORDERBY: object = {
    dataConclusao: () => {
      this.tarefas = this.isAsc ? this.tarefas.sort((a, b) => new Date(a.dataConclusao).getTime() - new Date(b.dataConclusao).getTime()) : this.tarefas.sort((a, b) => new Date(b.dataConclusao).getTime() - new Date(a.dataConclusao).getTime());
    }
  }

  constructor(private _tarefaService: TarefaService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { 
      this.criarForm();
  }

  ngOnInit(): void {
    this.carregarTarefas();
  }

  ngOnDestroy(): void {
      this.unsubscriber.next();
      this.unsubscriber.complete();
  }

  criarForm() {
    this.tarefaForm = this.fb.group({
      id: [0],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      finalizado: [Boolean, Validators.required],
      categoria: ['', Validators.required],
      dataConclusao: [Date, Validators.required]
    })
  }

  salvarTarefa() {
    if(this.tarefaForm.valid) {
      if(this.tarefaSave === 'post') {
        this.tarefa = { ...this.tarefaForm.value};
      } else {
        this.tarefa = { id: this.tarefaSelecionada.id, ...this.tarefaForm.value};
      }

      this._tarefaService[this.tarefaSave](this.tarefa)
        .pipe(takeUntil(this.unsubscriber))
        .subscribe(
          () => {
            this.carregarTarefas();
            this.toastr.success('Tarefa adicionada com sucesso!');
          }, (error: any) => {
            this.toastr.error('Erro: Tarefa não foi salva.');
            console.log(error);
          }
        );
    }
  }

  deletarTarefa(id: number){
    this._tarefaService.deletarTarefa(id).subscribe(
      (tarefa: any) => {
        console.log(tarefa);
        this.toastr.success('Tarefa excluída com sucesso!');
        this.carregarTarefas;
      }
    )
  }

  onChange(event) {
    const type: string = event.target.value;
    if(type !== "Ordenação") {
      this._ORDERBY[type]();
      this.orderby = type;
    }
  }

  onChangeRadio(event) {
    const radio = event.target.id
    radio === "asc" ? this.isAsc = true : this.isAsc = false;
    console.log(this.orderby, this.isAsc);
    if (this.orderby !== "")
      this._ORDERBY[this.orderby]();
  }

  carregarTarefas() {
    this._tarefaService.getTarefas()
      .subscribe(
        tarefas => {
        this.tarefas = tarefas;
      },
      error => console.log(error)
    );
  }

  tarefaSelecionar(tarefa: Tarefa) {
    this.tarefaSave = 'put';
    this.tarefaSelecionada = tarefa;
    this.tarefaForm.patchValue(tarefa);
  }

  limpar() {
    this.tarefaSelecionada = null;
  }

}
