import React from "react";

export const Error:React.FC = ({ children }) => (
  <div className="error">{children || "Something went wrong"}</div>
);
