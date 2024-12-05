import React, { useEffect, useState } from 'react'
import { Badge } from '../components/BadgeCard'

import { useParams } from 'react-router-dom';
import { allJobs } from '../lib/utils';



const JobDescription = () => {

    const [singleJob, setSinglejob] = useState(null);
    const [buttonText, setButtonText] = useState("Apply");
    
    const params = useParams();
    const jobId= params.id;
    console.log(jobId)
    useEffect(()=>{
        const selectedjob = allJobs.find((job)=>job.id===jobId);
        setSinglejob(selectedjob);
    },[jobId, allJobs]);

    console.log(singleJob)

       

    return (
        <div className='text-white w-[1200px] mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-white font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-[#76ef7c] font-bold'} variant="ghost">{singleJob?.postion} Positions</Badge>
                        <Badge className={'text-[#69dae4] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#f47d7f] font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <button className="px-6 py-2 h-10 text-white bg-[#0B192C] border-[0.01rem] rounded-lg hover:bg-blue-600 active:bg-blue-700 transition duration-200 ease-in-out 
     sm:px-8px  lg:h-11 lg:rounded-md lg:px-8 sm:h-9 sm:rounded-md sm:px-3   md:px-8 md:py-[-10px] text-sm "  onClick={() => setButtonText(buttonText === "Apply" ? " Allready Applied" : "Apply")} >{buttonText}</button>
                {/* <Button text={buttonText}
                onClick={() => setButtonText(buttonText === "Apply" ? " Allready Applied" : "Apply")}  className="bg-purple-600 hover:bg-yellow-500" />
              */}
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal '>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal '>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal '>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal '>{singleJob?.experience} yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal '>{singleJob?.salary}LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal '>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal '>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription