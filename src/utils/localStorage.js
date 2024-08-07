export const isUserLoggedIn = () => {
    return localStorage.getItem('userData') !== null;
};

export const saveUserData = (userData, token) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('token', token);
};