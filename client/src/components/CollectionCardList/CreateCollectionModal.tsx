import React, { useContext, useEffect, useState } from "react";
import {
  Button, Input, Modal,
} from "@skbkontur/react-ui";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

interface ICreateCollectionModal{
    onClose():void;
    refetch(): void
}
export const CreateCollectionModal:React.FC<ICreateCollectionModal> = (({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  // const { user } = useContext(UserContext);
  // const QUERY_CREATE_COLLECTION = gql`
  //   mutation CreateCollection($userID: ID!, $title:String!, $description:String!){
  //       createCollection(userID: $userID, title: $title, description: $description){
  //           id
  //           title
  //           description
  //       }
  //   }
  // `;
  // const [createCollection] = useMutation(QUERY_CREATE_COLLECTION);
  // const onSubmit = () => {
  //   //const promise = createCollection({ variables: { userID: user.userID, title, description } });
  //   //promise.then(refetch);
  //   onClose();
  // };
  useEffect(() => {
    setIsDisabled(!(title.length > 4));
  }, [title]);
  return (
    <Modal width="360px" onClose={() => onClose()}>
      <Modal.Header sticky>
        <div style={{ color: "grey" }}>Add new book</div>
      </Modal.Header>
      <Modal.Body>
        <div style={{
          height: "80px", display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px", flexDirection: "column",
        }}
        >
          <Input
            placeholder="Title"
            onValueChange={(value) => (setTitle(value))}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                // onSubmit();
              }
            }}
            type="text"
            width="290px"
          />
          <Input
            placeholder="Description"
            width="290px"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                // onSubmit();
              }
            }}
            onValueChange={(value) => (setDescription(value))}
          />
        </div>
      </Modal.Body>
      <Modal.Footer sticky={false} panel>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            disabled={isDisabled}
            onClick={() => {
              // onSubmit();
            }}
          >
            ADD
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
});
