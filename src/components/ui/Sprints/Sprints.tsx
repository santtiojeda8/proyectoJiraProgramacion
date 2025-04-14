import { FC, useEffect, useState } from "react";
import { useSprints } from "../../../hooks/useSprints";
import styles from "./Sprints.module.css";
import { useParams } from "react-router-dom";
import { ISprint } from "../../../types/ISprints";
import { ITarea } from "../../../types/IBacklog";
import { tareaStore } from "../../../store/tareaStore";
import { TareaCard } from "../CardList/TareaCard/TareaCard";


interface Params {
  id?: string;
}

export const Sprints: FC<Params> = () => {

  const { id } = useParams<{ id?: string }>();

  const { sprints , getSprints } = useSprints();

  const [sprint, setSprint] = useState<ISprint | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<ITarea | null>(null)

  const handleOpenModalEdit = (tarea: ITarea) => {
    setTareaSeleccionada(tarea); // ya no es necesario si usas el store
    tareaStore.getState().setTareaActiva(tarea); // 👈 agregar esta línea
    setModalAbierto(true);
  };

  const handleCloseModal = () => {
    setTareaSeleccionada(null);
    setModalAbierto(false);
  };

  const handleNuevaTarea = () => {
    tareaStore.getState().setTareaActiva(null); // nueva tarea
    setModalAbierto(true);
  };

  useEffect(() => {
    if (sprints.length === 0) {
      getSprints();
    }
  }, []);

  useEffect(() => {
    const foundSprint = sprints.find((s) => s.id === id);
    setSprint(foundSprint || null);
  }, [sprints, id]);

  if (!sprint) {
    return <h2>Cargando o Sprint no encontrada...</h2>;
  }
  const tareasPendientes = sprint.tareas.filter(
    (t) => t.estado === "Pendiente"
  );
  const tareasEnProgreso = sprint.tareas.filter(
    (t) => t.estado === "En Progreso"
  );
  const tareasCompletadas = sprint.tareas.filter(
    (t) => t.estado === "Finalizado"
  );

  return (
    <>
      <div className={styles.back}>
        <div className={styles.header}>
          <h1>Nombre de la Sprint: {sprint?.nombre}</h1>
          <h2>Tareas de la Sprint</h2>
          <button className={styles.create_task} onClick={handleNuevaTarea}>Crear Tarea</button>
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
        {/* {modalAbierto && (
          <ModalCreateCard
            handleCloseModalCreate={handleCloseModal}
            idSprint={sprint.id} // 👈 pasás el ID del sprint al modal
          />
        )} */}
      </div>
    </>
  );
};
