import { Position } from "../models/Position";

export const apiResponseToPosition = (response: any): Position => {
    return {
        id: response._id,
        latitude: response.latitude,
        longitude: response.longitude,
        altitude: response.altitude,
        utc: response.utc,
        device: response.device,
    }
}