import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./TareaCard.module.css";
import { ITarea } from "../../../../types/IBacklog";
import { ViewCard } from "../ViewCard/ViewCard";
import { ModalEditCard } from "../../Modals/ModalEditCard/ModalEditCard";
import { useTarea } from "../../../../hooks/useTarea";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useSprints } from "../../../../hooks/useSprints";
import { ISprint } from "../../../../types/ISprints";
import Swal from "sweetalert2";

// Tipado del componente: recibe una tarea como prop
type IComponenteTarea = {
  tarea: ITarea;
};

export const TareaCard: FC<IComponenteTarea> = ({ tarea }) => {
  const { borrarTarea } = useTarea(); // Hook personalizado para manejar tareas
  const { getSprints, sprints, moverTareaASprint } = useSprints(); // Hook para manejar sprints

  const [sprintSeleccionado, setSprintSeleccionado] = useState<string>("default");
  const [modalEdicionAbierto, setModalEdicionAbierto] = useState(false);
  const [modalVistaAbierto, setModalVistaAbierto] = useState(false);

  useEffect(() => {
    getSprints(); // Al montar el componente, obtener los sprints disponibles
  }, []);

  // Funciones para abrir/cerrar modales
  const abrirModalVista = () => setModalVistaAbierto(true);
  const cerrarModalVista = () => setModalVistaAbierto(false);
  const abrirModalEdicion = () => setModalEdicionAbierto(true);
  const cerrarModalEdicion = () => setModalEdicionAbierto(false);
  const manejarEliminarTarea = () => borrarTarea(tarea.id);

  const manejarCambioSeleccion = (e: ChangeEvent<HTMLSelectElement>) => {
    setSprintSeleccionado(e.target.value);
  };

  const manejarEnvioTarea = () => {
    if (sprintSeleccionado === "default") {
      Swal.fire("Selecciona un sprint primero");
      return;
    }

    // Validamos si la tarea ya está en un sprint
    const tareaYaAsignada = sprints.some((sprint) =>
      sprint.tareas.some((t) => t.id === tarea.id)
    );

    if (tareaYaAsignada) {
      Swal.fire("La tarea ya está asignada a un sprint");
      return;
    }

    moverTareaASprint(tarea, sprintSeleccionado);
    Swal.fire("Tarea enviada correctamente al sprint");
    setSprintSeleccionado("default"); // Reiniciar selección
  };

  // Asigna una clase de estilo en base a la fecha límite de la tarea
  const calcularClasePorFecha = (): string => {
    const hoy = new Date();
    const fechaLimite = new Date(tarea.fechaLimite);
    const diferenciaEnMs = fechaLimite.getTime() - hoy.getTime();
    const diferenciaEnDias = Math.ceil(diferenciaEnMs / (1000 * 60 * 60 * 24));
    console.log({ diferenciaEnDias, fechaLimite, hoy });

    if (diferenciaEnDias < 0) return styles.expirada;
    if (diferenciaEnDias <= 3) return styles.proximaAVencer;
    return "";
  };

  return (
    <>
      <div className={`${styles.ContainerPrincipal} ${calcularClasePorFecha()}`}>
        {/* Título y descripción de la tarea */}
        <div className={styles.ContainerTittle}>
          <h3>{tarea.titulo} : </h3>
          <p>{tarea.descripcion}</p>
        </div>

        {/* Formulario para enviar la tarea a un sprint */}
        <form
          className={styles.ContainerButtonSprint}
          onSubmit={(e) => e.preventDefault()}
        >
          <button
            type="button"
            className={styles.buttonEnviar}
            onClick={manejarEnvioTarea}
          >
            Enviar a
          </button>
          <select
            className={styles.buttonSprint}
            value={sprintSeleccionado}
            onChange={manejarCambioSeleccion}
          >
            <option value="default" disabled>
              Seleccione un sprint
            </option>
            {sprints.length > 0 ? (
              sprints.map((sprint: ISprint) => (
                <option key={sprint.id} value={sprint.id}>
                  {sprint.nombre}
                </option>
              ))
            ) : (
              <option disabled>No hay sprints</option>
            )}
          </select>
        </form>

        {/* Botones de acción: ver, editar, eliminar */}
        <div className={styles.ContainerButtons}>
          <button onClick={abrirModalVista} className={styles.iconButton}>
            <FaEye size={20} color="#8a8bce" />
          </button>
          <button onClick={abrirModalEdicion} className={styles.iconButton}>
            <FaEdit size={20} color="#8a8bce" />
          </button>
          <button onClick={manejarEliminarTarea} className={styles.iconButton}>
            <FaTrash size={20} color="red" />
          </button>
        </div>
      </div>

      {/* Modales condicionales para ver y editar la tarea */}
      {modalVistaAbierto && (
        <ViewCard handleCloseViewModal={cerrarModalVista} tarea={tarea} />
      )}
      {modalEdicionAbierto && (
        <ModalEditCard
          handleCloseEditModal={cerrarModalEdicion}
          tarea={tarea}
        />
      )}
    </>
  );
};
