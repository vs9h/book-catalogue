import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Add } from "@skbkontur/react-icons";
import { CreateCollectionModal } from "./CreateCollectionModal";
import { GetAllBooks_allBooks } from "../../generated/GetAllBooks";

// Выводит все карточки
export const CollectionCardList:React.FC<{books:any, refetch(): void}> = observer(
  ({ books, refetch }) => (
    <>
      <div style={{ display: "flex", flexFlow: "row nowrap", alignItems: "center" }}>
        <div className="logo">
          Recommended word sets and phrasebooks
        </div>
        <CreateBookCardItem refetch={refetch} />
      </div>
      <div>
        <div className="main-inner">
          {books.map(
            (collection:any) => <BookCardItem key={collection.id} book={collection} />,
          )}
        </div>
      </div>
    </>
  ),
);

// Карточка коллекции
export const BookCardItem:React.FC<{book: GetAllBooks_allBooks}> = ({ book }) => (
  <Link to={`/catalogue/book/${book.isbn}`} className="card">
    <div className="card-inner">
      <div style={{
        display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between",
      }}
      >
        <div className="card-title">{book.name}</div>
      </div>
      <div className="card-subtitle">
        {book.year}
        {" "}
        year
      </div>
      {
            (book.image)
              ? <img src={`http://localhost:5000/${book.image.id}-${book.image.filename}`} alt="Обложка книги" />
              : <img src="http://localhost:5000/tgpA1mvpT-images.png" alt="Обложка книги" />
}
    </div>
  </Link>
);

export const CreateBookCardItem:React.FC<{refetch(): void}> = (({ refetch }) => {
  const [isCreateModalOpened, setIsCreateModalOpened] = useState<boolean>(false);
  function renderCreateCollectionModal() {
    return (
      <CreateCollectionModal
        onClose={() => {
          setIsCreateModalOpened(false);
        }}
        refetch={refetch}
      />
    );
  }
  return (
    <div>
      {isCreateModalOpened && renderCreateCollectionModal()}
      <div onClick={() => setIsCreateModalOpened(true)} className="create-collection-button">
        <Add />
        <div style={{ margin: "auto" }}>
          Add book
        </div>
      </div>
    </div>
  );
});

// Button size="small" onClick={toggleAdd}>
//               {item.isAdded
//                 ? <Remove color="grey" />
//                 : <Add color="white" />}
//             </Button>

// const toggleAdd = (event:React.MouseEvent<HTMLSpanElement>) => {
//  event.preventDefault(); console.log("added");
// };
