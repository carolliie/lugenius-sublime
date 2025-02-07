export type Procedure = {
    id: string;
    name: string;
    price: number;
  };
  
  export type BodyArea = {
    id: string;
    name: string;
    procedures: Procedure[];
  };
  