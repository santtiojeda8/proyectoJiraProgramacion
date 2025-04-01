import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useTarea } from "../../../../hooks/useTarea";
import { ITarea } from "../../../../types/IBacklog";
import { generadorDeId } from "../../../../utils/generadorIds";
import styles from "./ModalCreateCard.module.css";

type ICreateTarea = {
  handleCloseModalCreate: () => void;
};

const initialValues = {
  id: generadorDeId(),
  titulo: "",
  descripcion: "",
  estado: "Pendiente",
  fechaLimite: "",
};

export const ModalCreateCard: FC<ICreateTarea> = ({ handleCloseModalCreate }) => {
  const { crearTarea } = useTarea();
  const [formValues, setFormValues] = useState<ITarea>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    crearTarea(formValues);
    handleCloseModalCreate();
  };

  return (
    <div className={styles.popup_overlay} onClick={handleCloseModalCreate}>
      {/* Contenedor del modal */}
      <form className={styles.popup_content} onClick={(e) => e.stopPropagation()}>
        <label>Ingrese título</label>
        <input type="text" name="titulo" value={formValues.titulo} onChange={handleChange} />

        <label>Ingrese descripción</label>
        <textarea name="descripcion" value={formValues.descripcion} onChange={handleChange}></textarea>

        <label>Decida el estado de la tarea</label>
        <select name="estado" onChange={handleChange} value={formValues.estado} required>
          <option value="Pendiente">Pendiente</option>
          <option value="Finalizado">Finalizado</option>
        </select>

        <label>Ingrese la fecha límite</label>
        <input type="date" name="fechaLimite" value={formValues.fechaLimite} onChange={handleChange} />

        <div className={styles.buttonContainer}>
          <button type="button" onClick={handleCloseModalCreate}>Cerrar</button>
          <button type="submit" onClick={handleSubmit}>Crear</button>
        </div>
      </form>
    </div>
  );
};
