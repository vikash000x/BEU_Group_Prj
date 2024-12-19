import React, { useState } from "react";
import { toast } from "react-toastify";
import { Label } from "../components/label";
import { Input } from "../components/input";
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
// import { JOB_API_END_POINT } from '@/utils/constant'

// import { useNavigate } from 'react-router-dom'
import Loader from "../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const { loading, setLoading, token } = useContext(StoreContext);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(input);
      const res = await axios.post(
        "http://localhost:4000/api/job/job-post",
        input,
        {
          headers: {
            token,
          },

          withCredentials: true,
        }
      );

      console.log(res);
      if (res.data.success) {
        setLoading(false);
        toast.success("job created successfully!");
        navigate("/job-section");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log("data is not going to backend");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="flex items-center justify-center w-screen my-10">
        <form
          onSubmit={submitHandler}
          className="text-white p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                required
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 text-black font-serif"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                required
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="text-black font-serif focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                required
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="text-black font-serif focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                required
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="text-black font-serif focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                required
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="text-black font-serif focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                required
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="text-black font-serif focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                required
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="text-black font-serif focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No of Postion</Label>
              <Input
                required
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="text-black font-serif focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
          </div>

          {/* <Button onClick={()=>navigate('/job-section')} text="submit" type="submit" className="w-full my-4"/> */}
          <button
            type="submit"
            className="w-full my-4 px-6 py-2 h-10 text-white bg-[#0B192C] border-[0.01rem] rounded-lg hover:bg-blue-600 active:bg-blue-700 transition duration-200 ease-in-out 
 sm:px-8px  lg:h-11 lg:rounded-md lg:px-8 sm:h-9 sm:rounded-md sm:px-3   md:px-8 md:py-[-10px] text-sm "
          >
            {" "}
            Submit{" "}
          </button>

          {/* <button type="submit"  className="w-full my-4"  >Post New Job</button> */}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
