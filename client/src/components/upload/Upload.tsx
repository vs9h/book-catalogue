import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { filesQuery } from "./FileList";

const uploadFileMutation = gql`
    mutation uploadFile($file: Upload!){
      singleUpload(file: $file){
        filename
        id
        path
        mimetype
      }
    }
`;

export const Upload = () => {
  const [uploadFile] = useMutation(uploadFileMutation, {
    refetchQueries: [{ query: filesQuery }],
  });
  const onDrop = useCallback(([file]) => {
    uploadFile({ variables: { file } });
  }, [uploadFile]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p style={{ color: "white" }}>Drop the files here ...</p>
      ) : (
        <p style={{ color: "white" }}>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};
