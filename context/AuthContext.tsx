"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type User = {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
};

type SavedAccount = User & {
  password: string;
};

type AuthContextType = {
  user: User | null;

  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => boolean;

  login: (
    email: string,
    password: string
  ) => boolean;

  logout: () => void;
};

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  /* LOAD LOGGED IN USER */
  useEffect(() => {
    const savedUser = localStorage.getItem(
      "freshProduceLoggedInUser"
    );

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem(
          "freshProduceLoggedInUser"
        );
      }
    }
  }, []);

  /* REGISTER */
  const register = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    const cleanEmail = email.trim().toLowerCase();

    const newUser: SavedAccount = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),

      name: `${firstName.trim()} ${lastName.trim()}`,

      email: cleanEmail,
      password,
    };

    /* SAVE ACCOUNT */
    localStorage.setItem(
      "freshProduceUser",
      JSON.stringify(newUser)
    );

    /* REMOVE PASSWORD BEFORE SAVING SESSION */
    const loggedInUser: User = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      name: newUser.name,
      email: newUser.email,
    };

    localStorage.setItem(
      "freshProduceLoggedInUser",
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return true;
  };

  /* LOGIN */
  const login = (
    email: string,
    password: string
  ) => {
    const savedAccount = localStorage.getItem(
      "freshProduceUser"
    );

    if (!savedAccount) {
      return false;
    }

    try {
      const account: SavedAccount =
        JSON.parse(savedAccount);

      const cleanEmail = email.trim().toLowerCase();

      if (
        account.email.toLowerCase() === cleanEmail &&
        account.password === password
      ) {
        const loggedInUser: User = {
          firstName: account.firstName,
          lastName: account.lastName,

          name:
            account.name ||
            `${account.firstName} ${account.lastName}`,

          email: account.email,
        };

        localStorage.setItem(
          "freshProduceLoggedInUser",
          JSON.stringify(loggedInUser)
        );

        setUser(loggedInUser);

        return true;
      }

      return false;
    } catch {
      return false;
    }
  };

  /* LOGOUT */
  const logout = () => {
    localStorage.removeItem(
      "freshProduceLoggedInUser"
    );

    localStorage.removeItem(
      "freshProduceLoggedIn"
    );

    localStorage.removeItem(
      "freshProduceRememberMe"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}