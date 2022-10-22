import React from "react";
import ReactDOM from "react-dom";
import EasyEdit, { Types } from "react-easy-edit";

function App2() {
  return (
    <EasyEdit
      type={Types.TEXT}
      value="Edit to delete me"
      onSave={() => {}}
      deleteButtonLabel="Remove Me!"
      deleteButtonStyle="remove-class"
      hideDeleteButton={false}
    />
  );
}

export default App2