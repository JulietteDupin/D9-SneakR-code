const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};

const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }

    const decodedToken = parseJwt(token);
    if (!decodedToken) {
        return null;
    }

    return decodedToken.id;
};

export default getUserIdFromToken;
