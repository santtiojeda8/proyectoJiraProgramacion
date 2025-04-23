import { useShallow } from "zustand/shallow";
import Swal from "sweetalert2";
import { tareaStore } from "../store/tareaStore"; 
import { ITarea } from "../types/IBacklog";
import { editarTarea, eliminarTareaId, getAllTareas, postNuevaTarea } from "../https/tarea";

export const useTarea = () => {
  
  // Desestructuración de los métodos y estado del store de tareas usando Zustand
  const { tareas, setArrayTareas, agregarNuevaTarea, eliminarTareaArray, editarTareaArray } = tareaStore(
    useShallow((state) => ({
      tareas: state.tareas,
      setArrayTareas: state.setArrayTareas,
      agregarNuevaTarea: state.agregarNuevaTarea,
      eliminarTareaArray: state.eliminarTareaArray,
      editarTareaArray: state.editarTareaArray
    }))
  );

  // Obtener todas las tareas desde el backlog
  const getTareas = async () => {
    try {
      const data = await getAllTareas(); // Llama a la función para obtener las tareas
      if (data) setArrayTareas(data); // Si hay datos, actualiza el store con las tareas obtenidas
    } catch (error) {
      console.error("Error al obtener tareas:", error); // Muestra error en consola si no se pueden obtener las tareas
    }
  };

  // Crear una nueva tarea
  const crearTarea = async (nuevaTarea: ITarea) => {
    agregarNuevaTarea(nuevaTarea); // Añadir la tarea al store antes de hacer la solicitud
    try {
      await postNuevaTarea(nuevaTarea); // Llama a la API para crear la tarea
      Swal.fire("Tarea creada exitosamente"); // Muestra un mensaje de éxito
    } catch (error) {
      eliminarTareaArray(nuevaTarea.id!); // Si ocurre un error, elimina la tarea del store
      console.error("Error al crear tarea:", error); // Muestra error en consola si no se puede crear la tarea
    }
  };

  // Editar una tarea
  const edicionTarea = async (tareaEditada: ITarea) => {
    const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id); // Guarda el estado anterior de la tarea
    editarTareaArray(tareaEditada); // Actualiza el estado de la tarea en el store

    try {
      await editarTarea(tareaEditada.id, tareaEditada); // Llama a la API para editar la tarea
      Swal.fire("Tarea editada exitosamente"); // Muestra un mensaje de éxito
    } catch (error) {
      if (estadoPrevio) editarTareaArray(estadoPrevio); // Si ocurre un error, restaura la tarea a su estado previo
      console.error("Error al editar tarea:", error); // Muestra error en consola si no se puede editar la tarea
    }
  };

  // Eliminar una tarea
  const borrarTarea = async (idTarea: string) => {
    const estadoPrevio = tareas.find((el) => el.id === idTarea); // Guarda el estado de la tarea antes de eliminarla

    // Muestra una confirmación antes de eliminar la tarea
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (!confirm.isConfirmed) return; // Si no se confirma, no se elimina la tarea

    eliminarTareaArray(idTarea); // Elimina la tarea del store
    try {
      await eliminarTareaId(idTarea); // Llama a la API para eliminar la tarea
      Swal.fire("Tarea eliminada exitosamente"); // Muestra un mensaje de éxito
    } catch (error) {
      if (estadoPrevio) agregarNuevaTarea(estadoPrevio); // Si ocurre un error, restaura la tarea
      console.error("Error al eliminar tarea:", error); // Muestra error en consola si no se puede eliminar la tarea
    }
  };

  // Eliminar una tarea asignada a un sprint
  const borrarTareaSprint = async (idTarea: string) => {
    const estadoPrevio = tareas.find((el) => el.id === idTarea); // Guarda el estado de la tarea antes de eliminarla

    eliminarTareaArray(idTarea); // Elimina la tarea del store
    try {
      await eliminarTareaId(idTarea); // Llama a la API para eliminar la tarea
      Swal.fire("Tarea eliminada exitosamente"); // Muestra un mensaje de éxito
    } catch (error) {
      if (estadoPrevio) agregarNuevaTarea(estadoPrevio); // Si ocurre un error, restaura la tarea
      console.error("Error al eliminar tarea:", error); // Muestra error en consola si no se puede eliminar la tarea
    }
  };

  // Mover una tarea al backlog
  const MoverTareaBacklog = async (nuevaTarea: ITarea): Promise<boolean> => {
    const confirmacion = await Swal.fire({
      title: '¿Mover tarea al Backlog?',
      text: 'Esta acción enviará la tarea al Backlog.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, mover',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });
  
    if (!confirmacion.isConfirmed) return false;
  
    agregarNuevaTarea(nuevaTarea);
    try {
      await postNuevaTarea(nuevaTarea);
      return true;
    } catch (error) {
      eliminarTareaArray(nuevaTarea.id!);
      console.error("Error al crear tarea:", error);
      Swal.fire('Error', 'No se pudo mover la tarea al backlog.', 'error');
      return false;
    }
  };
  
  

  // Retorna todas las funciones necesarias para manejar las tareas
  return {
    getTareas,
    crearTarea,
    edicionTarea,
    borrarTarea,
    tareas,
    borrarTareaSprint,
    MoverTareaBacklog
  };
};
