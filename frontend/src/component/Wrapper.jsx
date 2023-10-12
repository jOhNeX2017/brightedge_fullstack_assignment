import React, { useState } from "react";
import SearchBox from "./SearchBox";
import { Stack } from "@mui/material";
import SiteTable from "./SiteTable";
import { postApiCall } from "../utils/apiCall";

function Wrapper() {
  const [searchInput, setSearchInput] = useState("");
  const [urlData,setUrlData] = useState(null);
  const [loader,setLoader] = useState(false)

  const handleAPICall = async (data) => {
    const url = "http://localhost:8080/search";
    const reqData = {"searchParam":data.map((val) => val.label)};
    setLoader(true)
    await postApiCall(url, reqData)
    .then((resp) => {
        setUrlData(resp.data)
        setLoader(false)
    })
    .catch(err=>{
        setLoader(false)
    })
  };

  return (
    <Stack spacing={3} justifyContent="center" alignItems="center">
      <SearchBox
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleAPICall={handleAPICall}
      />
      <SiteTable urlData={urlData}/>
    </Stack>
  );
}

export default Wrapper;
