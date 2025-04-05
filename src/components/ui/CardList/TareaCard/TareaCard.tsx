import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
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

const initialValues = {
  id: "",
  fechaInicio : "" ,
  fechaCierre: "",
  nombre : "",
  tareas : []
}

export const TareaCard: FC<ITareaCard> = ({ tarea }) => {
  const { borrarTarea } = useTarea();
  const { getSprints, sprints , editarUnSprint } = useSprints();

  useEffect(() => {
    getSprints();
  }, []);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [formValues , setFormValues] = useState<ISprint>(initialValues)

  const handleOpenViewModal = () => setOpenViewModal(true);
  const handleCloseViewModal = () => setOpenViewModal(false);
  const handleOpenModalEdit = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleDeleteTarea = () => borrarTarea(tarea.id);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };


  sprints.map( (el) => {
    if(el.nombre===formValues.nombre){
    }
  })


    const handleSubmit = (e:FormEvent) => {
      e.preventDefault();
      editarUnSprint(formValues);
    }

  return (
    <>
      <div className={styles.ContainerPrincipal}>
        <div className={styles.ContainerTittle}>
          <h3>{tarea.titulo} : </h3>
          <p>{tarea.descripcion}</p>
        </div>

        <form className={styles.ContainerButtonSprint}>
          <button className={styles.buttonEnviar} onClick={handleSubmit}>Enviar a</button>
          <select className={styles.buttonSprint} name="nombre" onChange={handleChange} >
            <option selected disabled>
              Seleccione un sprint
            </option>
            {sprints.length > 0 ? (
              sprints.map((el) => (
                <option value={el.nombre}>{el.nombre}</option>
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
