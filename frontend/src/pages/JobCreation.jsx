import React from 'react'

import {Label} from '../components/label'
import { Input } from '../components/input'
import Button  from  '../components/Button'
// import { useSelector } from 'react-redux'
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
// import axios from 'axios'
// import { JOB_API_END_POINT } from '@/utils/constant'
// import { toast } from 'sonner'
// import { useNavigate } from 'react-router-dom'
// import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'



const PostJob = () => {
    // const [input, setInput] = useState({
    //     title: "",
    //     description: "",
    //     requirements: "",
    //     salary: "",
    //     location: "",
    //     jobType: "",
    //     experience: "",
    //     position: 0,
       
    // });
    // const [loading, setLoading]= useState(false);
    // const navigate = useNavigate();

  
  

    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //     try {
    //         setLoading(true);
    //         const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
    //             headers:{
    //                 'Content-Type':'application/json'
    //             },
    //             withCredentials:true
    //         });
    //         if(res.data.success){
    //             toast.success(res.data.message);
    //             navigate("/admin/jobs");
    //         }
    //     } catch (error) {
    //         toast.error(error.response.data.message);
    //     } finally{
    //         setLoading(false);
    //     }
    // }

    const navigate = useNavigate();
    return (
      
        <div>
            
            <div className='flex items-center justify-center w-screen my-10'>
                <form  className='text-white p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                // value={input.title}
                                // onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 text-black font-serif"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                // value={input.description}
                                // onChange={changeEventHandler}
                                className="text-black font-serif focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                // value={input.requirements}
                                // onChange={changeEventHandler}
                                className="text-black font-serif focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                // value={input.salary}
                                // onChange={changeEventHandler}
                                className="text-black font-serif focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                // value={input.location}
                                // onChange={changeEventHandler}
                                className="text-black font-serif focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                // value={input.jobType}
                                // onChange={changeEventHandler}
                                className="text-black font-serif focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                // value={input.experience}
                                // onChange={changeEventHandler}
                                className="text-black font-serif focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Postion</Label>
                            <Input
                                type="number"
                                name="position"
                                // value={input.position}
                                // onChange={changeEventHandler}
                                className="text-black font-serif focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                    
                    </div> 
                    
                        {/* <Button onClick={()=>navigate('/job-section')} text="submit" type="submit" className="w-full my-4"/> */}
                    
                        <button className="w-full my-4 px-6 py-2 h-10 text-white bg-[#0B192C] border-[0.01rem] rounded-lg hover:bg-blue-600 active:bg-blue-700 transition duration-200 ease-in-out 
     sm:px-8px  lg:h-11 lg:rounded-md lg:px-8 sm:h-9 sm:rounded-md sm:px-3   md:px-8 md:py-[-10px] text-sm "  onClick={()=>navigate('/job-section')}> Submit </button>
                </form>
            </div>
        </div>
    )
}

export default PostJob