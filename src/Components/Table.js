import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";

// import allReports from "../api/reports";
var data = require("../api/reports/" + "41" + "-201708.json");

const Table = props => {
  const [toggle, setToggle] = useState(props.isClosed);

  // sorting Table Headers:
  const [myData, setMyData] = useState(data.data);
  const [order, setorder] = useState("ASC");

  // gets 'col' value from the <th> onclick
  // had to get the index from the 'columns' array
  //  and sort the 'data' array with the 'columns' index value
  //  e.g accountId is the first value in the table so has an index of 0
  //  so i took that index and used it to get all items within the first index of the data array
  const sorting = col => {
    if (order === "ASC") {
      const sorted = [...myData].sort((a, b) =>
        // data.data.sort((a, b) => a[col] - b[col]) ||
        data.data.sort((a, b) => a[col].localeCompare(b[col]))
      );
      setMyData(sorted);
      setorder("DESC");
    }
    if (order === "DESC") {
      const sorted = [...myData].sort((a, b) =>
        // data.data.sort((a, b) => b[col] - a[col])
        data.data.sort((a, b) => b[col].localeCompare(a[col]))
      );
      setMyData(sorted);
      setorder("ASC");
    }
  };

  // props contain {reportId}-{billingPeriod}
  // step through the data to see if props match the name of the required json file and load it in
  // in the event a file with the matching billing period or report id does not exist
  // i notify the user

  switch (props.data) {
    case "41-201710":
      return <div class="grid place-items-center">Data does not exist</div>;
    case "245-201709":
      return <div class="grid place-items-center">Data does not exist</div>;
    case "41-201708":
      data = require("../api/reports/41-201708.json");
      break;
    case "41-201709":
      data = require("../api/reports/41-201709.json");
      break;
    case "245-201708":
      data = require("../api/reports/245-201708.json");
      break;
    case "245-201710":
      data = require("../api/reports/245-201710.json");
      break;
    default:
      return <div class="grid place-items-center">Please Load Data</div>;
  }

  // render the table and dynamically populate it using the selected JSON file.
  return (
    <div>
      <div>
        <div
          class="text-right text-xs text-indigo-500 tracking-widest font-medium title-font mb-1"
          onClick={() => setToggle(!toggle)}
        >
          {!toggle && "Close Table"}
          {toggle && "Open Table"}
        </div>
        {!toggle && (
          <table class="w-full text-sm text-left text-gray-500">
            <tr>
              {data.columns.map(function(header, index, array) {
                return (
                  <th
                    scope="col"
                    class="pointer-events-none md:pointer-events-auto py-3 px-6"
                    onClick={() => sorting(index)}
                  >
                    {header}
                  </th>
                );
              })}
            </tr>
            <tbody>
              {data.data.map(user => (
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={user}
                >
                  <td class="py-4 px-6">{user[0]}</td>
                  <td class="py-4 px-6">{user[1]}</td>
                  <td class="py-4 px-6">{user[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {toggle && (
          <div class="grid place-items-center ">Table has been closed</div>
        )}
      </div>
      <div class="overflow-x-auto relative"></div>
    </div>
  );
};

export default Table;
