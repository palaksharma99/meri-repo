import api from "./api";


//register

export const register= async (username,passowrd) => {
    return await api.post("/auth/register",{
        username,
        password,
    });
};

//loginUser

export const loginUser= async (username,passowrd) => {
    return await api.post("/auth/login",{
        username,
        password,
    },
    {
        withCredentials: true,
    }
    );
};

// status

export const authStatus= async () => {
    return await api.get("/auth/status",
    {
        withCredentials: true,
    }
    );
};

// logoutUser

export const logoutUser= async () => {
    return await api.post(
        "/auth/logout",
        {},
        {
            withCredentials: true,
        }
    );
};

//Setup2FA

export const Setup2FA= async () => {
    return await api.post(
        "/auth/2fa/setup",
        {},
        {
            withCredentials: true,
        }
    );
};

//verify2f credentials

export const verify2FA= async () => {
    return await api.post(
        "/auth/2fa/verify",
        {token},
        {
            withCredentials: true,
        }
    );
};


// reset 2 fa 

export const reset2FA= async () => {
    return await api.post(
        "/auth/2fa/reset",
        {},
        {
            withCredentials: true,
        }
    );
};