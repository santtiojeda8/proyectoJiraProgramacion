
import  { FC, useState } from 'react'
import { ISprint } from '../../../../types/ISprints'
import { useSprints } from '../../../../hooks/useSprints'
import { ModalEditSprint } from '../ModalEditSprint/ModalEditSprint'
import { ModalViewSprint } from '../ModalViewSprint/ModalViewSprint'

type ISprintCard = {
    sprint : ISprint
}

export const SprintCard:FC<ISprintCard> = ( {sprint} ) => {

    const {eliminarSprint} = useSprints()

    const [openViewModal , setOpenViewModal] = useState(false)
    const [openEditModal , setOpenEditModal] = useState(false)

    const handleDeleteSprint = () => eliminarSprint(sprint.id)
    const handleOpenViewModal = () => setOpenViewModal(true)
    const handleCloseViewModal = () => setOpenViewModal(false)
    const handleOpenEditModal = () => setOpenEditModal(true)
    const handleCloseEditModal = () => setOpenEditModal(false)


  return (
    <>
    <div>
        <div>
            <h4>{sprint.nombre}</h4>
        </div>
        <div>
            <p>Fecha de Inicio: {sprint.fechaInicio}</p>
            <p>Fecha de Cierre: {sprint.fechaCierre}</p>
        </div>
        <div>
            <button onClick={handleOpenViewModal}>Ver</button>
            <button onClick={handleOpenEditModal}>Editar</button>
            <button onClick={handleDeleteSprint}>Eliminar</button>
        </div>
        {openViewModal && <ModalViewSprint handleCloseViewModal={handleCloseViewModal} sprint={sprint}/>}
        {openEditModal && <ModalEditSprint handleCloseEditModal={handleCloseEditModal} sprint={sprint}/>}
    </div>
    </>
  )
}
