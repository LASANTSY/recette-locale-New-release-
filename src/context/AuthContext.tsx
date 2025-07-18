import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('access_token') || null;
  });

  const [user, setUser] = useState(() => {
    const savedToken = localStorage.getItem('access_token');
    if (savedToken) {
      try {
        return jwtDecode(savedToken);
      } catch (err) {
        console.error("Token invalide :", err);
        return null;
      }
    }
    return null;
  });

  const [allDataUser, setAllDataUser] = useState({})

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);

        fetch(`${apiURL.apiUrlCitoyen}/citizens/byEmail`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body:JSON.stringify({email: decodedUser.user_email})
        })
        .then(res => res.json())
        .then(res => {
          if(res.message == "Citizen found")
            setAllDataUser(res?.data)
          else
            toast.error("Erreur de recuperation donnees utilisateur")
        })
      } catch (err) {
        console.error("Échec du décodage du token :", err);
        setUser(null);
        setToken(null);
        localStorage.removeItem('access_token');
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (tokenData) => {
    setToken(tokenData);
    localStorage.setItem('access_token', tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAllDataUser({})
    localStorage.removeItem('access_token');
  };

  return (
    <AuthContext.Provider value={{ user, allDataUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
