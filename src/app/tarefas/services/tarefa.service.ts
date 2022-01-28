import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Tarefa } from "../models/tarefa";

@Injectable({
    providedIn: 'root'
})
export class TarefaService {
    constructor(private _httpClient: HttpClient) { }
    private url = "http://localhost:3000/tarefas";

    getTarefas(): Observable<Tarefa[]>{
        return this._httpClient.get<Tarefa[]>(this.url);
    }
}