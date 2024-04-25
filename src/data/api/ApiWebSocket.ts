import {io, Socket} from "socket.io-client";
import { Position } from "../models/Position";

export const ApiWebSocket = () => {

    const url = import.meta.env.REACT_APP_SOCKET_URL || ""
    let devicePositionCallback : ((position: Position) => void) | null
    let deviceInfoCallback: ((data: unknown) => void) | null 
    let deviceAccSensorCallback: ((data: unknown) => void) | null
    let deviceCustomSensorCallback: ((data: unknown) => void) | null
    let socket: Socket

    const _isFunction = (fn: any): boolean => typeof fn === 'function'

    const _connect = (userId: string, connectCb: () => void) => {
        socket = io(url, {
            query: {
                userId: userId
            }
        })

        socket.on("connect", () => {
            console.log("Connected", socket.id)
            if (_isFunction(connectCb)) {
                connectCb()
            }
        })

        socket.on('positions', function(data) {
            if (_isFunction(devicePositionCallback) && devicePositionCallback !== null) {
                devicePositionCallback(data)
            }
        })

        socket.on('exception', function(data) {
            console.warn('web socket exception event', data);
        })

        socket.on('disconnect', function() {
            console.log('Disconnected');
        })
    }

    const _connected = () => {
        if (!socket) return false

        try {
            return socket.connected
        } catch (e) {
            console.error(e)
        }
        return false
    }

    const _disconnect = async () => {
        if (!socket) return

        try {
            await socket.disconnect()
        } catch (e) {
            console.error(e)
        }
    }

    const _addPositionCallback = (fn: (position: Position) => void) => {
        devicePositionCallback = fn
    }

    const _removePositionCallback = () => {
        devicePositionCallback = null
    }

    const _addDeviceInfoCallback = (fn: (data: unknown) => void) => {
        if (!_isFunction(fn)) {
            console.log('Passed parameter is not a function and will not be set')
            return
        }
        deviceInfoCallback = fn
    }

    const _removeDeviceInfoCallback = () => {
        deviceInfoCallback = null
    }

    const _addDeviceAccSensorCallback = (fn: (data: unknown) => void) => {
        if (!_isFunction(fn)) {
            console.log('Passed parameter is not a function and will not be set')
            return
        }
        deviceAccSensorCallback = fn
    }

    const _removeDeviceAccSensorCallback = () => {
        deviceAccSensorCallback = null
    }

    const _addDeviceCustomSensorCallback = (fn: (data: unknown) => void) => {
        if (!_isFunction(fn)) {
            console.log('Passed parameter is not a function and will not be set')
            return
        }
        deviceCustomSensorCallback = fn
    }

    const _removeDeviceCustomSensorCallback = () => {
        deviceCustomSensorCallback = null
    }

    return Object.freeze({
        connect: _connect,
        connected: _connected,
        disconnect: _disconnect,
        setPositionCallback: _addPositionCallback,
        removePositionCallback: _removePositionCallback,
        setDeviceInfoCallback: _addDeviceInfoCallback,
        removeDeviceInfoCallback: _removeDeviceInfoCallback,
        setDeviceAccSensorCallback: _addDeviceAccSensorCallback,
        removeDeviceAccSensorCallback: _removeDeviceAccSensorCallback,
        setDeviceCustomSensorCallback: _addDeviceCustomSensorCallback,
        removeDeviceCustomSensorCallback: _removeDeviceCustomSensorCallback
    })
}