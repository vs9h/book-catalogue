import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Button, Input, Modal, PasswordInput,
} from "@skbkontur/react-ui";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

interface ILogInModal{
    onClose():void;
}

export const LogInModal:React.FC<ILogInModal> = observer(({ onClose }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  // const QUERY_TRY_LOGIN = gql`
  //       mutation TryLogIn($login:String!, $password:String!){
  //          logIn(login:$login, password:$password){
  //            id
  //            login
  //            avatar
  //          }
  //        }
  //   `;
  // const [tryLogIn] = useMutation<Mutation>(QUERY_TRY_LOGIN);
  const onSubmit = () => {
    // const promise = tryLogIn({ variables: { login, password } });
    // promise.then((result) => {
    //   if (result && result.data && result.data.logIn) {
    //     localStorage.setItem("userID", result.data.logIn.id);
    //     onClose();
    //     document.location.reload();
    //   }
    // }).catch(() => alert("Шо-то не так пошло."));
  };
  useEffect(() => {
    setIsDisabled(!(login.length > 4 && password.length > 4));
  }, [login, password]);
  return (
    <Modal width="360px" onClose={onClose}>
      <Modal.Header sticky={false}>
        <div style={{ color: "black" }}>LOGIN</div>
      </Modal.Header>
      <Modal.Body>
        <p style={{
          display: "flex",
          justifyContent: "center",
          color: "grey",
        }}
        >
          Signing up will give you access to quick translations of new words in texts, videos, and audio recordings.
        </p>
        <div style={{
          height: "80px", display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px", flexDirection: "column",
        }}
        >
          <Input
            placeholder="Login"
            onValueChange={(value) => (setLogin(value))}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
            type="text"
            width="290px"
          />
          <PasswordInput
            placeholder="Password"
            width="290px"
            detectCapsLock
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
            onValueChange={(value) => (setPassword(value))}
            onSubmit={onSubmit}
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
            LOGIN
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
});
