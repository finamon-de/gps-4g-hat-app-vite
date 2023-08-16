import { useState } from "react"
import { Stack, Dropdown } from "react-bootstrap"
import { Device } from "../data/models/Device"

export const DeviceDropdown = (props: any) => {

    const { devices, onSelect } = props

    const [selectedDevice, setSelectedDevice] = useState<Device>()

    const handleDropdownSelect = (eventKey: any, event: Object) => {
        if (typeof onSelect === 'function') {
            onSelect(eventKey, event)
        }
        setSelectedDevice(devices[eventKey])
    }

    return (
        <Stack direction="horizontal" gap={3}>
            <Dropdown onSelect={handleDropdownSelect}>
                <Dropdown.Toggle>
                    Select a device
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    { 
                        devices.map((device: Device, index: number) => 
                            <Dropdown.Item key={`dd-pos-${index}`} eventKey={index}>{device.imei}</Dropdown.Item>) 
                    }
                </Dropdown.Menu>
            </Dropdown>

            <div>Currently selected: <span className={'fw-semibold'}>{ selectedDevice?.imei ?? 'none' }</span></div>
        </Stack>
    )
}