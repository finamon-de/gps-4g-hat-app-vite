import { Device } from "../models/Device"

export const apiResponseToDevice = (response: any): Device => {
    return {
        id: response._id,
        imei: response.imei,
        ip: response.ip,
        inputs: response.inputs,
        outputs: response.outputs,
        led: response.led,
        button: response.button,
        owner: response.owner,
        lastContact: response.lastContact ? new Date(response.lastContact) : new Date(0),
        positions: response.positions,
        accSensorData: response.acc_sensor_data,
    }
}