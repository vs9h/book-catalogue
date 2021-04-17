import React from "react";
import {
  BrowserRouter as Router, Switch, Route,
} from "react-router-dom";
import {
  ApolloClient, ApolloProvider, InMemoryCache,
} from "@apollo/client";
import { Header } from "./components/StaticTopbar/header";
import { BookListPage } from "./components/CollectionCardList/bookListPage";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

export const App = () => (
  <ApolloProvider client={client}>
    <Content />
  </ApolloProvider>
);

export const Content = () => (
  <Router>
    <div className="intro">
      <Header />
      <div className="intro_inner">
        <Switch>
          <Route path="/catalogue">
            <BookListPage />
          </Route>
          <Route path="/" exact>
            <div style={{ color: "white" }}>Home c:</div>
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
);
