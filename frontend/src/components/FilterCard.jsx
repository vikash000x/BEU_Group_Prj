import React  from 'react'
import { RadioGroup, RadioGroupItem } from './Radio-group'
import { Label } from './label'
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice'

import {filterData} from '../lib/utils' 



const FilterCard = ({categories, selectedCategory, onCategoryChange}) => {
   
    return (
        <div className="w-full text-white bg-slate-800 mt-5  p-3 rounded-md">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <hr className="mt-3" />
        <RadioGroup>
          {filterData.map((data, index) => (
            <div key={index}>
              <h1 className="font-bold text-lg">{data.fitlerType}</h1>
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div key={itemId} className=" transform transition-transform duration-200 hover:scale-110 hover:text-red-400 flex items-center space-x-2 my-2">
                    <RadioGroupItem categories={item} id={itemId}  checked={selectedCategory === item} // Ensures the correct item is selected
  onClick={() => onCategoryChange(selectedCategory === item ? 'all' : item)}  />
                    <Label htmlFor={itemId}>{item}</Label>
                  </div>
                );
              })}
            </div>
          ))}
        </RadioGroup>
      </div>
    )
}

export default FilterCard


//value={selectedValue} onValueChange={changeHandler}

//{ useEffect, useState }