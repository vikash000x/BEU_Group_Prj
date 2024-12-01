import React from 'react'
import {Badge} from './BadgeCard'
import { useNavigate } from 'react-router-dom'
import { Bookmark } from 'lucide-react';
import Button from './Button';
import { Avatar, AvatarImage } from './Avatar';

const LatestJobCards = ({job, id}) => {
    const navigate = useNavigate();
    return (
        <div  className='p-3 text-white rounded-md shadow-xl bg-slate-800 border border-gray-100 cursor-pointer transform transition-transform duration-200 hover:scale-100 hover:border-red-400'>
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
                <p className='text-sm text-white'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-[#76ef7c] font-bold py-1'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#69dae4] font-bold py-1'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#f47d7f] font-bold py-1'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button text="Details" onClick={()=> navigate(`/description/${job?.id}`)} className=" hover:bg-yellow-400 hover:text-gray-500" />
                <Button text="Save For Later" className=" hover:bg-yellow-400 text-white hover:text-gray-500" />
            </div>
        </div>
    )
}

export default LatestJobCards