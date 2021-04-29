import React, { useEffect, useState } from "react";
import {
  Button, Input, Modal,
} from "@skbkontur/react-ui";
// import { useMutation } from "@apollo/client";
// import gql from "graphql-tag";

interface IAddWordModal{
    onClose():void;
    refetch(): void;
    collectionId: string;
}

export const AddBookModal:React.FC<IAddWordModal> = (({ onClose, refetch, collectionId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  // const ADD_CART_TO_COLLECTION = gql`
  //       mutation AddCardToCollection($collectionId: ID!, $title:String!, $description:String){
  //           addCard(collectionId:$collectionId, title:$title, description:$description){
  //               id
  //               title
  //               description
  //           }
  //       }
  //   `;
  // const [addWordToCollection] = useMutation(ADD_CART_TO_COLLECTION);
  const onSubmit = () => {
    // const promise = addWordToCollection({ variables: { title, description, collectionId } });
    // promise.then(refetch);
    onClose();
  };
  useEffect(() => {
    setIsDisabled(!(title.length > 4 && description.length > 4));
  }, [title, description]);
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
                onSubmit();
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
                onSubmit();
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
              onSubmit();
            }}
          >
            ADD WORD
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
});
