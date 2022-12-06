import React, { useRef } from "react";

const SearchInput = ({ term, searchKeyWord }) => {
   const inputEl = useRef("");

   const getSearchTerm = () => {
      searchKeyWord(inputEl.current.value);
   };
   return (
      <>
         <div className="form-group d-flex justify-content-center ">
            <input
               ref={inputEl}
               type="text"
               name=""
               id=""
               className="form-control py-1 px-2"
               style={{ width: "950px", border: "2px solid lightgray" }}
               placeholder="Search Blog ..."
               value={term}
               onChange={getSearchTerm}
            />
         </div>
      </>
   );
};

export default SearchInput;
