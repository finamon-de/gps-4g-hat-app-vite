export interface Device {
    id: string,
    imei: string,
    ip: string,
    inputs: number,
    outputs: number,
    led: number,
    button: number,
    owner: string,
    lastContact: Date,
    positions: Array<string>,
    accSensorData: Array<string>,
}