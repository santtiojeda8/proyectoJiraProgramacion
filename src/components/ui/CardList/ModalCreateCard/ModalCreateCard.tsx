import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useTarea } from "../../../../hooks/useTarea";
import { ITarea } from "../../../../types/IBacklog";
import { generadorDeId } from "../../../../utils/generadorIds";
import styles from "./ModalCreateCard.module.css";
import Swal from "sweetalert2";
import { useSprints } from "../../../../hooks/useSprints";

type ICreateTarea = { 
  handleCloseModalCreate: () => void;
};

export const ModalCreateCard: FC<ICreateTarea> = ({ handleCloseModalCreate}) => {
  

  const initialValues = {
    id: generadorDeId(),
    titulo: "",
    descripcion: "",
    estado: "Pendiente",
    fechaLimite: "",
  };

  const { crearTarea } = useTarea();
  const [formValues, setFormValues] = useState<ITarea>(initialValues);
  const { agregarTareaASprint } = useSprints();

  

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  
    if (
      !formValues.descripcion.trim() ||
      !formValues.titulo.trim() ||
      !formValues.fechaLimite.trim()
    ) {
      Swal.fire("Rellene los campos con la información necesaria");
      return;
    }
    crearTarea(formValues)
    handleCloseModalCreate();
  };

  return (
    <div className={styles.popup_overlay} onClick={handleCloseModalCreate}>
      {/* Contenedor del modal */}
      <form className={styles.popup_content} onClick={(e) => e.stopPropagation()}>
        <label>Ingrese título</label>
        <input type="text" name="titulo" value={formValues.titulo} onChange={handleChange} required/>

        <label>Ingrese descripción</label>
        <textarea name="descripcion" value={formValues.descripcion} onChange={handleChange} required></textarea>

        <label>Decida el estado de la tarea</label>
        <select name="estado" onChange={handleChange} value={formValues.estado} required>
          <option value="Pendiente">Pendiente</option>
          <option value="En Proceso">En Proceso</option>
          <option value="Finalizado">Finalizado</option>
        </select>

        <label>Ingrese la fecha límite</label>
        <input type="date" name="fechaLimite" value={formValues.fechaLimite} onChange={handleChange} required/>

        <div className={styles.buttonContainer}>
          <button type="button" onClick={handleCloseModalCreate} className={styles.buttonClose}>Cerrar</button>
          <button type="submit" onClick={handleSubmit} className={styles.buttonCreate}>Crear</button>
        </div>
      </form>
    </div>
  );
};
