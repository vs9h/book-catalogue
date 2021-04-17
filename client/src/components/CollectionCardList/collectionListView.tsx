import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowChevronLeft, Edit, Trash } from "@skbkontur/react-icons";
import { Checkbox } from "@skbkontur/react-ui";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { Loading } from "../Utils/Loading";
import { CollectionListTopbar } from "./collectionListTopbar";
import { Error } from "../Utils/Error";

interface ParamTypes {
    id:string
}

// const GET_COLLECTION_BY_ID = gql`
//     query GetCollectionByID($id:ID!){
//         collection(id:$id) {
//             title
//             description
//             length
//             cards{
//                 description
//                 title
//                 id
//             }
//         }
//     }`;

// Выводит коллекцию
export const CollectionPage:React.FC = () => {
  const { id } = useParams<ParamTypes>();
  // const { data, loading, refetch } = useQuery<Query>(GET_COLLECTION_BY_ID, { variables: { id } });
  // if (data && data.collection) {
  //   return (
  //     <div>
  //       <div style={{
  //         display: "flex", flexWrap: "nowrap", justifyContent: "flex-start", alignItems: "center", paddingBottom: "10px 0",
  //       }}
  //       >
  //         <Link to="/dictionary/collection">
  //           <ArrowChevronLeft color="white" />
  //         </Link>
  //         <div className="logo" style={{ marginLeft: "16px", marginRight: "16px" }}>
  //           { loading ? <Loading /> : data.collection.title || "null"}
  //         </div>
  //         {/* <Button onClick={() => alert("Added words set to Dictionary")}>Add this word set to dictionary</Button> */}
  //       </div>
  //       <CollectionListView cards={data.collection.cards!} refetch={refetch} collectionId={id} />
  //     </div>
  //   );
  // }
  return (<Error />);
};

interface ICollectionListView {
    cards: any,
    refetch(): void,
    collectionId:string
}

export const CollectionListView:React.FC<ICollectionListView> = ({ cards, refetch, collectionId }) => {
  const [termSearched, setTermSearched] = useState("");
  // const MUTATION_DELETE_CARD = gql`
  //       mutation DeleteCard($collectionId:ID!, $ID:ID!){
  //           deleteCard(collectionId:$collectionId, id: $ID){
  //               id
  //               title
  //               description
  //           }
  //       }
  //   `;
  // const [deleteCard] = useMutation(MUTATION_DELETE_CARD);
  const onRemove = (collectionID:String, ID:String) => {
    // const promise = deleteCard({ variables: { collectionId: collectionID, ID } });
    // promise.then(refetch);
  };
  return (
    <>
      <CollectionListTopbar
        termSearched={termSearched}
        setTermSearched={(word:string) => setTermSearched(word)}
        termList={cards}
        refetch={refetch}
        collectionId={collectionId}
      />
      {cards.filter(
        (card:any) => card && card.title.toLowerCase().indexOf(termSearched.toLowerCase()) !== -1,
      ).map(
        (card:any) => <CardItemView card={card} key={card!.id} onRemove={() => onRemove(collectionId, card!.id)} />,
      )}
    </>
  );
};

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
