import React, { useEffect, useState } from "react";
import {
  Chip,
  Autocomplete,
  TextField,
  Box,
  Button,
  Stack,
} from "@mui/material";

const SearchBox = (props) => {
  const { searchInput, setSearchInput, handleAPICall } = props;

  const [chipData, setChipData] = useState([]);

  const handleDelete = (chipToDelete) => () => {
    // console.log("Chip", chipToDelete, chipData);
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleSearchInput = (evt) => {
    evt.preventDefault();

    const value = evt.target.value;
    setSearchInput(value);
  };

  const handleSearch = () => {
    if (chipData) {
      const idx = chipData.length;
      const newChipValue = {
        key: idx + 1,
        label: searchInput,
      };
      setChipData((prevChipData) => {
        return [...prevChipData, newChipValue];
      });
      setSearchInput("");
    }
  };

  useEffect(()=>{
    if(chipData && chipData.length>0){
      handleAPICall(chipData)
    }
  },[chipData])

  return (
    <>
      <Stack spacing={4} direction="row">
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            fullWidth
            label="Type URL here...."
            id="fullWidth"
            placeholder="Type URL here...."
            value={searchInput}
            onChange={handleSearchInput}
          />
        </Box>
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Stack>
      {chipData && chipData.length > 0 && (
        <Stack direction="row" spacing={1}>
          {chipData.map((data) => {
            return <Chip label={data.label} onDelete={handleDelete(data)} />;
          })}
        </Stack>
      )}
    </>
  );
};

export default SearchBox;
