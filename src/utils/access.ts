import { getCookie } from './storage';

export const hasLoginAccess = (cookieName: 'isAdminLoggedIn'): boolean => getCookie(cookieName) === 'true';
