import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Autocomplete, Checkbox,
} from "@skbkontur/react-ui";
import { Add, Search } from "@skbkontur/react-icons";
import { AddBookModal } from "./AddBookModal";

interface ITermListTopbar{
    termList: any,
    setTermSearched(name:string):void,
    termSearched:string,
    refetch(): void,
    collectionId: string,
}

export const CollectionListTopbar:React.FC<ITermListTopbar> = observer(
  (props) => {
    const [selected, setSelected] = useState(false);
    const [isAddModalOpened, setIsAddModalOpened] = useState<boolean>(false);
    function renderAddModal() {
      return (
        <AddBookModal
          onClose={() => {
            setIsAddModalOpened(false);
          }}
          refetch={props.refetch}
          collectionId={props.collectionId}
        />
      );
    }
    return (
      <div style={{
        display: "flex", flexWrap: "nowrap", alignItems: "center", paddingBottom: "8px", borderBottom: "1px solid #e6e9ee",
      }}
      >
        <div style={{ flexGrow: (0), marginRight: "16px" }}>
          <Checkbox
            checked={selected}
            onValueChange={(checked) => {
              setSelected(checked);
            }}
          />
        </div>
        <div style={{ flexGrow: (0), marginRight: "8px" }}>
          <Autocomplete
            leftIcon={<Search />}
            width="max"
            placeholder="Search"
            source={props.termList.allTitles}
            value={props.termSearched}
            onValueChange={(val) => props.setTermSearched(val)}
          />
        </div>
        <div
          onClick={() => setIsAddModalOpened(true)}
          className="add-card-button"
        >
          <Add />
          <div style={{ margin: "auto" }}>
            Add new word
          </div>
        </div>
        {isAddModalOpened && renderAddModal()}
      </div>
    );
  },
);
