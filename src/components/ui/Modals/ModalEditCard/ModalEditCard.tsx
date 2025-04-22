import { ChangeEvent, FC, FormEvent, useState } from "react";
import { ITarea } from "../../../../types/IBacklog";
import { useTarea } from "../../../../hooks/useTarea";
import styles from "./ModalEdtiCard.module.css";

type Props = {
  tarea: ITarea;
  handleCloseEditModal: () => void;
};

export const ModalEditCard: FC<Props> = ({ tarea, handleCloseEditModal }) => {
  // Estado local para manejar los valores del formulario (se inicia con la tarea que llega por props)
  const [formValues, setFormValues] = useState<ITarea>(tarea);

  // Hook personalizado para manejar la edición de tareas
  const { edicionTarea } = useTarea();

  // Manejador para cambios en los inputs del formulario
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Manejador del envío del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Llamar la función para editar la tarea con los nuevos datos
    edicionTarea(formValues);

    // Cerrar el modal después de guardar
    handleCloseEditModal();
  };

  return (
    // Fondo oscuro que cierra el modal al hacer click
    <div className={styles.modalOverlay} onClick={handleCloseEditModal}>
      {/* Contenedor principal del modal */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Editar Tarea</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Input para el título */}
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={formValues.titulo}
            onChange={handleChange}
            required
          />

          {/* Textarea para la descripción */}
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={formValues.descripcion}
            onChange={handleChange}
            required
          />

          {/* Selector de estado */}
          <label>Estado:</label>
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

          {/* Input de fecha */}
          <label>Fecha límite:</label>
          <input
            type="date"
            name="fechaLimite"
            value={formValues.fechaLimite}
            onChange={handleChange}
            required
          />

          {/* Botones de acción */}
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCloseEditModal}
            >
              Cerrar
            </button>
            <button type="submit" className={styles.submitButton}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
