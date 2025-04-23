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
  const { eliminarTareaArray } = tareaStore.getState();
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

  // Función para agregar una tarea a un sprint específico
  const agregarTareaASprint = (idSprint: string, nuevaTarea: ITarea) => {
    // Primero, eliminar la tarea de cualquier sprint que ya la tenga
    const sprintConTarea = sprints.find((sprint) =>
      sprint.tareas.some((t) => t.id === nuevaTarea.id)
    );

    if (sprintConTarea) {
      const actualizado = {
        ...sprintConTarea,
        tareas: sprintConTarea.tareas.filter((t) => t.id !== nuevaTarea.id),
      };
      editarSprintsArray(actualizado); // Actualizar el sprint en el estado
    }

    // Ahora agregar la tarea al nuevo sprint
    const sprintActualizado = sprints.find((s) => s.id === idSprint);

    if (!sprintActualizado) {
      console.error("Sprint no encontrado");
      return;
    }

    const sprintConNuevaTarea: ISprint = {
      ...sprintActualizado,
      tareas: [...sprintActualizado.tareas, nuevaTarea],
    };

    editarSprintsArray(sprintConNuevaTarea); // Actualizar el sprint con la nueva tarea
  };

  // Función para mover una tarea a un sprint específico
  const moverTareaASprint = async (tarea: ITarea, idSprint: string) => {
    const sprintDestino = sprints.find((s) => s.id === idSprint);
    
    if (!sprintDestino) {
      console.error("Sprint no encontrado");
      return;
    }

    // Verificar si la tarea ya existe en el sprint
    const yaExiste = sprintDestino.tareas.some((t) => t.id === tarea.id);
    if (yaExiste) {
      Swal.fire("Esta tarea ya está en el sprint seleccionado");
      return;
    }

    const sprintActualizado: ISprint = {
      ...sprintDestino,
      tareas: [...sprintDestino.tareas, tarea], // Agregar la tarea al sprint
    };

    try {
      await editSprint(sprintActualizado.id, sprintActualizado); // Editar el sprint en la base de datos
      editarSprintsArray(sprintActualizado); // Actualizar el sprint en el estado
      eliminarTareaArray(tarea.id); // Eliminar la tarea del backlog
      eliminarTareaId(tarea.id); // Eliminar la tarea de la base de datos

      Swal.fire("Tarea movida correctamente");
    } catch (error) {
      console.error("Error al mover tarea al sprint", error);
      Swal.fire("Error al mover tarea", "", "error");
    }
  };

  // Función para obtener todos los sprints desde la API
  const getSprints = async () => {
    try {
      const data = await getAllSprint();
      if (data) setArraySprint(data); // Establecer los sprints en el estado
    } catch (error) {
      console.error("Hubo un erro al obtener los sprints : ", error);
    }
  };

  // Función para crear un nuevo sprint
  const crearSprint = async (nuevoSprint: ISprint) => {
    postNuevoSprint(nuevoSprint); // Hacer el POST a la base de datos

    try {
      agregarNuevoSprint(nuevoSprint); // Actualizar el estado con el nuevo sprint
      Swal.fire("Sprint creada con éxito");
    } catch (error) {
      eliminarSprintsArray(nuevoSprint.id!); // Revertir cambios si ocurre un error
      console.error("Error al crear sprint ", error);
    }
  };

  // Función para editar un sprint existente
  const editarUnSprint = async (sprintEditado: ISprint) => {
    const estadoPrevio = sprints.find((el) => el.id === sprintEditado.id); // Guardar el estado previo del sprint
    editSprint(sprintEditado.id, sprintEditado); // Editar el sprint en la base de datos
    try {
      editarSprintsArray(sprintEditado); // Actualizar el sprint en el estado
      Swal.fire("Sprint editada con éxito");
    } catch (error) {
      if (estadoPrevio) editarSprintsArray(estadoPrevio); // Restaurar el estado previo si ocurre un error
      console.error("Error al editar sprint", error);
    }
  };

  // Función para eliminar un sprint
  const eliminarSprint = async (idSprint: string) => {
    const estadoPrevio = sprints.find((el) => el.id === idSprint); // Guardar el estado previo del sprint

    // Confirmar la eliminación con el usuario
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return; // Si no se confirma, no se elimina

    deleteSprintById(idSprint); // Eliminar el sprint de la base de datos

    try {
      eliminarSprintsArray(idSprint); // Eliminar el sprint del estado
      Swal.fire("Sprint eliminada exitosamente");
    } catch (error) {
      if (estadoPrevio) agregarNuevoSprint(estadoPrevio); // Restaurar el sprint si ocurre un error
      console.error("Error al eliminar sprint", error);
    }
  };

  // Función para eliminar una tarea de un sprint específico
  const eliminarTareaDesdeSprint = async (
    idTarea: string,
    idSprint: string,
    confirmar: boolean = true
  ) => {
    if (confirmar) {
      const confirm = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción es irreversible y eliminará la tarea del sprint.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });
  
      if (!confirm.isConfirmed) return;
    }
  
    const sprintActualizado = sprints.find(sprint => sprint.id === idSprint);
  
    if (sprintActualizado) {
      sprintActualizado.tareas = sprintActualizado.tareas.filter(
        tarea => tarea.id !== idTarea
      );
    }
  
    try {
      if (!sprintActualizado) throw new Error("Error al eliminar la tarea del sprint");
  
      await editSprint(sprintActualizado.id, sprintActualizado);
      editarSprintsArray(sprintActualizado);
  
      if (confirmar) {
        Swal.fire("Tarea eliminada correctamente");
      }
    } catch (error) {
      console.error("Error al eliminar tarea del sprint", error);
      Swal.fire("Error al eliminar tarea", "", "error");
    }
  };
  

  // Función para actualizar el estado de una tarea dentro de un sprint
  const actualizarEstadoTarea = async (idTarea: string, idSprint: string, nuevoEstado: string) => {
    const sprint = sprints.find((s) => s.id === idSprint);
    if (!sprint) return;

    // Actualizar el estado de la tarea
    const tareasActualizadas = sprint.tareas.map((t) =>
      t.id === idTarea ? { ...t, estado: nuevoEstado } : t
    );

    const sprintActualizado: ISprint = {
      ...sprint,
      tareas: tareasActualizadas,
    };

    try {
      await editSprint(sprintActualizado.id, sprintActualizado); // Editar el sprint en la base de datos
      editarSprintsArray(sprintActualizado); // Actualizar el sprint en el estado
      Swal.fire("Estado actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar estado de la tarea", error);
      Swal.fire("Error al actualizar estado", "", "error");
    }
  };

  // Retornar las funciones necesarias para manejar los sprints
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
