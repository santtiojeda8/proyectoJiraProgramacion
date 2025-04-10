import { FC, useState } from "react";
import { ISprint } from "../../../../types/ISprints";
import { useSprints } from "../../../../hooks/useSprints";
import { ModalEditSprint } from "../ModalEditSprint/ModalEditSprint";
import { ModalViewSprint } from "../ModalViewSprint/ModalViewSprint";
import { useNavigate } from "react-router-dom";
import styles from "./SprintCard.module.css"
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

type ISprintCard = {
  sprint: ISprint
};

export const SprintCard: FC<ISprintCard> = ({ sprint }) => {
  const { eliminarSprint} = useSprints();
  const navigate = useNavigate();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleDeleteSprint = () => eliminarSprint(sprint.id);
  const handleOpenViewModal = () => setOpenViewModal(true);
  const handleCloseViewModal = () => setOpenViewModal(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  return (
    <>
      <div className={styles.mainDev}>
        <div>
          <h4 onClick={() => navigate(`/sprint/${sprint.id}`)} style={{ cursor: 'pointer'}}>{sprint.nombre}</h4>
        </div>
        <div className={styles.fechas}>
          <p>Fecha de Inicio: {sprint.fechaInicio}</p>
          <p>Fecha de Cierre: {sprint.fechaCierre}</p>
        </div>
        <div className={styles.ContainerButtons}>
          <button onClick={()=>navigate(`/sprint/${sprint.id}`)} className={styles.iconButton}>
            <FaEye size={20} color="#8a8bce" />
          </button>
          <button onClick={handleOpenEditModal } className={styles.iconButton}>
            <FaEdit size={20} color="#8a8bce" />
          </button>
          <button onClick={handleDeleteSprint} className={styles.iconButton}>
            <FaTrash size={20} color="red" />
          </button>
        </div>
        
        {openViewModal && (
          <ModalViewSprint
            handleCloseViewModal={handleCloseViewModal}
            sprint={sprint}
          />
        )}
        {openEditModal && (
          <ModalEditSprint
            handleCloseEditModal={handleCloseEditModal}
            sprint={sprint}
          />
        )}
      </div>
    </>
  );
};
