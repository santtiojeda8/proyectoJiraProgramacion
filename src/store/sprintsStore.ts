import { ISprint } from '../types/ISprints'
import { create } from "zustand";

interface ISprintStore {
    sprints : ISprint[],
    sprintActivo : ISprint | null,
    setSprintActivo: (sprintActivo : ISprint | null) => void,
    setArraySprint: (arrayDeSprints : ISprint[]) => void,
    agregarNuevoSprint: (nuevoSprint : ISprint) => void ,
    editarSprintsArray: (sprintActualizado : ISprint) => void,
    eliminarSprintsArray: (idSprint : string) => void
}


export const sprintsStore = create<ISprintStore>( (set)  => ({
    sprints : [],
    sprintActivo : null,

    setSprintActivo: (sprintActivoIn) => set ( () => ({sprintActivo : sprintActivoIn})),

    setArraySprint: (arraydeSprints) => set( () => ( {sprints : arraydeSprints} ) ) ,

    agregarNuevoSprint: (nuevoSprint) => set ( (state) => ({ sprints : [...state.sprints , nuevoSprint]})),

    editarSprintsArray: (sprintEditado) => set( (state) => {
        const arraySprints = state.sprints.map( (sprint) => sprint.id == sprintEditado.id ? {...sprint, sprintEditado} : sprint)
        return { sprints : arraySprints}
    }),

    eliminarSprintsArray: (idSprint) => set( (state) => {
        const arraySprint = state.sprints.filter( (sprint) => sprint.id != idSprint)
        return { sprints : arraySprint}
    })
}))