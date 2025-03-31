import { FC } from "react";
import { ITarea } from "../../../../types/IBacklog";


type ITareaCard = {
  tarea: ITarea;
  handleCloseViewModal: () => void;
};

export const ViewCard: FC<ITareaCard> = ( { tarea , handleCloseViewModal} ) => {

    

  return (
    <>
        <div>
            <h3>Titulo : {tarea.titulo}</h3>
            <p>Descripcion : {tarea.descripcion}</p>
            <p>Estado : {tarea.estado}</p>
            <p>Fecha limite : {tarea.fechaLimite}</p>
            <button onClick={handleCloseViewModal}> Cerrar</button>
        </div>
    </>
  )
}
