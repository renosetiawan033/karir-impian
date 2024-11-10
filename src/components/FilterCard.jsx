import { useDispatch } from "react-redux";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import React, { useEffect, useState } from "react";
import { setSearchedQuery } from "@/redux/jobSlice";

const fitlerData = [
  {
    fitlerType: "Lokasi",
    array: ["Bandung", "Cikarang", "Yogyakarta", "Purwokerto", "Jakarta"],
  },
  {
    fitlerType: "Posisi",
    array: ["Teknisi", "Kasir", "Masinis", "Pelayan"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="relative w-full bg-white p-4 rounded-md shadow-lg overflow-hidden">
      {/* Decorative Cloud Shapes */}
      <svg
        className="absolute top-2 left-2 w-1/4 opacity-30"
        viewBox="0 0 200 100"
        fill="#77CDFF"
      >
        <path d="M30 60 Q 20 40, 40 35 Q 10 25, 35 20 Q 50 0, 80 10 Q 90 0, 110 10 Q 140 20, 130 45 Q 160 45, 150 70 Q 100 80, 70 70 Q 40 80, 30 60 Z" />
      </svg>
      <svg
        className="absolute top-12 right-2 w-1/3 opacity-20"
        viewBox="0 0 200 100"
        fill="#C62E2E"
      >
        <path d="M40 60 Q 30 40, 50 35 Q 20 25, 45 20 Q 60 0, 90 10 Q 100 0, 120 10 Q 150 20, 140 45 Q 170 45, 160 70 Q 110 80, 80 70 Q 50 80, 40 60 Z" />
      </svg>
      <svg
        className="absolute bottom-8 left-10 w-1/4 opacity-25"
        viewBox="0 0 200 100"
        fill="#87CEFA"
      >
        <path d="M20 50 Q 10 30, 30 25 Q 0 15, 25 10 Q 40 0, 70 10 Q 80 0, 100 10 Q 130 20, 120 45 Q 150 45, 140 70 Q 90 80, 60 70 Q 30 80, 20 50 Z" />
      </svg>
      <svg
        className="absolute bottom-5 right-8 w-1/4 opacity-35"
        viewBox="0 0 200 100"
        fill="#E0FFFF"
      >
        <path d="M0 40 Q 30 80, 70 50 Q 50 70, 80 70 Q 110 70, 130 40 Q 160 20, 180 30 Q 200 30, 200 60 Q 180 60, 150 70 Q 120 80, 80 80 Q 40 80, 0 60 Z" />
      </svg>
      <svg
        className="absolute top-20 left-1/3 w-1/4 opacity-40"
        viewBox="0 0 200 100"
        fill="#AFEEEE"
      >
        <path d="M50 40 Q 20 20, 40 10 Q 10 0, 50 0 Q 80 0, 100 20 Q 120 0, 150 10 Q 190 20, 140 50 Q 120 40, 80 40 Q 60 60, 50 40 Z" />
      </svg>

      <h1 className="font-bold text-lg z-10">Filter</h1>
      <hr className="mt-3 z-10" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {fitlerData.map((data, index) => (
          <div key={index} className="mt-4">
            <h2 className="font-semibold text-md text-gray-800">{data.fitlerType}</h2>
            <div className="space-y-2 mt-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div
                    className="flex items-center space-x-2"
                    key={itemId}
                  >
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId} className="text-sm sm:text-base">
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
