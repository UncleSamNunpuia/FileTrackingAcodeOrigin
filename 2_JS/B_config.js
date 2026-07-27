export const GAS_URL = "https://script.google.com/macros/s/AKfycbybot_jsane8OaXdYBSyoROy14s2NrTw6rj_Cmv3JszHjKbe7kp7vxVeilMe5xc17eLig/exec";
const token = sessionStorage.getItem("auth_token");

export function getToken() {
    return sessionStorage.getItem("auth_token");
}