export type BodyProps = {
  children: string;  
  nodeType?: string;
  data?: {
    uri?: string;
  };
  value: string;
  content: {
    value: string;
  }[];
};
