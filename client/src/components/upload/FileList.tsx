import gql from "graphql-tag";
import React from "react";
import { useQuery } from "@apollo/client";
import { Files } from "../../generated/Files";

export const filesQuery = gql`
  query Files{
    uploads{
      filename
      mimetype
      id
      path
    }
  }
`;

export const FileList = () => {
  const { data, loading } = useQuery<Files>(filesQuery);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!data) {
    return <div>error</div>;
  }
  return (
    <div>
      {data.uploads.map((file) => (
        <img
          style={{ width: 200 }}
          key={file.id}
          src={`http://localhost:5000/${file.id}-${file.filename}`}
          alt={file.filename}
        />
      ))}
    </div>
  );
};
