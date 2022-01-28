export interface Tarefa {
    id: number;
    titulo: string;
    descricao: string;
    finalizado: boolean;
    categoria: string;
    dataConclusao: Date;
}