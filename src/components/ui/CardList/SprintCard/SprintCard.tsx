import { FC, useState } from "react";
import { ISprint } from "../../../../types/ISprints";
import { useSprints } from "../../../../hooks/useSprints";
import { ModalEditarSprint } from "../../Modals/ModalEditSprint/ModalEditSprint";
import { ModalViewSprint } from "../../Modals/ModalViewSprint/ModalViewSprint";
import { useNavigate } from "react-router-dom";
import styles from "./SprintCard.module.css";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

// Tipado del componente: recibe un sprint como propiedad
type IPropiedadesSprint = {
  sprint: ISprint;
};

export const SprintCard: FC<IPropiedadesSprint> = ({ sprint }) => {
  const { eliminarSprint } = useSprints(); // Hook personalizado para gestionar sprints
  const navegar = useNavigate(); // Hook de React Router para navegación programática

  // Estados locales para manejar la apertura de los modales de vista y edición
  const [modalVistaAbierto, setModalVistaAbierto] = useState(false);
  const [modalEdicionAbierto, setModalEdicionAbierto] = useState(false);

  // Maneja la eliminación del sprint
  const manejarEliminarSprint = () => eliminarSprint(sprint.id);

  // Abrir/cerrar modales
  const abrirModalVista = () => setModalVistaAbierto(true);
  const cerrarModalVista = () => setModalVistaAbierto(false);
  const abrirModalEdicion = () => setModalEdicionAbierto(true);
  const cerrarModalEdicion = () => setModalEdicionAbierto(false);
  const calcularClasePorFecha = (): string => {
    const hoy = new Date();
    const fechaLimite = new Date(sprint.fechaCierre);
    const diferenciaEnMs = fechaLimite.getTime() - hoy.getTime();
    const diferenciaEnDias = Math.ceil(diferenciaEnMs / (1000 * 60 * 60 * 24));
    console.log({ diferenciaEnDias, fechaLimite, hoy });

    if (diferenciaEnDias < 0) return styles.expirada;
    if (diferenciaEnDias <= 3) return styles.proximaAVencer;
    return "";
  };

  return (
    <>
      <div className={ `${styles.mainDev} ${calcularClasePorFecha()}`}>
        {/* Al hacer clic en el título se navega a la vista del sprint */}
        <div>
          <h4
            onClick={() => navegar(`/sprint/${sprint.id}`)}
            style={{ cursor: "pointer" }}
          >
            {sprint.nombre}
          </h4>
        </div>

        {/* Fechas de inicio y cierre del sprint */}
        <div className={styles.fechas}>
          <p>Fecha de Inicio: {sprint.fechaInicio}</p>
          <p>Fecha de Cierre: {sprint.fechaCierre}</p>
        </div>

        {/* Botones de acciones: ver, editar, eliminar */}
        <div className={styles.ContainerButtons}>
          <button
            onClick={() => navegar(`/sprint/${sprint.id}`)}
            className={styles.iconButton}
          >
            <FaEye size={20} color="#8a8bce" />
          </button>
          <button onClick={abrirModalEdicion} className={styles.iconButton}>
            <FaEdit size={20} color="#8a8bce" />
          </button>
          <button onClick={manejarEliminarSprint} className={styles.iconButton}>
            <FaTrash size={20} color="red" />
          </button>
        </div>

        {/* Modales condicionales */}
        {modalVistaAbierto && (
          <ModalViewSprint
            handleCloseViewModal={cerrarModalVista}
            sprint={sprint}
          />
        )}
        {modalEdicionAbierto && (
          <ModalEditarSprint
          manejarCerrarModalEditar={cerrarModalEdicion}
            sprint={sprint}
          />
        )}
      </div>
    </>
  );
};
