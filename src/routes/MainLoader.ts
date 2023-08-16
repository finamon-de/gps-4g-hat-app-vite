import { redirect } from 'react-router';
import { isUserLoggedIn } from '../data/storage/CookieManager';

/**
 * Main loader.
 * Handles data loading for the main route and necessary redirects.
 */
export const mainLoader = async ({ request, params }: any) => {
    // const url = new URL(request.url)

    // This should be synchronized with the server
    // to check if there exists actually a valid session.

    if (!isUserLoggedIn()) {
        return redirect('/login');
    }
    return null;
};
