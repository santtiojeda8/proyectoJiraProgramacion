import { FC } from "react";
import { useSprints } from "../../../hooks/useSprints";
import styles from "./Sprints.module.css";
import { useParams } from "react-router-dom";

interface Params {
  id?: string;
}

export const Sprints: FC<Params> = () => {

  const { id } = useParams<{ id?: string }>();

  const { sprints } = useSprints();

  const sprintSeleccionado = sprints.find( (el) => el.id ===id)
  return (
    <>
      <div className={styles.back}>
        <div className={styles.header}>
          <h1>Nombre de la Sprint: {sprintSeleccionado?.nombre}</h1>
          <h2>Tareas de la Sprint</h2>
          <button className={styles.create_task}>Crear Tarea</button>
        </div>
        <div className={styles.board}>
          <div className={styles.column}>
            <h2>PENDIENTE</h2>
            {tareasPendientes.length > 0 ? (
              tareasPendientes.map((tarea) => (
                <div key={tarea.id} className={styles.tarea_card}>
                  <TareaCard tarea={tarea} />
                </div>
              ))
            ) : (
              <p>No hay tareas pendientes</p>
            )}
          </div>
          <div className={styles.column}>
            <h2>EN PROGRESO</h2>
            {tareasEnProgreso.length > 0 ? (
              tareasEnProgreso.map((tarea) => (
                <div key={tarea.id} className={styles.tarea_card}>
                  <TareaCard tarea={tarea} />
                </div>
              ))
            ) : (
              <p>No hay tareas en progreso</p>
            )}
          </div>
          <div className={styles.column}>
            <h2>COMPLETADO</h2>
            {tareasCompletadas.length > 0 ? (
              tareasCompletadas.map((tarea) => (
                <div key={tarea.id} className={styles.tarea_card}>
                  <TareaCard tarea={tarea} />
                </div>
              ))
            ) : (
              <p>No hay tareas completadas</p>
            )}
          </div>
        </div>
        {modalAbierto && (
          <ModalCreateCard
            handleCloseModalCreate={handleCloseModal}
            idSprint={sprint.id} // 👈 pasás el ID del sprint al modal
          />
        )}
      </div>
    </>
  );
};
