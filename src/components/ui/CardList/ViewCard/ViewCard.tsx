import { FC } from "react";
import { ITarea } from "../../../../types/IBacklog";
import styles from "./ViewCard.module.css";

type Props = {
  tarea: ITarea;
  handleCloseViewModal: () => void;
};

export const ViewCard: FC<Props> = ({ tarea, handleCloseViewModal }) => {
  return (
    <div className={styles.modalOverlay} onClick={handleCloseViewModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3><strong>Título:</strong> {tarea.titulo}</h3>
        <p><strong>Descripción:</strong> {tarea.descripcion}</p>
        <p><strong>Estado:</strong> {tarea.estado}</p>
        <p><strong>Fecha límite:</strong> {tarea.fechaLimite}</p>

        <button className={styles.closeButton} onClick={handleCloseViewModal}>
          Cerrar
        </button>
      </div>
    </div>
  );
};
