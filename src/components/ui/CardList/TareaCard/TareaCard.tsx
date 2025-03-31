import { FC, useState } from "react";
import styles from "./TareaCard.module.css";

import { ITarea } from "../../../../types/IBacklog";
import { ViewCard } from "../ViewCard/ViewCard";
import { ModalEditCard } from "../ModalEditCard/ModalEditCard";
import { useTarea } from "../../../../hooks/useTarea";

type ITareaCard = {
  tarea: ITarea;
  handleOpenModalEdit: (tarea: ITarea) => void;
};

export const TareaCard: FC<ITareaCard> = ({ tarea }) => {
  const { borrarTarea } = useTarea();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);

  const handleOpenViewModal = () => {
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };

  const handleOpenModalEdit = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleDeleteTarea = () => {
    borrarTarea(tarea.id);
  };

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
          <button onClick={handleOpenViewModal}>
            ver
            {/* <svg className={styles.eye} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                fill="#8a8bce"
                d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
              />
            </svg>  */}
          </button>
          <button onClick={handleOpenModalEdit}>editar
            {/* <svg className={styles.eye} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                fill="#8a8bce"
                d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
              />
            </svg>  */}
            </button>
          <button onClick={handleDeleteTarea}>borrar
            {/* <svg className={styles.eye} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                fill="#8a8bce"
                d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
              />
            </svg>  */}
            </button>
          
        </div>
       
      </div>
      {openViewModal && (
        <ViewCard handleCloseViewModal={handleCloseViewModal} tarea={tarea} />
      )}
      {openEditModal && (
        <ModalEditCard
          handleCloseEditModal={handleCloseEditModal}
          tarea={tarea}
        />
      )}
    </>
  );
};
