import React from "react";
const SearchBox = ({ value, setSearchValue }) => {
  return (
    <div className="col col-sm-4">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        placeholder="Search For a Movie"
      />
    </div>
  );
};
export default SearchBox;
