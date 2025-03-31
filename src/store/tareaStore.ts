import { create } from "zustand";
import { ITarea } from "../types/IBacklog";

interface ITareaStore {
  tareas: ITarea[];
  tareaActiva: ITarea | null;
  setTareaActiva: (tareaActiva: ITarea | null) => void;
  setArrayTareas: (arrayDeTareas: ITarea[]) => void;
  agregarNuevaTarea: (nuevaTarea: ITarea) => void;
  editarTareaArray: (tareaActualizada: ITarea) => void;
  eliminarTareaArray: (idTarea: string) => void;
}

export const tareaStore = create<ITareaStore>((set) => ({
  tareas: [],
  tareaActiva: null,
  // funciones modificadoras para el Array

  // agregar array de tareas
  setArrayTareas: (arrayDeTareas) => set(() => ({ tareas: arrayDeTareas })),

  //agregar una tarea al array
  agregarNuevaTarea: (nuevaTarea) =>
    set((state) => ({ tareas: [...state.tareas, nuevaTarea] })),

  //editar una tarea del array
  editarTareaArray: (tareaActualizada) =>
    set((state) => {
      const arregloTareas = state.tareas.map((tarea) =>
        tarea.id == tareaActualizada.id
          ? { ...tarea, ...tareaActualizada }
          : tarea
      );
      return { tareas: arregloTareas };
    }),

  //eliminar una tarea del array
  eliminarTareaArray: (idTarea) =>
    set((state) => {
      const arregloTareas = state.tareas.filter((tarea) => tarea.id != idTarea);
      return { tareas: arregloTareas };
    }),

  //setear la tarea activa
  setTareaActiva: (tareaActivaIn) =>
    set(() => ({ tareaActiva: tareaActivaIn })),
}));
