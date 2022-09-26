import React, { useState, useEffect } from "react";
import Records from "../api/reports.json";
import Table from "./Table";
import { FaRegComment } from "react-icons/fa";

const AllReports = () => {
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("name");
  const [selectedData, setselectedData] = useState([]);
  const [selectedDate, setselectedDate] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleClick = (event, key) => {
    setselectedData(key + "-" + selectedDate);
    setToggle(!toggle);
  };

  const handleChange = (event, key) => {
    setselectedDate(key);
  };

  // function that will sort the array based on the selected option
  // in the dropdown and call it every time the selected option changes.
  useEffect(() => {
    const sortArray = type => {
      const types = {
        name: "name",
        description: "description"
      };
      const sortProperty = types[type];
      const sorted = [...Records.content].sort((a, b) => {
        if (sortProperty === "name") {
          return a.name.localeCompare(b.name);
        }
        if (sortProperty === "description") {
          return a.description.localeCompare(b.description);
        }
      });
      setData(sorted);
    };
    sortArray(sortType);
  }, [sortType]);

  var addDash = function(str) {
    var chars = str.split("");
    chars.splice(chars.length - 2, 0, "-");
    return chars.join("");
  };

  return (
    <>
      <div class="grid grid-cols-3 gap-4">
        <div class="...">
          <div class="h-full bg-gray-100 p-8 rounded">
            <label class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
              Select an option:{" "}
            </label>
            <select onChange={e => setSortType(e.target.value)}>
              <option selected>Choose an option</option>
              <option value="name">Name</option>
              <option value="description">Description</option>
            </select>
            {data.map(report => (
              <div class="container px-5 py-5 mx-auto flex flex-wrap">
                <div class="flex relative sm:items-center md:w-2/3 mx-auto">
                  <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                    <div class="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                      <FaRegComment />
                    </div>
                    <div class="flex-grow sm:pl-6 sm:mt-0">
                      <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">
                        {report.name}
                      </h2>
                      <p class="leading-relaxed mb-3">{report.description}</p>
                      billing period:
                      <div class="grid grid-cols-2 gap-4">
                        <div class="...">
                          <input
                            onChange={event =>
                              handleChange(event, report.billingreport1)
                            }
                            type="radio"
                            id="billingreport2"
                            name="billing_date"
                            value="billingreport2"
                          ></input>
                           {" "}
                          <label for="html">
                            {addDash(report.billingreport1)}
                          </label>
                           {" "}
                        </div>
                        <div class="...">
                          {" "}
                          <input
                            onChange={event =>
                              handleChange(event, report.billingreport2)
                            }
                            type="radio"
                            id="billingreport2"
                            name="billing_date"
                            value="billingreport2"
                          ></input>
                           {" "}
                          <label for="css">
                            {addDash(report.billingreport2)}
                          </label>
                        </div>
                        <div class="col-span-2 ...">
                          {" "}
                          <button
                            onClick={event => handleClick(event, report.id)}
                            key={report.id}
                            class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
                          >
                            Load Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div class="col-span-2">
          <div class="h-full bg-gray-100 p-8 rounded">
            <div>
             <Table data={selectedData} isClosed = {toggle}></Table>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllReports;
