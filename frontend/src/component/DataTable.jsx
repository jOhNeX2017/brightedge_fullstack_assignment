import React, { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { useEffect } from "react";

const DataTable = (props) => {
  const { paramInfo, calculateAverage } = props;

  const [histogram, setHistogram] = useState(null);

  useEffect(() => {
    if (paramInfo && paramInfo["histogram"]) {
      const histogramData = paramInfo["histogram"];
      setHistogram(histogramData);
      calculateAverage(paramInfo["histogram"])
    }
  }, [paramInfo]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "start",
        header: "Start",
        filterVariant: "range",
        filterFn: "between",
        size: 40,
      },
      {
        accessorKey: "end",
        header: "End",
        filterVariant: "range",
        filterFn: "between",
        size: 40,
      },
      {
        accessorKey: "density",
        header: "Density",
        filterVariant: "range",
        filterFn: "between",
        size: 40,
      },
    ],
    []
  );

  return (
    <>
      {histogram && (
        <MaterialReactTable
          columns={columns}
          data={histogram}
          initialState={{ showColumnFilters: false }}
        />
      )}
    </>
  );
};

export default DataTable;
