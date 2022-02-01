export class Tarefa {
    id: number;
    titulo: string;
    descricao: string;
    finalizado: boolean;
    categoria: string;
    dataConclusao: Date;

    constructor(id: number, titulo: string, descricao: string, finalizado: boolean, categoria: string, dataConclusao: Date) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.finalizado = finalizado;
        this.categoria = categoria
        this.dataConclusao = dataConclusao;
    }
}