import { UserApi } from '../data/api/UserApi';
import { getUserId } from '../data/storage/CookieManager';

export const loginLoader = ({ request, params }: any) => {
    const api = UserApi();
    api.logout(getUserId() ?? '');
    return null;
};
