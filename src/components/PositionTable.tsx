import { Table } from "react-bootstrap"
import { Position } from "../data/models/Position"

export const PositionTable = (props: any) => {

    const { positions } = props

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>id</th>
                    <th>latitude</th>
                    <th>longitude</th>
                    <th>altitude</th>
                    <th>utc</th>
                    <th>date</th>
                </tr>
            </thead>
            <tbody>
                { 
                    positions.map((position: Position, index: number) => {
                        return (
                            <tr key={`tr-${index}`}>
                                <td>{index}</td>
                                <td>{position.id}</td>
                                <td>{position.latitude}</td>
                                <td>{position.longitude}</td>
                                <td>{position.altitude}</td>
                                <td>{position.utc}</td>
                                <td>{new Date(position.utc).toUTCString()}</td>
                            </tr>
                        )
                    }) 
                }
            </tbody>
        </Table>
    )
}