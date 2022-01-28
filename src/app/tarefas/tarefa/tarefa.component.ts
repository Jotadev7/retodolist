import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Tarefa } from '../models/tarefa';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html'
})
export class TarefaComponent implements OnInit {

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
              private toastr: ToastrService) { 
      this.criarForm();
  }

  ngOnInit(): void {
    this.carregarTarefas();
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

  carregarTarefas() {
    this._tarefaService.getTarefas()
      .subscribe(
        tarefas => {
        this.tarefas = tarefas;
      },
      error => console.log(error)
    );
  }


}
