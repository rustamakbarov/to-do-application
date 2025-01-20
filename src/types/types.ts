export interface User {
  name: string;
  email: string;
  id: string;
}

export interface Tasks {
  tasks: Array<object>;
}

export interface ID {
  id: string;
}

export interface Open {
  id: string;
  task: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
