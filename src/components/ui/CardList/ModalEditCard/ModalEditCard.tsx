import { ChangeEvent, FC, FormEvent, useState } from "react";
import { ITarea } from "../../../../types/IBacklog";
import { useTarea } from "../../../../hooks/useTarea";
import styles from "./ModalEdtiCard.module.css"

type IEditTarea = {
  tarea: ITarea;
  handleCloseEditModal: () => void;
};

export const ModalEditCard: FC<IEditTarea> = ({ tarea, handleCloseEditModal }) => {
  const [formValues, setFormValues] = useState<ITarea>(tarea);
  const { edicionTarea } = useTarea();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    edicionTarea(formValues);
    handleCloseEditModal();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleCloseEditModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Editar Tarea</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Título:</label>
          <input type="text" name="titulo" value={formValues.titulo} onChange={handleChange} />
          
          <label>Descripción:</label>
          <textarea name="descripcion" value={formValues.descripcion} onChange={handleChange}></textarea>
          
          <label>Estado:</label>
          <select name="estado" value={formValues.estado} onChange={handleChange}>
            <option value="Pendiente">Pendiente</option>
            <option value="Finalizado">Finalizado</option>
          </select>
          
          <label>Fecha límite:</label>
          <input type="date" name="fechaLimite" value={formValues.fechaLimite} onChange={handleChange} />

          <div className={styles.buttonContainer}>
            <button type="button" className={styles.cancelButton} onClick={handleCloseEditModal}>Cerrar</button>
            <button type="submit" className={styles.submitButton}>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
