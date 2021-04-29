import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowChevronLeft, Edit, Trash } from "@skbkontur/react-icons";
import { Button, Checkbox } from "@skbkontur/react-ui";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Loading } from "../Utils/Loading";
import { CollectionListTopbar } from "./collectionListTopbar";
import { Error } from "../Utils/Error";
import { GetBookByISBN, GetBookByISBN_book, GetBookByISBNVariables } from "../../generated/GetBookByISBN";

interface ParamTypes {
    isbn:string
}

const GET_BOOK_BY_ISBN = gql`
    query GetBookByISBN($isbn:String!){
        book(isbn:$isbn){
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
    }`;

// Выводит коллекцию
export const BookPage:React.FC = () => {
  const { isbn } = useParams<ParamTypes>();
  const { data, loading } = useQuery<GetBookByISBN, GetBookByISBNVariables>(GET_BOOK_BY_ISBN, { variables: { isbn } });

  if (data && data.book) {
    return (
      <div>
        <div className="catalogueMain">
          <div style={{
            display: "flex", flexWrap: "nowrap", justifyContent: "flex-start", alignItems: "center", paddingBottom: "10px 0",
          }}
          >
            <Link to="/catalogue">
              <ArrowChevronLeft color="white" />
            </Link>
            <div className="logo" style={{ marginLeft: "16px", marginRight: "16px" }}>
              { loading ? <Loading /> : data.book.name || "null"}
            </div>
          </div>
          <BookView book={data.book} />
        </div>
        <div className="catalogueMain">
          <div style={{
            display: "flex", flexWrap: "nowrap", justifyContent: "flex-start", alignItems: "center", paddingBottom: "10px 0",
          }}
          >
            <div className="logo" style={{ marginLeft: "16px", marginRight: "16px" }}>
              Отзывы о книге
            </div>
          </div>
          <Review />
        </div>
      </div>
    );
  }
  return (<Error />);
};

const Review:React.FC = () => (
  <div style={{ color: "white" }}>
    in developing
  </div>
);

