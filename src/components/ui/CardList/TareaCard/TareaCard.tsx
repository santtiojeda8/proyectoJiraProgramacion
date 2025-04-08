import {  FC, useEffect, useState } from "react";
import styles from "./TareaCard.module.css";
import { ITarea } from "../../../../types/IBacklog";
import { ViewCard } from "../ViewCard/ViewCard";
import { ModalEditCard } from "../ModalEditCard/ModalEditCard";
import { useTarea } from "../../../../hooks/useTarea";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Importamos íconos de react-icons
import { useSprints } from "../../../../hooks/useSprints";
import { ISprint } from "../../../../types/ISprints";

type ITareaCard = {
  tarea: ITarea;
};

export const TareaCard: FC<ITareaCard> = ({ tarea }) => {
  const { borrarTarea } = useTarea();
  const { getSprints, sprints } = useSprints();

  useEffect(() => {
    getSprints();
  }, []);

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

        <form className={styles.ContainerButtonSprint}>
          <button className={styles.buttonEnviar}>Enviar a</button>
          <select className={styles.buttonSprint}>
            <option selected disabled>
              Seleccione un sprint
            </option>
            {sprints.length > 0 ? (
              sprints.map((el:ISprint) => (
                <option key={el.id} value={el.nombre}>{el.nombre}</option>
              ))
            ) : (
              <option selected disabled>No hay sprints</option>
            )}
          </select>
        </form>

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
