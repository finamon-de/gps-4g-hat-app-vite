export interface User {
    id: string,
    firstname?: string,
    lastname?: string,
    email: string,
    password: string,
    created?: Date,
    updated?: Date,
    devices: Array<string>
}