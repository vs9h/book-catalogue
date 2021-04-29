import React from "react";
import "./collectionPage.css";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import { Error } from "../Utils/Error";
import { BookPage } from "./collectionListView";
import { GetAllBooks } from "../../generated/GetAllBooks";
import { BookCardItem, CreateBookCardItem } from "./collectionCardListView";
import { Loading } from "../Utils/Loading";

export const GET_All_BOOKS = gql`
  query GetAllBooks{
  allBooks{
  isbn
  name
  orig_isbn
  volume
  authors{
    surname
    firstname
  }
  annotation
  year
  type
  categories
  edition
  image{
      id
      filename
    }
  }
}
`;
export const BookListPage = observer(() => {
  // const { user } = useContext(UserContext);
  // if (!user.userID) {
  //   return (<div>Вы не авторизованы</div>);
  // }
  const {
    data, error, refetch, loading,
  } = useQuery<GetAllBooks>(GET_All_BOOKS);
  if (error) {
    return <Error />;
  }
  return (
    <div>
      <Switch>
        <Route exact path="/catalogue">
          <div className="catalogueMain">
            <div style={{ display: "flex", flexFlow: "row nowrap", alignItems: "center" }}>
              <div className="logo">
                Books in library
              </div>
              <CreateBookCardItem refetch={refetch} />
            </div>
            <div className="main-inner">
              { loading ? <Loading /> : data && data.allBooks && data.allBooks.map(
                (book) => <BookCardItem key={book!.isbn} book={book!} />,
              ) }
            </div>
          </div>
        </Route>
        <Route path="/catalogue/book/:isbn">
          <div>
            <BookPage />
          </div>
        </Route>
      </Switch>
    </div>
  );
});
