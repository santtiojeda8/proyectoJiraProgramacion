import { FC, useState } from "react";
import { ITarea } from "../../../../types/IBacklog";
import styles from "./TareaCardSprint.module.css";
import { Eye, Pencil, Trash2 } from "lucide-react"; // Si usás iconos, por ejemplo, de lucide-react
import { ViewCard } from "../ViewCard/ViewCard";
import { useParams } from "react-router-dom";
import { useSprints } from "../../../../hooks/useSprints";
import { ModalEditTareaSprint } from "../../ModalEditTareaSprint/ModalEditTareaSprint";
import { useTarea } from "../../../../hooks/useTarea";

type IViewTarea = {
  tarea: ITarea;
};

export const TareaCardSprint: FC<IViewTarea> = ({ tarea }) => {
  const { id } = useParams<{ id?: string }>();

  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const { actualizarEstadoTarea,eliminarTareaDesdeSprint} = useSprints();
  const {crearTarea} = useTarea()


  const handleOpenViewModal = () => {
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleDeleteTarea = () => {
    if (!id) {
      throw new Error("ID vacío");
    }
    eliminarTareaDesdeSprint(tarea.id, id);
  };

  const handleEstadoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevoEstado = event.target.value;
    if (id) {
      actualizarEstadoTarea(tarea.id, id, nuevoEstado); // Llamamos a la función para actualizar el estado
    }
  };

  const sendToBacklog = () => {
    crearTarea(tarea)
    handleDeleteTarea()
  }

  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <p>
            <strong>Título:</strong> {tarea.titulo}
          </p>
          <p>
            <strong>Descripción:</strong> {tarea.descripcion}
          </p>
          <p>
            <strong>Fecha Límite:</strong> {tarea.fechaLimite}
          </p>
          <div className={styles.actionsRow}>
            <button className={styles.backlogBtn} onClick={sendToBacklog}>Enviar al backlog</button>
            {/* Agregamos el select para el cambio de estado */}
            <select
              className={styles.estadoSelect}
              value={tarea.estado}
              onChange={handleEstadoChange}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Finalizado">Finalizado</option>
            </select>

            <button className={styles.iconBtn} onClick={handleOpenViewModal}>
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
      {openViewModal && (
        <ViewCard tarea={tarea} handleCloseViewModal={handleCloseViewModal} />
      )}
      {openEditModal && (
        <ModalEditTareaSprint tarea={tarea} handleCloseEditModal={handleCloseEditModal} />
      )}
    </>
  );
};
