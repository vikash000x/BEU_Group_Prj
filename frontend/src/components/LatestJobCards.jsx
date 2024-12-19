import React, { useState } from 'react'
import { Badge } from './BadgeCard'
import { useNavigate } from 'react-router-dom'
import { Bookmark, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Avatar, AvatarImage } from './Avatar';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <div className='group relative p-6 text-white rounded-xl bg-slate-800/95 border border-slate-700/50 hover:border-slate-600 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1'>
            {/* Header Section */}
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-2'>
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <p className='text-sm text-slate-400 font-medium'>Today</p>
                </div>
                <button 
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className='transform transition-all duration-200 hover:scale-110'
                >
                    <Bookmark 
                        className={`w-5 h-5 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-slate-400 hover:text-yellow-400'}`}
                    />
                </button>
            </div>

            {/* Company Info Section */}
            <div className='flex items-center gap-4 mb-4'>
                <Avatar className="h-12 w-12 ring-2 ring-slate-700/50">
                    <AvatarImage src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Company Logo" />
                </Avatar>
                <div>
                    <h1 className='font-semibold text-lg text-white/90'>{job?.company?.name}</h1>
                    <div className='flex items-center gap-1 text-slate-400'>
                        <MapPin className="w-3 h-3" />
                        <p className='text-sm'>India</p>
                    </div>
                </div>
            </div>

            {/* Job Details Section */}
            <div className='space-y-3 mb-6'>
                <h1 className='font-bold text-xl text-white/95'>{job?.title}</h1>
                <p className='text-sm text-slate-300 line-clamp-2 leading-relaxed'>{job?.description}</p>
            </div>

            {/* Tags Section */}
            <div className='flex flex-wrap items-center gap-2 mb-6'>
                <Badge className='bg-emerald-500/10 text-emerald-400 font-medium py-1.5 px-3'>
                    {job?.position} Positions
                </Badge>
                <Badge className='bg-cyan-500/10 text-cyan-400 font-medium py-1.5 px-3'>
                    {job?.jobType}
                </Badge>
                <Badge className='bg-rose-500/10 text-rose-400 font-medium py-1.5 px-3'>
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center gap-3'>
                <button 
                    onClick={() => navigate(`/description/${job?._id}`)}
                    className="flex cursor-pointer items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                >
                    View Details
                    <ExternalLink className="w-4 h-4" />
                </button>
                <button 
                    className="px-4 py-2.5 border border-slate-600 hover:border-slate-500 text-white font-medium rounded-lg transition-all duration-200 hover:bg-slate-700/50"
                >
                    Save For Later
                </button>
            </div>

            {/* Hover Gradient Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>
    )
}

export default LatestJobCards