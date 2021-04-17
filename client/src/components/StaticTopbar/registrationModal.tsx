import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Button, Input, Modal, PasswordInput,
} from "@skbkontur/react-ui";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

interface IRegistrationModal{
    onClose():void;
}

export const RegistrationModal:React.FC<IRegistrationModal> = observer(({ onClose }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  // const MUTATION_SIGN_UP = gql`
  //   mutation TrySignUp($email:String!, $login:String!, $password:String!){
  //     signUp(email:$email, login:$login, password:$password){
  //       id
  //       login
  //       avatar
  //       email
  //     }
  //   }
  // `;
  // const [trySignUp] = useMutation<Mutation>(MUTATION_SIGN_UP);
  const onSubmit = () => {
    if (login && email && password) {
      onClose();
      // const promise = trySignUp({ variables: { login, password, email } });
      // promise.then((result) => {
      //   if (result && result.data && result.data.signUp) {
      //     localStorage.setItem("userID", result.data.signUp.id);
      //     document.location.reload();
      //   }
      // }).catch(() => alert("Ошибочка вышла, хех."));
    }
  };
  useEffect(() => {
    setIsDisabled(!(login.length > 4 && (email.length && email.indexOf(".") - email.indexOf(("@")) !== 1 && email.indexOf("@") !== -1 && email.indexOf(".") !== -1) && password.length > 4));
  }, [login, email, password, isDisabled]);
  return (
    <Modal width="360px" onClose={onClose}>
      <Modal.Header sticky><div style={{ color: "black" }}>Registration</div></Modal.Header>
      <Modal.Body>
        <p style={{ textIndent: "1.5em", margin: "2px 0", color: "grey" }}>
          Signing up will give you access to quick translations of new words in texts, videos,
          and audio recordings.
        </p>
        <span style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "16px",
          fontWeight: (460),
          paddingTop: "12px",
          color: "white",
        }}
        >
          SIGNUP
        </span>
        <div style={{
          height: "120px", display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px", flexDirection: "column",
        }}
        >
          <Input
            placeholder="E-mail"
            onValueChange={(value) => (setEmail(value))}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
            type="text"
            width="290px"
          />
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
            CREATE ACCOUNT
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
});
