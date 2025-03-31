import { useEffect, useState } from "react";
import { useTarea } from "../../../hooks/useTarea";
import { tareaStore } from "../../../store/tareaStore";
import { TareaCard } from "../CardList/TareaCard/TareaCard";
import styles from "./TareasList.module.css";
import { ITarea } from "../../../types/IBacklog";

export const TareasList = () => {
  const { getTareas, tareas } = useTarea();

  const setTareaActiva = tareaStore((state) => state.setTareaActiva);

  useEffect(() => {
    getTareas();
  }, []);

  const [openModalTarea, setOpenModalTarea] = useState(false);

  const [openCreateTarea , setOpenCreateTarea] = useState(false)

  const handleOpenModalEdit = (tarea: ITarea) => {
    setTareaActiva(tarea);
    setOpenModalTarea(true);
  };

  const handleCloseModal = () => {
    setOpenModalTarea(false);
  };

  return (
    <>
      <div className={styles.containerTasks}>
        <div className={styles.containerTittleBaklog}>
          <h2>BACKLOG</h2>
        </div>
        <div className={styles.conteinerTaskBacklog}>
          <div className={styles.TitleAndButtonTaskBacklog}>
            <h4>Tareas en el Backlog</h4>
            <button>
              Crear Tarea{" "}
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    fill="#ffffff"
                    d="M512 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l128 0c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8l160 0c35.3 0 64 28.7 64 64l0 256zM232 376c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64 64 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-64 0 0-64c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 64-64 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l64 0 0 64z"
                  />
                </svg>
              </p>
            </button>
          </div>
        </div>
        <div className={styles.conatinerTareasCard}>
          {tareas.length > 0 ? (
            tareas.map((el) => (
              <TareaCard handleOpenModalEdit={handleOpenModalEdit} tarea={el} />
            ))
          ) : (
            <div>No hay tareas</div>
          )}
        </div>
      </div>
      {/* {openModalTarea&&<Modal handleCloseModal={handleCloseModal}/>} */}
    </>
  );
};
