import { FC } from "react"
import { ISprint } from "../../../../types/ISprints"

type IViewSprint = {
sprint: ISprint
handleCloseViewModal: () => void
}

export const ModalViewSprint:FC<IViewSprint>= ({ sprint , handleCloseViewModal }) => {


  return (
    <>
    <div>
        <p>Nombre: {sprint.nombre}</p>
        <p>Fecha de Inicio: {sprint.fechaInicio}</p>
        <p>Fecha de Cierre: {sprint.fechaCierre}</p>
    </div>
    <div>
        <button onClick={handleCloseViewModal}>Cerrar</button>
    </div>
    </>
  )
}
