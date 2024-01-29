const getCookie = (name) => {
    const value = document.cookie
    console.log(value);
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

export const getToken = () => {
    return getCookie('access_token');
};