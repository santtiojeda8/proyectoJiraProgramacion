import { useShallow } from "zustand/shallow";
import Swal from "sweetalert2";
import { tareaStore } from "../store/tareaStore"; 
import { ITarea } from "../types/IBacklog";
import { editarTarea, eliminarTareaId, getAllTareas, postNuevaTarea } from "../https/tarea";

export const useTarea = () => {
  
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
      const data = await getAllTareas();
      if (data) setArrayTareas(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  // Crear una nueva tarea
  const crearTarea = async (nuevaTarea: ITarea) => {
    agregarNuevaTarea(nuevaTarea);
    try {
      await postNuevaTarea(nuevaTarea);
      Swal.fire("Tarea creada exitosamente");
    } catch (error) {
      eliminarTareaArray(nuevaTarea.id!);
      console.error("Error al crear tarea:", error);
    }
  };

  // Editar una tarea
  const edicionTarea = async (tareaEditada: ITarea) => {
    const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id);
    editarTareaArray(tareaEditada);

    try {
      await editarTarea(tareaEditada.id, tareaEditada); // Se pasa el ID y los cambios
      Swal.fire("Tarea editada exitosamente");
    } catch (error) {
      if (estadoPrevio) editarTareaArray(estadoPrevio);
      console.error("Error al editar tarea:", error);
    }
  };

  // Eliminar una tarea
  const borrarTarea = async (idTarea: string) => {
    const estadoPrevio = tareas.find((el) => el.id === idTarea);

    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (!confirm.isConfirmed) return;

    eliminarTareaArray(idTarea);
    try {
      await eliminarTareaId(idTarea);
      Swal.fire("Tarea eliminada exitosamente");
    } catch (error) {
      if (estadoPrevio) agregarNuevaTarea(estadoPrevio);
      console.error("Error al eliminar tarea:", error);
    }
  };

  return {
    getTareas,
    crearTarea,
    edicionTarea,
    borrarTarea,
    tareas
  };
};
