export type Procedure = {
    id: string;
    name: string;
    price: number;
    area?: string;
  };
  
  export type BodyArea = {
    id: string;
    name: string;
    procedures: Procedure[];
  };
  