export interface IBacklog {
        tareas: ITarea[];
    }

export interface ITarea{
        id: string
       titulo: string 
       descripcion: string
       estado: string, 
       fechaLimite: string

}