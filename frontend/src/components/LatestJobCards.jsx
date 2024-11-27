import React from 'react'
import {Badge} from './BadgeCard'
import { useNavigate } from 'react-router-dom'
import { Bookmark } from 'lucide-react';
import Button from './Button';
import { Avatar, AvatarImage } from './Avatar';

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div  className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
              <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>Today</p>
              <Bookmark />
            </div>
            <div className='flex items-center gap-2 my-2'>
            <Avatar>
  <AvatarImage src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Company Logo" />
</Avatar>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            </div>
            <div>

                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button text="Details" onClick={()=> navigate(`/description/${job?.id}`)} className="bg-red-600 hover:bg-yellow-400 hover:text-gray-500" />
                <Button text="Save For Later" className="bg-[#7209b7] hover:bg-yellow-400 text-white hover:text-gray-500" />
            </div>
        </div>
    )
}

export default LatestJobCards