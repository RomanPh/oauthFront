export function checkToken () {
    const cookies = document.cookie;
    return cookies.includes('session');
}