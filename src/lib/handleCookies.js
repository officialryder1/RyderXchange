
export function setCookie(name, value, days) {
    let expires = "";
    if(days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = document.cookie = `${name}=${value || ""}${expires}; path=/; Secure; HttpOnly; SameSite=Strict`;
}
export function deleteCookie(name) {
    document.cookie = name + "=; Max-Age=0; path=/; Secure; HttpOnly; SameSite=Strict";
}