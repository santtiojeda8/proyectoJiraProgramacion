import axios from 'axios'
import { ISprint } from '../types/ISprints'

const API_URL_SPRINT = "http://localhost:3000/sprintList"


export const getAllSprint = async (): Promise<ISprint[]> => {

    try {
        const response = await axios.get<{sprints : ISprint[]}>(API_URL_SPRINT)
        return response.data.sprints
    } catch (error) {
        console.log("Error en el getAllSprints" , error)
        throw error
    }
} 

export const postNuevoSprint = async (nuevoSprint : ISprint): Promise<void> => {

    try {

        const response = await axios.get<{sprints : ISprint[]}>(API_URL_SPRINT)
        const sprintsActualizados = [...response.data.sprints , nuevoSprint]
        await axios.put(API_URL_SPRINT , {sprints : sprintsActualizados} )

    } catch (error) {
        
        console.log("Error en el postNuevoSprint" , error)
        throw error
    }
}

export const editSprint = async (idSprint : string , sprintEditado : Partial<ISprint>): Promise<void> => {

    try {
        const response = await axios.get<{ sprints: ISprint[] }>(API_URL_SPRINT);

        const sprintActualizados = response.data.sprints.map((sprint) =>
            sprint.id === idSprint ? { ...sprint, ...sprintEditado } : sprint
        );

        await axios.put(API_URL_SPRINT , {sprints : sprintActualizados})

    } catch (error) {
        console.log("Error en el ediTarea" , error)
        throw error
    }
}

export const deleteSprintById = async (idSprint : string): Promise<void> => {

    try {
        const response = await axios.get<{sprints : ISprint[]}>(API_URL_SPRINT)

        const sprintsActualizados = response.data.sprints.filter( (sprint) => sprint.id !== idSprint)

        await axios.put(API_URL_SPRINT , {sprints : sprintsActualizados})
        
    } catch (error) {
        
        console.log("Error en el deleteSprintById" , error)
        throw error
    }
}