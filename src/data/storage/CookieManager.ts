/**
 * Set a cookie when a user logged in successfully.
 * @param id User id,
 * @param lifetime Cookie lifetime
 */
export const setLoginCookie = (id: string, lifetime: number) => {
    const now = new Date();
    const expireTime = now.getTime() + lifetime;
    now.setTime(expireTime);
    const cookieStr = `isLoggedIn=${id};expires=${now.toUTCString()};path=/;secure`;
    console.log(cookieStr);
    document.cookie = cookieStr;
};

/**
 * Remove a set login in cookie.
 * "Remove" in this case means to disable/reset it.
 */
export const removeLoginCookie = async () => {
    document.cookie = 'isLoggedIn=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;secure';
};

/**
 * Get the id of a signed in user.
 * @returns {string|undefined}
 */
export const getUserId = (): string | undefined => {
    let result = undefined;
    const filtered = document.cookie.split(';').filter((item) => item.includes('isLoggedIn'));
    if (filtered.length > 0) {
        const split = filtered[0].split('=');
        if (split.length === 2) {
            result = split[1] ?? result;
        }
    }
    return result;
};

/**
 * Check if a user is currently logged in.
 * @returns {boolean}
 */
export const isUserLoggedIn = (): boolean => {
    return !!getUserId();
};
