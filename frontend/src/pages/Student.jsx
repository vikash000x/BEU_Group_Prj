import React, { useContext, useState } from 'react'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from '../components/Badge'
import { Label } from '../components/label'
import { Avatar, AvatarImage } from '../components/Avatar'
import StudentActivity from '../components/StudentActivity'
import axios from 'axios'
import { StoreContext } from '../context/StoreContext'
import { toast } from "react-toastify";
import Loader from '../components/loader/Loader';


const Student = () => {
  const { loading, setLoading } = useContext(StoreContext);

  const {url} = useContext(StoreContext);

  
  const loggedInStudentData = localStorage.getItem("loggedInStudentData");
  
  const parsedData = JSON.parse(loggedInStudentData);
  
  const profileId = parsedData.studentProfileId._id;

  
  
  const loggedInCollegeData = localStorage.getItem("loggedInCollegeData");
  
  const parsedDatac = JSON.parse(loggedInCollegeData);
  console.log("studentpId11", profileId);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    profilepic: parsedData.studentProfileId.profilepic,
    skills: parsedData.studentProfileId.skills,
    resume: parsedData.studentProfileId.resume,
    about:parsedData.studentProfileId.about ,
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const submitHandler = async (e) => {
    
    try {
      setLoading(true);
     
  
      const res = await axios.put(
        `${url}/student/update-studentprofile/${profileId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      console.log("after res", res);
  
      if (res.data) {
        // Update localStorage with the latest student profile data
        const updatedStudentData = { ...parsedData };
        updatedStudentData.studentProfileId = res.data.updatedProfile; // Assuming `res.data.updatedProfile` contains the latest profile data
  
        localStorage.setItem("loggedInStudentData", JSON.stringify(updatedStudentData));
  
        // Update the modal state and notify the user
        setIsModalOpen(false);
        setLoading(false);
        toast.success("Your data was updated successfully!");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Some error occurred!");
    } finally {
      setLoading(false);
    }
  };
        
const skills = parsedData.studentProfileId.skills;

    return (
      loading?<Loader/>:(     <div className="w-[1300px] my-auto  mx-auto  flex  flex-col ">
           
            <div className=' mx-40 text-white shadow-xl bg-slate-800 border border-gray-100 cursor-pointer rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{parsedData.name}</h1>
                            <p>{parsedData.name}   </p>
                            <span>{parsedData.branch}" { parsedData.year} year </span>
                        </div>
                    </div>
                    
                    <button    onClick={() => setIsModalOpen(true)} className="text-right  h-8 w-8"><Pen /></button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>aman@gmail.com</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{parsedData.studentProfileId.about}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                      { skills.map((skill, ind)=>
                       <Badge className='bg-blue-500 hover:bg-red-500  border-gray-600'>{skill}</Badge>
                       )
                      }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                   
                    
                      {/* <a target='blank'  className='text-blue-500 w-full hover:underline cursor-pointer'>personal resume</a>  */}
                      {/* : <span>NA</span> */}

                      <StudentActivity   className = ' my-10 h-20 w-full mx-40 text-white shadow-xl bg-slate-800 border border-gray-100 cursor-pointer rounded-2xl  p-8' />  
  
                     
                </div>

                
            </div>
            <div className='mx-40 my-10 text-white shadow-xl bg-slate-800 border border-gray-100 cursor-pointer rounded-2xl '>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                </div>
                    
                {isModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="text-white bg-slate-800  cursor-pointer  p-6 rounded-lg shadow-lg w-96 border-2 border-white">
                <h2 className="text-xl font-bold mb-4">Update Profile</h2>
    
                <label className="block mb-2">profile-pic:</label>
                <input
                  type="text"
                  name="profilepic"
                  value={formData.profilepic}
                  onChange={handleChange}
                  className=" text-black w-full p-2 border rounded-md mb-4"
                  placeholder="show your beautiful image..."
                />
    
                <label className="block mb-2">skills:</label>
                <input
                  type="text"
                  name="skills"
                 value={formData.skills}
                 onChange={handleChange}
                  className="text-black w-full p-2 border rounded-md mb-4"
                  placeholder="show skills"
                />
    
                <label className="block mb-2">resume:</label>
                <input
                  type="text"
                  name="resume"
                 value={formData.resume}
                 onChange={handleChange}
                  className="text-black w-full p-2 border rounded-md mb-4"
                  placeholder="show your resume"
                />
    
                <label className="block mb-2">About:</label>
                <input
                  type="text"
                  name="about"
                  value={formData.about}
                 onChange={handleChange}
                  className="text-black w-full p-2 border rounded-md mb-4"
                  placeholder="Your short bio..."
                />
    
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-yellow-300 mr-2 hover:text-gray-600"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-yellow-300 hover:text-gray-600"
                    
                  
                     onClick={submitHandler}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}

           
        </div>
      )
    )
}

export default Student









