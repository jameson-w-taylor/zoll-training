import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { useAuthInterceptor } from '../core/session';
import { Tea } from '../shared/models';

const images: string[] = ['green', 'black', 'herbal', 'oolong', 'dark', 'puer', 'white', 'yellow'];

export const TeaContext = createContext<{
  teas: Tea[];
  getTeas: () => Promise<void>;
}>({
  teas: [],
  getTeas: () => {
    throw new Error('Method not implemented');
  },
});

export const TeaProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { api } = useAuthInterceptor();
  const [teas, setTeas] = useState<Tea[]>([]);

  const getTeas = async () => {
    const { data } = await api.get('/tea-categories');
    const teas = data.map((tea: Tea) => ({ ...tea, image: require(`../assets/images/${images[tea.id - 1]}.jpg`) }));
    setTeas(teas);
  };

  return <TeaContext.Provider value={{ teas, getTeas }}>{children}</TeaContext.Provider>;
};

export const useTea = () => {
  const { teas, getTeas } = useContext(TeaContext);

  if (teas === undefined) {
    throw new Error('useTea must be used within a TeaProvider');
  }

  return { teas, getTeas };
};