const BookView:React.FC<{ book: GetBookByISBN_book}> = ({ book }) => {
  const authors:string[] = book.authors!.map((author) => (
    (` ${author!.surname} ${author!.firstname},`)
  ));
  authors[authors.length - 1] = authors[authors.length - 1].slice(0, -1);
  const categories:string[] = book.categories!.map((category) => (
    (` ${(category!.charAt(0).toUpperCase() + category!.slice(1))},`)
  ));
  if (categories[categories.length - 1]) {
    categories[categories.length - 1] = categories[categories.length - 1].slice(0, -1);
  }
  return (
    <div style={{
      display: "flex", flexFlow: "nowrap row", justifyContent: "space-around", alignItems: "center",
    }}
    >
      <div style={{
        display: "flex", flexGrow: 1, margin: "0 48px", alignItems: "center",
      }}
      >
        { (book.image)
          ? <img className="book-img" src={`http://localhost:5000/${book.image.id}-${book.image.filename}`} alt="Обложка книги" />
          : <img className="book-img" src="http://localhost:5000/tgpA1mvpT-images.png" alt="Обложка книги" />}
      </div>
      <div style={{
        display: "flex", flexDirection: "column", flexGrow: 3, padding: "0 64px",
      }}
      >
        <div className="logo" style={{ marginLeft: "16px", marginRight: "16px", alignSelf: "center" }}>
          Информация о книге
        </div>
        {/* </div> */}
        <div style={{
          display: "flex", flexFlow: "nowrap column", alignItems: "flex-start", paddingLeft: "8px", color: "white",
        }}
        >
          <div style={{ marginBottom: "4px" }}>
            <span style={{ color: "#FFE4B5" }}>Автор(ы):</span>
            {authors}
          </div>

          <div style={{ marginBottom: "4px" }}>
            <span style={{ color: "#FFE4B5" }}>Том:</span>
            {" "}
            {(book.volume) ? book.volume : "1"}
          </div>
          <div style={{ marginBottom: "4px" }}>
            <span style={{ color: "#FFE4B5" }}>Тип книги:</span>
            {` ${(book.type!.charAt(0).toUpperCase() + book.type!.slice(1))}`}
          </div>
          <div style={{ marginBottom: "4px" }}>
            <span style={{ color: "#FFE4B5" }}>Категории:</span>
            {categories}
          </div>
          <div style={{ marginBottom: "4px" }}>
            <span style={{ color: "#FFE4B5" }}>Год издания:</span>
            {" "}
            {book.year}
          </div>
          <div style={{ marginBottom: "4px" }}>
            <span style={{ color: "#FFE4B5" }}>Издательство:</span>
            {" "}
            {book.edition}
          </div>
          <div style={{ marginBottom: "4px" }}>
            <span style={{ color: "#FFE4B5" }}>ISBN:</span>
            {" "}
            {book.isbn}
          </div>
          <div style={{ marginBottom: "4px" }}>
            <span style={{ color: "#FFE4B5" }}>Аннотация:</span>
            {" "}
            {book.annotation}
          </div>
          <div style={{ marginBottom: "4px" }}>
            {
                (book.orig_isbn) ? (
                  <div>
                    <span style={{ color: "#FFE4B5" }}>Оригинал книги:</span>
                    {" "}
                    <Link style={{ color: "grey", textDecorationLine: "underline" }} to={`/catalogue/book/${book.orig_isbn}`}>Оригинал книги</Link>
                  </div>
                ) : <div />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

//
// interface ICollectionListView {
//     cards: any,
//     refetch(): void,
//     collectionId:string
// }
//
// export const CollectionListView:React.FC<ICollectionListView> = ({ cards, refetch, collectionId }) => {
//   const [termSearched, setTermSearched] = useState("");
//   // const MUTATION_DELETE_CARD = gql`
//   //       mutation DeleteCard($collectionId:ID!, $ID:ID!){
//   //           deleteCard(collectionId:$collectionId, id: $ID){
//   //               id
//   //               title
//   //               description
//   //           }
//   //       }
//   //   `;
//   // const [deleteCard] = useMutation(MUTATION_DELETE_CARD);
//   const onRemove = (collectionID:String, ID:String) => {
//     // const promise = deleteCard({ variables: { collectionId: collectionID, ID } });
//     // promise.then(refetch);
//   };
//   return (
//     <>
//       <CollectionListTopbar
//         termSearched={termSearched}
//         setTermSearched={(word:string) => setTermSearched(word)}
//         termList={cards}
//         refetch={refetch}
//         collectionId={collectionId}
//       />
//       {cards.filter(
//         (card:any) => card && card.title.toLowerCase().indexOf(termSearched.toLowerCase()) !== -1,
//       ).map(
//         (card:any) => <CardItemView card={card} key={card!.id} onRemove={() => onRemove(collectionId, card!.id)} />,
//       )}
//     </>
//   );
// };

export const CardItemView:React.FC<{card:any, onRemove(): void}> = ({ card, onRemove }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px solid #e6e9ee",
      alignItems: "center",
    }}
    >
      <div className="dictionary-word">
        <Checkbox
          checked={isSelected}
          onValueChange={() => setIsSelected(!isSelected)}
        />
        <div className="dictionary-word-inner">
          <div style={{ fontSize: "18px", color: "white" }}>{card!.title}</div>
          <div style={{ color: "grey" }}>{card!.description}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ cursor: "pointer", margin: "0 4px" }}>
          <Edit
            size={20}
            color="white"
            onClick={() => {
              alert("edit this.");
            }}
          />
        </div>
        <div style={{ cursor: "pointer", marginRight: "12px" }}>
          <Trash color="white" size={20} onClick={onRemove} />
        </div>
      </div>
    </div>
  );
};
