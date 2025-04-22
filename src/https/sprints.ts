import axios from 'axios'
import { ISprint } from '../types/ISprints'
import {config} from "../config/config"

// URL de la API para obtener y modificar los sprints
const API_URL_SPRINT=config.PortSprintList

// Función para obtener todos los sprints desde la API
export const getAllSprint = async (): Promise<ISprint[]> => {
    try {
        // Realiza una solicitud GET para obtener todos los sprints
        const response = await axios.get<{sprints : ISprint[]}>(API_URL_SPRINT)
        return response.data.sprints
    } catch (error) {
        console.log("Error en el getAllSprints", error)
        throw error // Lanza el error para que pueda ser manejado por el llamador
    }
} 

// Función para agregar un nuevo sprint
export const postNuevoSprint = async (nuevoSprint : ISprint): Promise<void> => {
    try {
        // Obtiene todos los sprints actuales
        const response = await axios.get<{sprints : ISprint[]}>(API_URL_SPRINT)
        
        // Agrega el nuevo sprint a la lista de sprints existentes
        const sprintsActualizados = [...response.data.sprints, nuevoSprint]
        
        // Realiza una solicitud PUT para actualizar la lista de sprints en la API
        await axios.put(API_URL_SPRINT , {sprints : sprintsActualizados} )

    } catch (error) {
        console.log("Error en el postNuevoSprint", error)
        throw error // Lanza el error para que pueda ser manejado por el llamador
    }
}

// Función para editar un sprint existente
export const editSprint = async (idSprint : string , sprintEditado : Partial<ISprint>): Promise<void> => {
    try {
        // Obtiene todos los sprints actuales
        const response = await axios.get<{ sprints: ISprint[] }>(API_URL_SPRINT);

        // Actualiza el sprint correspondiente según su id
        const sprintActualizados = response.data.sprints.map((sprint) =>
            sprint.id === idSprint ? { ...sprint, ...sprintEditado } : sprint
        );

        // Realiza una solicitud PUT para actualizar el sprint en la API
        await axios.put(API_URL_SPRINT , {sprints : sprintActualizados})

    } catch (error) {
        console.log("Error en el editSprint", error)
        throw error // Lanza el error para que pueda ser manejado por el llamador
    }
}

// Función para eliminar un sprint por su id
export const deleteSprintById = async (idSprint : string): Promise<void> => {
    try {
        // Obtiene todos los sprints actuales
        const response = await axios.get<{sprints : ISprint[]}>(API_URL_SPRINT)

        // Filtra el sprint que se va a eliminar
        const sprintsActualizados = response.data.sprints.filter( (sprint) => sprint.id !== idSprint)

        // Realiza una solicitud PUT para actualizar la lista de sprints en la API
        await axios.put(API_URL_SPRINT , {sprints : sprintsActualizados})
        
    } catch (error) {
        console.log("Error en el deleteSprintById", error)
        throw error // Lanza el error para que pueda ser manejado por el llamador
    }
}
