import { FC } from "react";
import { ITarea } from "../../../../types/IBacklog";
import styles from "./ViewCard.module.css"; // Importa los estilos

type ITareaCard = {
  tarea: ITarea;
  handleCloseViewModal: () => void;
};

export const ViewCard: FC<ITareaCard> = ({ tarea, handleCloseViewModal }) => {
  return (
    <div className={styles.modalOverlay} onClick={handleCloseViewModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Título: {tarea.titulo}</h3>
        <p>Descripción: {tarea.descripcion}</p>
        <p>Estado: {tarea.estado}</p>
        <p>Fecha límite: {tarea.fechaLimite}</p>
        <button onClick={handleCloseViewModal}>Cerrar</button>
      </div>
    </div>
  );
};
