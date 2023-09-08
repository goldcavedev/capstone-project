export const isAuth = () => {
    const session = localStorage.getItem("session");
    if (session) {
        return true;
    }
    return false;
};