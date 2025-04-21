import { useShallow } from "zustand/shallow";
import { sprintsStore } from "../store/sprintsStore";
import {
  deleteSprintById,
  editSprint,
  getAllSprint,
  postNuevoSprint,
} from "../https/sprints";
import { ISprint } from "../types/ISprints";
import Swal from "sweetalert2";
import { ITarea } from "../types/IBacklog";
import { tareaStore } from "../store/tareaStore";
import { eliminarTareaId } from "../https/tarea";

export const useSprints = () => {
  const { eliminarTareaArray , tareas } = tareaStore.getState();
  const {
    sprints,
    setArraySprint,
    agregarNuevoSprint,
    editarSprintsArray,
    eliminarSprintsArray,
  } = sprintsStore(
    useShallow((state) => ({
      sprints: state.sprints,
      setArraySprint: state.setArraySprint,
      agregarNuevoSprint: state.agregarNuevoSprint,
      editarSprintsArray: state.editarSprintsArray,
      eliminarSprintsArray: state.eliminarSprintsArray,
    }))
  );


  const agregarTareaASprint = (idSprint: string, nuevaTarea: ITarea) => {
    // Eliminar la tarea de cualquier sprint que ya la tenga
    const sprintConTarea = sprints.find((sprint) =>
      sprint.tareas.some((t) => t.id === nuevaTarea.id)
    );

    if (sprintConTarea) {
      const actualizado = {
        ...sprintConTarea,
        tareas: sprintConTarea.tareas.filter((t) => t.id !== nuevaTarea.id),
      };
      editarSprintsArray(actualizado);
    }

    // Agregar la tarea al nuevo sprint
    const sprintActualizado = sprints.find((s) => s.id === idSprint);

    if (!sprintActualizado) {
      console.error("Sprint no encontrado");
      return;
    }

    const sprintConNuevaTarea: ISprint = {
      ...sprintActualizado,
      tareas: [...sprintActualizado.tareas, nuevaTarea],
    };

    editarSprintsArray(sprintConNuevaTarea);
  };

  const moverTareaASprint = async (tarea: ITarea, idSprint: string) => {
    const sprintDestino = sprints.find((s) => s.id === idSprint);
    
    if (!sprintDestino) {
      console.error("Sprint no encontrado");
      return;
    }

    const yaExiste = sprintDestino.tareas.some((t) => t.id === tarea.id);
    if (yaExiste) {
      Swal.fire("Esta tarea ya está en el sprint seleccionado");
      return;
    }

    const sprintActualizado: ISprint = {
      ...sprintDestino,
      tareas: [...sprintDestino.tareas, tarea],
    };

    try {
      await editSprint(sprintActualizado.id, sprintActualizado);
      
      // Esta actualiza el sprint en el store
      editarSprintsArray(sprintActualizado);
      
      // Esta línea asegura que desaparece del backlog
      eliminarTareaArray(tarea.id);

      // Esto elimina la tarea que esta en el db.json
      eliminarTareaId(tarea.id) 

      Swal.fire("Tarea movida correctamente");
    } catch (error) {
      console.error("Error al mover tarea al sprint", error);
      Swal.fire("Error al mover tarea", "", "error");
    }
  };

  const getSprints = async () => {
    try {
      const data = await getAllSprint();
      if (data) setArraySprint(data);
    } catch (error) {
      console.error("Hubo un erro al obtener los sprints : ", error);
    }
  };

  const crearSprint = async (nuevoSprint: ISprint) => {
    postNuevoSprint(nuevoSprint); //Hacemos post a la base de datos

    try {
      agregarNuevoSprint(nuevoSprint); //Actuializamos el estado
      Swal.fire("Sprint creada con éxito");
    } catch (error) {
      eliminarSprintsArray(nuevoSprint.id!);
      console.error("Error al crear sprint ", error);
    }
  };

  const editarUnSprint = async (sprintEditado: ISprint) => {
    const estadoPrevio = sprints.find((el) => el.id === sprintEditado.id);
    editSprint(sprintEditado.id, sprintEditado);
    try {
      editarSprintsArray(sprintEditado);
      Swal.fire("Sprint editada con éxito");
    } catch (error) {
      if (estadoPrevio) editarSprintsArray(estadoPrevio);
      console.error("Error al editar sprint", error);
    }
  };

  const eliminarSprint = async (idSprint: string) => {
    const estadoPrevio = sprints.find((el) => el.id === idSprint);

    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    deleteSprintById(idSprint);

    try {
      eliminarSprintsArray(idSprint);
      Swal.fire("Sprint eliminada exitosamente");
    } catch (error) {
      if (estadoPrevio) agregarNuevoSprint(estadoPrevio);
      console.error("Error al eliminar sprint", error);
    }
  };

  const eliminarTareaDesdeSprint = async (idTarea : string , idSprint : string) => {

    const sprintActualizado = sprints.find(sprint => sprint.id === idSprint);

    if (sprintActualizado) {
        sprintActualizado.tareas = sprintActualizado.tareas.filter(tarea => tarea.id !== idTarea);
    }
    
      try {
        if(!sprintActualizado){
          throw new Error("Error al eliminar la tarea del sprint")
        }
        await editSprint(sprintActualizado.id, sprintActualizado);
        
        // Esta actualiza el sprint en el store
        editarSprintsArray(sprintActualizado);
  
        Swal.fire("Tarea eliminada correctamente");
      } catch (error) {
        console.error("Error al eliminar tarea del sprint", error);
        Swal.fire("Error al eliminar tarea", "", "error");
      }
    };
    const actualizarEstadoTarea = async (idTarea: string, idSprint: string, nuevoEstado: string) => {
      const sprint = sprints.find((s) => s.id === idSprint);
      if (!sprint) return;
    
      const tareasActualizadas = sprint.tareas.map((t) =>
        t.id === idTarea ? { ...t, estado: nuevoEstado } : t
      );
    
      const sprintActualizado: ISprint = {
        ...sprint,
        tareas: tareasActualizadas,
      };
    
      try {
        await editSprint(sprintActualizado.id, sprintActualizado);
        editarSprintsArray(sprintActualizado);
        Swal.fire("Estado actualizado correctamente");
      } catch (error) {
        console.error("Error al actualizar estado de la tarea", error);
        Swal.fire("Error al actualizar estado", "", "error");
      }
    };

  return {
    sprints,
    getSprints,
    crearSprint,
    editarUnSprint,
    eliminarSprint,
    agregarTareaASprint,
    moverTareaASprint,
    eliminarTareaDesdeSprint,
    actualizarEstadoTarea
  };
};
