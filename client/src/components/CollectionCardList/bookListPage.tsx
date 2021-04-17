import React from "react";
import "./collectionPage.css";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import { Error } from "../Utils/Error";
import { CollectionPage } from "./collectionListView";
import { GetAllBooks } from "../../generated/GetAllBooks";
import { BookCardItem, CollectionCardList, CreateBookCardItem } from "./collectionCardListView";
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
              <div style={{ display: "flex", flexFlow: "row nowrap", alignItems: "center" }}>
                <div className="logo">
                  Books in library
                </div>
                <CreateBookCardItem refetch={refetch} />
              </div>
              {/* <CreateCollectionCardItem refetch={refetch} /> */}
            </div>
            <div className="main-inner">
              { loading ? <Loading /> : data && data.allBooks && data.allBooks.map(
                (book) => {
                  if (book) {
                    return <BookCardItem key={book.isbn} book={book} />;
                  }
                },
              ) }
            </div>
          </div>
          {/* <div className="catalogueMain"> */}
          {/*  <div> */}
          {/*    { data && <CollectionCardList books={data.allBooks!} refetch={() => refetch()} />} */}
          {/*  </div> */}
          {/* </div> */}
        </Route>
        <Route path="/catalogue/book/:id">
          <div className="catalogueMain">
            <CollectionPage />
          </div>
        </Route>
      </Switch>
    </div>
  );
});
