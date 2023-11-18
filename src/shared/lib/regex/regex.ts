export const isEmailValid = (email?: string) => {
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    return false;
};

export const isUsernameValid = (username?: string) => {
    if (username) {
        const usernameRegex = /^[a-zA-Z]{3}[^0-9]*$/;
        return usernameRegex.test(username);
    }
    return false;
};
