import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  OutlinedInput,
  CircularProgress
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ParameterTable from "./ParameterTable";
import { metricPoints } from "../utils/constant";
import { captalizeValues } from "../utils/apiCall";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;

function SiteTable(props) {
  const { urlData, loader } = props;

  const [siteData, setSiteData] = useState([]);
  const [select, setSelect] = useState(metricPoints);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelect(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    if (urlData && Object.keys(urlData).length > 0) {
      setSiteData(Object.keys(urlData));
    } else {
      setSiteData(null);
    }
  }, [urlData]);


  return (
    <>
      {loader && (
         <CircularProgress />
      )}
      {!loader && siteData && siteData.length > 0 && (
        <>
          {/* Metrics Selection Box  */}
          <FormControl  sx={{ m: 1, width: 400 }}>
            <InputLabel id="demo-multiple-checkbox-label">Metrics</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={select}
              onChange={handleSelectChange}
              input={<OutlinedInput label="Metrics" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {metricPoints.map((point) => (
                <MenuItem key={point} value={point}  >
                  <Checkbox checked={select.indexOf(point) > -1} />
                  <ListItemText primary={captalizeValues(point)} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Site Data  */}
          {siteData.map((site,idx) => {
            return (
              <>
                <Accordion sx={{ width: "90vw" }} key={idx} expanded={true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography sx={{ width: "33%", textAlign: "left" }}>
                      {site}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}></Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ParameterTable siteInfo={urlData[site]} selectedParam={select} />
                  </AccordionDetails>
                </Accordion>
              </>
            );
          })}
        </>
      )}
    </>
  );
}

export default SiteTable;
