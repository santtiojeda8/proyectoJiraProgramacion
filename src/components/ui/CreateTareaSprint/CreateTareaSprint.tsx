import { ChangeEvent, FC, FormEvent, useState } from "react";
import { ITarea } from "../../../types/IBacklog";
import { generadorDeId } from "../../../utils/generadorIds";
import styles from "./CreateTareaSprint.module.css";
import Swal from "sweetalert2";
import { useSprints } from "../../../hooks/useSprints";


type Props = {
  handleCloseModalCreate: () => void;
  idSprint?: string;
};

export const CreateTareaSprint: FC<Props> = ({
  handleCloseModalCreate,
  idSprint,
}) => {
  const { editarUnSprint, sprints } = useSprints();

  const [formValues, setFormValues] = useState<ITarea>({
    id: generadorDeId(),
    titulo: "",
    descripcion: "",
    estado: "Pendiente",
    fechaLimite: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { titulo, descripcion, fechaLimite } = formValues;

    if (!titulo.trim() || !descripcion.trim() || !fechaLimite.trim()) {
      Swal.fire("Rellene los campos con la información necesaria");
      return;
    }

    const sprint = sprints.find((s) => s.id === idSprint);
    if (!sprint) return;

    const tareasActualizadas = [...sprint.tareas, formValues];

    editarUnSprint({ ...sprint, tareas: tareasActualizadas });

    handleCloseModalCreate();
  };

  return (
    <div className={styles.popup_overlay} onClick={handleCloseModalCreate}>
      <form
        className={styles.popup_content}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <label>Título</label>
        <input
          type="text"
          name="titulo"
          value={formValues.titulo}
          onChange={handleChange}
          required
        />

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={formValues.descripcion}
          onChange={handleChange}
          required
        />

        <label>Estado</label>
        <select
          name="estado"
          value={formValues.estado}
          onChange={handleChange}
          required
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En Progreso">En Progreso</option>
          <option value="Finalizado">Finalizado</option>
        </select>

        <label>Fecha límite</label>
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
            className={styles.buttonClose}
            onClick={handleCloseModalCreate}
          >
            Cerrar
          </button>
          <button type="submit" className={styles.buttonCreate}>
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};
