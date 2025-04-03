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

export const useSprints = () => {
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
      await agregarNuevoSprint(nuevoSprint); //Actuializamos el estado
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
      await editarSprintsArray( sprintEditado);
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

    eliminarSprintsArray(idSprint);

    try {
      await deleteSprintById(idSprint);
      Swal.fire("Sprint eliminada exitosamente");
    } catch (error) {
      if (estadoPrevio) agregarNuevoSprint(estadoPrevio);
      console.error("Error al eliminar sprint", error);
    }
  };


  return {
    sprints,
    getSprints,
    crearSprint,
    editarUnSprint,
    eliminarSprint,
  };
};
