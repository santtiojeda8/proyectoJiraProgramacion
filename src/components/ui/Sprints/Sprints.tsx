import { FC, useEffect } from "react";
import { useSprints } from "../../../hooks/useSprints";
import styles from "./Sprints.module.css";
import { ISprint } from "../../../types/ISprints";
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
          </div>
          <div className={styles.column}>
            <h2>EN PROGRESO</h2>
            <div className={styles.task_card}>
              <p>
                <strong>Título</strong>
              </p>
              <p>Descripción</p>
              <p>Fecha Límite</p>
              <div className={styles.task_buttons}>
                <button className={styles.backlog}>Enviar al backlog</button>
                <button className={styles.in_progress}>En progreso</button>
                <button className={styles.view}>Ver</button>
                <button className={styles.edit}>Editar</button>
                <button className={styles.delete}>Eliminar</button>
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <h2>COMPLETADO</h2>
          </div>
        </div>
      </div>
    </>
  );
};
