import { FC, useState } from "react";
import styles from "./TareaCard.module.css";

import { IBacklog, ITarea } from "../../../../types/IBacklog";
import { tareaStore } from "../../../../store/tareaStore";
import { ViewCard } from "../ViewCard/ViewCard";
import { ModalEditCard } from "../ModalEditCard/ModalEditCard";
import { useTarea } from "../../../../hooks/useTarea";

type ITareaCard = {
  tarea: ITarea;
  handleOpenModalEdit: (tarea: ITarea) => void;
};

export const TareaCard: FC<ITareaCard> = ({ tarea }) => {

    const {borrarTarea} = useTarea()

    const [openEditModal , setOpenEditModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false);

  const handleOpenViewModal = () => {
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };

  const handleOpenModalEdit = () => {
    setOpenEditModal(true)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  return (
    <>
      <div className={styles.ContainerPrincipal}>
        <div className={styles.ContainerTittle}>
          <h3>Titulo: {tarea.titulo}</h3>
          <p>Descripcion: {tarea.descripcion}</p>
        </div>
        <div className={styles.ContainerButtonSprint}>
          <button className={styles.buttonEnviar}>Enviar a:</button>
          <button className={styles.buttonSprint}>Seleccione un Sprint</button>
        </div>
        <div className={styles.ContainerButtons}>
          <button onClick={handleOpenViewModal}>Ver</button>
          <button onClick={handleOpenModalEdit}>Editar</button>
          <button>Eliminar</button>
        </div>
      </div>
      {openViewModal && <ViewCard handleCloseViewModal={handleCloseViewModal} tarea={tarea}/>}
      {openEditModal && <ModalEditCard handleCloseEditModal={handleCloseEditModal} tarea={tarea}/>}
    </>
  );
};
