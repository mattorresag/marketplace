import { createContext } from "react";
import { Company, User } from "../../interfaces/User";
interface AuthContextType {
  user: User | null;
  handleSetUser: (user: User) => void;
  selectedCompany: Company | null;
  handleSetSelectedCompany: (company: Company | null) => void;
  handleLogin: ({
    token,
    clients,
  }: {
    token: string;
    clients: any[];
  }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  handleLogin: () => new Promise(() => {}),
  handleSetUser: () => {},
  logout: () => {},
  selectedCompany: {} as Company,
  handleSetSelectedCompany: () => {},
});
