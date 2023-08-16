import { apiResponseToUser } from '../converters/ToUserConverter';
import { User } from '../models/User';
import { removeLoginCookie, setLoginCookie } from '../storage/CookieManager';

export const UserApi = () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const cookieLife = 1000 * 84600; // 1 day in ms

    /**
     * Create a new user account.
     * On success the user will be directly marked as 'logged in'.
     * @param {any} data
     * @returns {Promise<User|undefined>} Account request result
     */
    const _createAccount = async (data: any): Promise<User | undefined> => {
        const url = `${baseUrl}/users`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
                return undefined;
            });

        if (!response) {
            return response;
        }

        const result = apiResponseToUser(response);
        setLoginCookie(result.id, cookieLife);
        return result;
    };

    /**
     * Perform a login attempt for the given credentials.
     * @param {string} username
     * @param {string} password
     * @returns {Promise<User>} Login request result
     */
    const _login = async (username: string, password: string): Promise<User> => {
        console.warn('[GPS 4G HAT APP] Not implemented on API-side! Fake data is used.');
        console.log('[GPS 4G HAT APP] Login attempt using', username, password);

        const fakeUser = {
            _id: '62bf08378d0a8a16201ef153',
            email: username,
            password: crypto.randomUUID(),
            devices: [],
        };

        const result = apiResponseToUser(fakeUser);

        // const url = `${baseUrl}/users/login`
        // const result = await fetch(url).then(response => response.json())

        // if successful
        setLoginCookie(result.id, cookieLife);

        return result;
    };

    /**
     * Perform the logout for a user.
     * Even if the network request fails, the corresponding cookie is cleared.
     * @param {string} userId A user's id
     * @returns {Promise<any>} Logout request result.
     */
    const _logout = async (userId?: string): Promise<any> => {
        console.warn('Not implemented on API-side!');

        if (!userId) {
            removeLoginCookie();
            return new Promise(() => {
                console.log('[GPS 4G HAT APP] No user id present');
            });
        }

        const url = `${baseUrl}/users/logout?userId=${userId}`;
        const result = await fetch(url)
            .then((response) => response.json())
            .catch((e) => {
                console.error('Logout failed', e);
            })
            .finally(() => removeLoginCookie()); // anyway

        return result;
    };

    return Object.freeze({
        createAccount: _createAccount,
        login: _login,
        logout: _logout,
    });
};
