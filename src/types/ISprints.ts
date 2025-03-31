import { ITarea } from "./IBacklog";

export interface ISprintList {
  sprints: ISprint[];
}

export interface ISprint {
  id: string;
  fechaInicio: string;
  fechaCierre: string;
  nombre: string;
  tareas: ITarea[];
}
