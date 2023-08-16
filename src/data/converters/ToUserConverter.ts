import { User } from "../models/User";

export const apiResponseToUser = (response: any): User => {
    return {
        id: response._id,
        firstname: response.firstname,
        lastname: response.lastname,
        email: response.email,
        password: response.password,
        created: response.created,
        updated: response.updated,
        devices: response.devices ?? []
    }
}