import { FC, useState } from "react";
import styles from "./TareaCard.module.css";

import { ITarea } from "../../../../types/IBacklog";
import { ViewCard } from "../ViewCard/ViewCard";
import { ModalEditCard } from "../ModalEditCard/ModalEditCard";
import { useTarea } from "../../../../hooks/useTarea";

import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Importamos íconos de react-icons

type ITareaCard = {
  tarea: ITarea;
};

export const TareaCard: FC<ITareaCard> = ({ tarea }) => {
  const { borrarTarea } = useTarea();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);

  const handleOpenViewModal = () => setOpenViewModal(true);
  const handleCloseViewModal = () => setOpenViewModal(false);
  const handleOpenModalEdit = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleDeleteTarea = () => borrarTarea(tarea.id);

  return (
    <>
      <div className={styles.ContainerPrincipal}>
        <div className={styles.ContainerTittle}>
          <h3>{tarea.titulo} : </h3>
          <p>{tarea.descripcion}</p>
        </div>

        <div className={styles.ContainerButtonSprint}>
          <button className={styles.buttonEnviar}>Enviar a:</button>
          <button className={styles.buttonSprint}>Seleccione un Sprint</button>
        </div>

        <div className={styles.ContainerButtons}>
          <button onClick={handleOpenViewModal} className={styles.iconButton}>
            <FaEye size={20} color="#8a8bce" /> 
          </button>
          <button onClick={handleOpenModalEdit} className={styles.iconButton}>
            <FaEdit size={20} color="#8a8bce" /> 
          </button>
          <button onClick={handleDeleteTarea} className={styles.iconButton}>
            <FaTrash size={20} color="red" /> 
          </button>
        </div>
      </div>

      {openViewModal && <ViewCard handleCloseViewModal={handleCloseViewModal} tarea={tarea} />}
      {openEditModal && <ModalEditCard handleCloseEditModal={handleCloseEditModal} tarea={tarea} />}
    </>
  );
};

