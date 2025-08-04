export interface Proyecto {
  id?: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
  };
  tareas?: any[];
}
