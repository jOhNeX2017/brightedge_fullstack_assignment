import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DataTable from "./DataTable";
import { captalizeValues } from "../utils/apiCall";

function ParameterTable(props) {
  const { siteInfo, selectedParam } = props;

  const [paramData, setparamData] = useState([]);
  const [sum, setSum] = useState(null);
  const [average, setAverage] = useState(null);

  const calculateAverage = (histogram) => {
    let temp = 0;
    histogram.map((val) => {
      temp += val.density;
    });
    setSum(temp.toFixed(3));
    setAverage((temp / histogram.length).toFixed(5));
  };

  useEffect(() => {
    try {
      if (siteInfo && siteInfo["metric"]) {
        const paramKey = Object.keys(siteInfo["metric"]);
        setparamData(paramKey);
      }
    } catch (err) {
      setparamData([]);
    }
  }, [siteInfo]);

  return (
    <>
      {paramData &&
        paramData.length > 0 &&
        paramData.map((param,idx) => {
          if (selectedParam.indexOf(param) !== -1) {
            return (
              <>
                <Accordion key={idx}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography sx={{ width: "33%", textAlign: "left" }}>
                      {captalizeValues(param)}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      Percentile:{" "}
                      {siteInfo["metric"][param]["percentiles"]["p75"]} (p75)
                    </Typography>
                    <Typography sx={{ marginLeft: 2, color: "text.secondary" }}>
                      Sum: {sum}
                    </Typography>
                    <Typography sx={{ marginLeft: 2, color: "text.secondary" }}>
                      Average: {average}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <DataTable
                      paramInfo={siteInfo["metric"][param]}
                      calculateAverage={calculateAverage}
                    />
                  </AccordionDetails>
                </Accordion>
              </>
            );
          }
        })}
    </>
  );
}

export default ParameterTable;
