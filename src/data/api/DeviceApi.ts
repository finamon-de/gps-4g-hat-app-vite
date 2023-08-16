import { apiResponseToDevice } from '../converters/ToDeviceConverter';
import { apiResponseToPosition } from '../converters/ToPositionConverter';
import { Device } from '../models/Device';
import { Position } from '../models/Position';

export const DeviceApi = () => {
    const baseUrl = import.meta.env.VITE_API_URL;

    /**
     * Load user devices.
     * @param {string} userId
     * @returns {Promise<Array<Device>>}
     */
    const _loadDevicesForUser = async (userId: string): Promise<Array<Device>> => {
        const url = `${baseUrl}/devices?userId=${userId}`;

        const response = await fetch(url)
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
                return [];
            });

        const result = response.map((value: any) => apiResponseToDevice(value));

        return result;
    };

    /**
     * Load positions for certain device.
     * @param {string} deviceId
     * @returns {Promise<Array<Position>>}
     */
    const _loadPositionsForDevice = async (deviceId: string): Promise<Array<Position>> => {
        const url = `${baseUrl}/positions?deviceId=${deviceId}`;

        const response = await fetch(url)
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
                return [];
            });

        const result = response.map((value: any) => apiResponseToPosition(value));

        return result;
    };

    /**
     * Load last know position for a certain device.
     * @param {string} deviceId
     * @returns {Promise<Array<Position>>}
     */
    const _loadLatestPositionForDevice = async (deviceId: string): Promise<Array<Position>> => {
        const url = `${baseUrl}/positions/latest?deviceId=${deviceId}`;

        const response = await fetch(url)
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
                return [];
            });

        const result = response.map((value: any) => apiResponseToPosition(value));

        return result;
    };

    /**
     * Add a new device.
     * @param {any} data
     * @returns {Promise<Device|undefined>}
     */
    const _addDevice = async (data: any): Promise<Device | undefined> => {
        const url = `${baseUrl}/devices`;

        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: data,
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
                return undefined;
            });

        return result;
    };

    /**
     * Remove a device
     * @param {string} deviceId
     * @param {string} userId
     * @returns {Promise<Device|undefined>}
     */
    const _removeDevice = async (deviceId = '', userId = ''): Promise<Device | undefined> => {
        const url = `${baseUrl}/devices/${deviceId}?userId=${userId}`;

        const result = await fetch(url, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
                return undefined;
            });

        return result;
    };

    return Object.freeze({
        addDevice: _addDevice,
        loadDevicesForUser: _loadDevicesForUser,
        loadPositionsForDevice: _loadPositionsForDevice,
        loadLastestPositionForDevice: _loadLatestPositionForDevice,
        removeDevice: _removeDevice,
    });
};
