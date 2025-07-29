import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchText } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Noida", "Pune", "Gurugram"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Ui/Ux designer"],
  },
  {
    filterType: "Salary",
    array: ["20000", "40000", "60000"],
  },
];

const Filtercard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  
  const changeHandler = (value) => {
    if (selectedValue === value) {
      // If clicking the same option, deselect it
      setSelectedValue("");
      dispatch(setSearchText(""));
    } else {
      // Select the new value
      setSelectedValue(value);
    }
  };

  useEffect(() => {
    if (selectedValue) {
      dispatch(setSearchText(selectedValue));
    }
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-left">Filter Jobs</h1>
      <hr className="mt-3" />
      {filterData.map((data, dataIndex) => (
        <div key={dataIndex} className="mb-4">
          <h1 className="font-medium text-lg mb-2">{data.filterType}</h1>
          {data.array.map((item, itemIndex) => {
            const isSelected = selectedValue === item;
            return (
              <div 
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                key={`${dataIndex}-${itemIndex}`}
                onClick={() => changeHandler(item)}
              >
                <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                  )}
                </div>
                <Label className="cursor-pointer">{item}</Label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Filtercard;
