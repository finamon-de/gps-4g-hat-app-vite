import { Position } from "../data/models/Position";

export interface PositionContainer {
    imei: string,
    id: string,
    positions: Position[]
}