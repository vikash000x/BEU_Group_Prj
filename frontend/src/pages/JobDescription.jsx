import React, { useEffect, useState } from 'react'
import { Badge } from '../components/BadgeCard'
import  Button  from '../components/Button'
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
        <div className='w-[1200px] mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.postion} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Button text={buttonText}
                onClick={() => setButtonText(buttonText === "Apply" ? " Allready Applied" : "Apply")}  className="bg-purple-600 hover:bg-yellow-500" />
             
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription