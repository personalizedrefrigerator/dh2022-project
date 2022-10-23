import { useEffect, useMemo, useState } from "react";

const tokenKey = 'token';

type TokenChangedListener = (newToken: string|null)=>void;

const tokenChangedListeners: Record<string, TokenChangedListener> = {};

export const getToken = (): string|null => {
    return localStorage.getItem(tokenKey) ?? null;
};

export const setToken = (token: string|null) => {
    if (token !== null) {
        localStorage.setItem(tokenKey, token);
    }
    else {
        localStorage.removeItem(tokenKey);
    }

    for (const key in tokenChangedListeners) {
        tokenChangedListeners[key](token);
    }
};

let lastKey = 0;
const addTokenChangedListener = (listener: TokenChangedListener) => {
    lastKey ++;
    const key = `tokenListener${lastKey}`;
    tokenChangedListeners[key] = listener;

    return {
        // Remove the listener
        remove: () => {
            delete tokenChangedListeners[key];
        },
    };
};

export const useToken = () => {
    const [ token, setToken ] = useState<string|null>(getToken());
    
    useEffect(() => {
        const listener = addTokenChangedListener((newToken) => {
            setToken(newToken);
        });

        return () => {
            listener.remove();
        };
    }, [setToken]);

    return token;
};
