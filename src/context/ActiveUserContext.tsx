import { createContext, useContext, useState } from 'react';

interface ActiveUser {
  CreatedTime: Date;
  Email: string;
  Id: number;
  Username: string;
}

const ActiveUserContext = createContext<ActiveUser | null>(null);
// eslint-disable-next-line no-unused-vars
const ActiveUserUpdateContext = createContext(null as unknown as (data: ActiveUser | null) => void);

const ActiveUserProvider = ({ children }: any) => {
  const [activeUser, setActiveUser] = useState<ActiveUser | null>(null);

  const setActiveUserHandler = (data: ActiveUser | null): void => {
    setActiveUser(data);
  };

  return (
    <ActiveUserContext.Provider value={activeUser}>
      <ActiveUserUpdateContext.Provider value={setActiveUserHandler}>
        {children}
      </ActiveUserUpdateContext.Provider>
    </ActiveUserContext.Provider>
  );
};

const useActiveUser = () => useContext(ActiveUserContext);
const useActiveUserUpdate = () => useContext(ActiveUserUpdateContext);

export {
  ActiveUserProvider,
  useActiveUser,
  useActiveUserUpdate,
};

export type { ActiveUser };
