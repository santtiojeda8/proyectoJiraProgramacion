import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./TareaCard.module.css";
import { ITarea } from "../../../../types/IBacklog";
import { ViewCard } from "../ViewCard/ViewCard";
import { ModalEditCard } from "../ModalEditCard/ModalEditCard";
import { useTarea } from "../../../../hooks/useTarea";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Importamos íconos de react-icons
import { useSprints } from "../../../../hooks/useSprints";
import { ISprint } from "../../../../types/ISprints";
import Swal from "sweetalert2";

type ITareaCard = {
  tarea: ITarea;
};

export const TareaCard: FC<ITareaCard> = ({ tarea }) => {
  const { borrarTarea } = useTarea();
  const { getSprints, sprints, moverTareaASprint } = useSprints();

  const [selectedSprint, setSelectedSprint] = useState<string>("default");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);

  useEffect(() => {
    getSprints();
  }, []);

  const handleOpenViewModal = () => setOpenViewModal(true);
  const handleCloseViewModal = () => setOpenViewModal(false);
  const handleOpenModalEdit = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleDeleteTarea = () => borrarTarea(tarea.id);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSprint(e.target.value);
  };

  const handleEnviarTarea = () => {
    if (selectedSprint === "default") {
      Swal.fire("Selecciona un sprint primero");
      return;
    }

    // Validamos si la tarea ya está en un sprint
    const tareaYaAsignada = sprints.some((sprint) =>
      sprint.tareas.some((t) => t.id === tarea.id)
    );

    if (tareaYaAsignada) {
      Swal.fire("La tarea ya está asignada a un sprint");
      return;
    }

    moverTareaASprint(tarea, selectedSprint)
    handleDeleteTarea()
    Swal.fire("Tarea enviada correctamente al sprint");
    setSelectedSprint("default"); // Reiniciamos el select
  };

  return (
    <>
      <div className={styles.ContainerPrincipal}>
        <div className={styles.ContainerTittle}>
          <h3>{tarea.titulo} : </h3>
          <p>{tarea.descripcion}</p>
        </div>

        <form className={styles.ContainerButtonSprint} onSubmit={(e) => e.preventDefault()}>
          <button
            type="button"
            className={styles.buttonEnviar}
            onClick={handleEnviarTarea}
          >
            Enviar a
          </button>
          <select
            className={styles.buttonSprint}
            value={selectedSprint}
            onChange={handleSelectChange}
          >
            <option value="default" disabled>
              Seleccione un sprint
            </option>
            {sprints.length > 0 ? (
              sprints.map((el: ISprint) => (
                <option key={el.id} value={el.id}>
                  {el.nombre}
                </option>
              ))
            ) : (
              <option disabled>No hay sprints</option>
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