import { FC, useState } from "react";
import { ITarea } from "../../../../types/IBacklog";
import styles from "./TareaCardSprint.module.css";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { ViewCard } from "../ViewCard/ViewCard";
import { useParams } from "react-router-dom";
import { useSprints } from "../../../../hooks/useSprints";
import { useTarea } from "../../../../hooks/useTarea";
import { ModalEditarTareaSprint } from "../../Modals/ModalEditTareaSprint/ModalEditTareaSprint";
import Swal from "sweetalert2";

type Props = {
  tarea: ITarea;
};

export const TareaCardSprint: FC<Props> = ({ tarea }) => {
  const { id } = useParams<{ id?: string }>();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const { actualizarEstadoTarea, eliminarTareaDesdeSprint } = useSprints();
  const { MoverTareaBacklog } = useTarea();

  // Modal handlers
  const handleOpenViewModal = () => setOpenViewModal(true);
  const handleCloseViewModal = () => setOpenViewModal(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  // Eliminar tarea del sprint
  const handleDeleteTarea = () => {
    if (!id) throw new Error("ID vacío");
    eliminarTareaDesdeSprint(tarea.id, id);
  };

  // Cambiar estado de la tarea
  const handleEstadoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevoEstado = event.target.value;
    if (id) {
      actualizarEstadoTarea(tarea.id, id, nuevoEstado);
    }
  };

  const sendToBacklog = async () => {
    if (!id) return;
  
    try {
      await MoverTareaBacklog(tarea); // Añadir al backlog
      await eliminarTareaDesdeSprint(tarea.id, id, false); // Eliminar del sprint sin confirmación
      Swal.fire("Tarea enviada al backlog exitosamente");
    } catch (error) {
      console.error("Error al mover la tarea al backlog", error);
    }
  };
  
  // Calcular clase según la proximidad de la fecha límite
  const calcularClasePorFecha = (): string => {
    const hoy = new Date();
    const fechaLimite = new Date(tarea.fechaLimite);
    const diferenciaEnMs = fechaLimite.getTime() - hoy.getTime();
    const diferenciaEnDias = Math.ceil(diferenciaEnMs / (1000 * 60 * 60 * 24));

    if (diferenciaEnDias < 0) return styles.expirada;
    if (diferenciaEnDias <= 3) return styles.proximaAVencer;
    return "";
  };

  return (
    <>
      <div className={`${styles.cardContainer} ${calcularClasePorFecha()}`}>
        <div className={styles.card}>
          <p><strong>Título:</strong> {tarea.titulo}</p>
          <p><strong>Descripción:</strong> {tarea.descripcion}</p>
          <p><strong>Fecha Límite:</strong> {tarea.fechaLimite}</p>

          <div className={styles.actionsRow}>
            <button className={styles.backlogBtn} onClick={sendToBacklog}>
              Enviar al backlog
            </button>

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
              <Eye size={25} />
            </button>
            <button className={styles.iconBtn} onClick={handleOpenEditModal}>
              <Pencil size={25} />
            </button>
            <button className={styles.iconBtn} onClick={handleDeleteTarea}>
              <Trash2 size={25} />
            </button>
          </div>
        </div>
      </div>

      {openViewModal && (
        <ViewCard tarea={tarea} handleCloseViewModal={handleCloseViewModal} />
      )}
      {openEditModal && (
        <ModalEditarTareaSprint
          tarea={tarea}
          manejarCerrarModalEditar={handleCloseEditModal}
        />
      )}
    </>
  );
};
