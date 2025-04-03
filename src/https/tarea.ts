import axios from "axios";
import { ITarea } from "../types/IBacklog";
import {config} from "../../config/config.ts"

const API_URL_Tarea=config.PortBacklog


// Obtener todas las tareas desde el backlog
export const getAllTareas = async (): Promise<ITarea[]> => {
  try {
    const response = await axios.get<{ tareas: ITarea[] }>(API_URL_Tarea);
    return response.data.tareas; // Acceder a "tareas" dentro de "backlog"
  } catch (error) {
    console.error("Error en getAllTareas:", error);
    throw error;
  }
};

// Agregar una nueva tarea al backlog
export const postNuevaTarea = async (nuevaTarea: ITarea): Promise<void> => {
  try {
    // Obtener el backlog actual
    const response = await axios.get<{ tareas: ITarea[] }>(API_URL_Tarea);
    const tareasActualizadas = [...response.data.tareas, nuevaTarea];

    // Actualizar el backlog con la nueva tarea
    await axios.put(API_URL_Tarea, { tareas: tareasActualizadas });
  } catch (error) {
    console.error("Error en postNuevaTarea:", error);
    throw error;
  }
};

// Editar una tarea del backlog
export const editarTarea = async (
  idTarea: string,
  tareaActualizada: Partial<ITarea>
): Promise<void> => {
  try {
    const response = await axios.get<{ tareas: ITarea[] }>(API_URL_Tarea);
    const tareasActualizadas = response.data.tareas.map((tarea) =>
      tarea.id === idTarea ? { ...tarea, ...tareaActualizada } : tarea
    );

    await axios.put(API_URL_Tarea, { tareas: tareasActualizadas });
  } catch (error) {
    console.error("Error en editarTarea:", error);
    throw error;
  }
};

// Eliminar una tarea por ID
export const eliminarTareaId = async (idTarea: string): Promise<void> => {
  try {
    const response = await axios.get<{ tareas: ITarea[] }>(API_URL_Tarea);
    const tareasActualizadas = response.data.tareas.filter((tarea) => tarea.id !== idTarea);

    await axios.put(API_URL_Tarea, { tareas: tareasActualizadas });
  } catch (error) {
    console.error("Error en eliminarTareaId:", error);
    throw error;
  }
};
