import { ChangeEvent, FC, FormEvent, useState } from "react";
import { ITarea } from "../../../types/IBacklog";
import { generadorDeId } from "../../../utils/generadorIds";
import styles from "./CreateTareaSprint.module.css";
import Swal from "sweetalert2";
import { useSprints } from "../../../hooks/useSprints";
import { ISprint } from "../../../types/ISprints";

type ICreateTarea = {
  handleCloseModalCreate: () => void;
  idSprint?: string;
};

export const CreateTareaSprint: FC<ICreateTarea> = ({
  handleCloseModalCreate,
  idSprint,
}) => {
  const initialValues = {
    id: generadorDeId(),
    titulo: "",
    descripcion: "",
    estado: "Pendiente",
    fechaLimite: "",
  };

  const { editarUnSprint , sprints} = useSprints();
  const [formValues, setFormValues] = useState<ITarea>(initialValues);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formValues) {
      const foundSprint = sprints.find((s) => s.id === idSprint);

      if (foundSprint) {

        if (
            !formValues.descripcion.trim() ||
            !formValues.titulo.trim() ||
            !formValues.fechaLimite.trim()
          ) {
            Swal.fire("Rellene los campos con la información necesaria");
            return;
          }
        const asignarCambios = [...foundSprint?.tareas , formValues]

        const sprintModificado: ISprint = {
          ...foundSprint,
          tareas: asignarCambios,
        };

        editarUnSprint(sprintModificado);
      }
    }
    handleCloseModalCreate();
  };

  return (
    <div className={styles.popup_overlay} onClick={handleCloseModalCreate}>
      {/* Contenedor del modal */}
      <form
        className={styles.popup_content}
        onClick={(e) => e.stopPropagation()}
      >
        <label>Ingrese título</label>
        <input
          type="text"
          name="titulo"
          value={formValues.titulo}
          onChange={handleChange}
          required
        />

        <label>Ingrese descripción</label>
        <textarea
          name="descripcion"
          value={formValues.descripcion}
          onChange={handleChange}
          required
        ></textarea>

        <label>Decida el estado de la tarea</label>
        <select
          name="estado"
          onChange={handleChange}
          value={formValues.estado}
          required
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En Progerso">En Progreso</option>
          <option value="Finalizado">Finalizado</option>
        </select>

        <label>Ingrese la fecha límite</label>
        <input
          type="date"
          name="fechaLimite"
          value={formValues.fechaLimite}
          onChange={handleChange}
          required
        />

        <div className={styles.buttonContainer}>
          <button
            type="button"
            onClick={handleCloseModalCreate}
            className={styles.buttonClose}
          >
            Cerrar
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.buttonCreate}
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};
