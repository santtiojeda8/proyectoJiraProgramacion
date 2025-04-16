// TareaCardSprint.tsx
import { FC, useState } from "react";
import { ITarea } from "../../../../types/IBacklog";
import styles from "./TareaCardSprint.module.css";
import { Eye, Pencil, Trash2 } from "lucide-react"; // Si usás iconos, por ejemplo, de lucide-react
import { ViewCard } from "../ViewCard/ViewCard";
import { ModalEditCard } from "../ModalEditCard/ModalEditCard";
import { useParams } from "react-router-dom";
import { useSprints } from "../../../../hooks/useSprints";

type IViewTarea = {
  tarea: ITarea;
};

export const TareaCardSprint: FC<IViewTarea> = ({ tarea }) => {
  const { id } = useParams<{ id?: string }>();

  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const {eliminartareaDesdeSprint} = useSprints()

  const handelOpenViewModal = () => {
    setOpenViewModal(true);
  }

  const handleCloseViewModal = () => {
    setOpenViewModal(false)
  }

  const handleOpenEditModal = () => {
    setOpenEditModal(true)
  }
 
  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleDeleteTarea = () => {
    if(!id){
      throw new Error("ID VACIO")
    }
    eliminartareaDesdeSprint(tarea.id , id)
  }

  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <p>
            <strong>Titulo:</strong> {tarea.titulo}
          </p>
          <p>
            <strong>Descripción:</strong> {tarea.descripcion}
          </p>
          <p>
            <strong>Fecha Límite:</strong> {tarea.fechaLimite}
          </p>
          <div className={styles.actionsRow}>
            <button className={styles.backlogBtn}>Enviar al backlog</button>
            <button className={styles.progressBtn}>{tarea.estado}</button>

            <button className={styles.iconBtn} onClick={handelOpenViewModal}>
              <Eye size={18} />
            </button>
            <button className={styles.iconBtn} onClick={handleOpenEditModal}>
              <Pencil size={18} />
            </button>
            <button className={styles.iconBtn} onClick={handleDeleteTarea}>
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
      {openViewModal && <ViewCard tarea={tarea} handleCloseViewModal={handleCloseViewModal}/> }
      {openEditModal && <ModalEditCard tarea={tarea} handleCloseEditModal={handleCloseEditModal}/> }
    </>
  );
};
