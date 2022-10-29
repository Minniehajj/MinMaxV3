import React from "react";

export type BodyProps = {
  children: React.ReactNode;  
  nodeType?: string;
  data?: {
    uri?: string;
  };
  value?: string;
  content?: {
    value?: string;
  }[];
};
