import React from 'react'
import LatestJobs from '../components/LatestJobs'
import FilterCard from '../components/FilterCard'


const AllJob = () => {
   
  return (
    // <div>
    <div className = 'w-[1300px] my-3 mx-auto flex '>
          <div className='w-20% mt-[76px]'>
                        <FilterCard />
                    </div> 
         <LatestJobs />
        
         </div> 

    

  )
}

export default AllJob