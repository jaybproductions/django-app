import React, { useEffect, useState } from "react";

function useAuth(username, password) {
  const [authUser, setAuthUser] = useState(null);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };
  useEffect(() => {
    const unsubscribe = fetch("/accounts/auth/token/login", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAuthUser(data);
      });

    return () => unsubscribe();
  }, []);

  return [authUser, setAuthUser];
}

export default useAuth;
