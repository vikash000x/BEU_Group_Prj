
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/table'
import { Popover, PopoverContent, PopoverTrigger } from '../components/popover';
import {  MoreHorizontal } from 'lucide-react'


const applicants = {
   
      "applications": [
        {
          "_id": "1",
          "applicant": {
            "fullname": "John Doe",
            "email": "johndoe@example.com",
            "phoneNumber": "123-456-7890",
            "profile": {
              "resume": "https://example.com/resumes/john_doe_resume.pdf",
              "resumeOriginalName": "John_Doe_Resume.pdf"
            },
            "createdAt": "2024-11-24T10:45:00Z"
          }
        },
        {
          "_id": "2",
          "applicant": {
            "fullname": "Jane Smith",
            "email": "janesmith@example.com",
            "phoneNumber": "987-654-3210",
            "profile": {
              "resume": null,
              "resumeOriginalName": null
            },
            "createdAt": "2024-11-23T14:30:00Z"
          }
        },
        {
            "_id": "3",
            "applicant": {
              "fullname": "Jane Smith",
              "email": "janesmith@example.com",
              "phoneNumber": "987-654-3210",
              "profile": {
                "resume": null,
                "resumeOriginalName": null
              },
              "createdAt": "2024-11-23T14:30:00Z"
            }
          },
          {
            "_id": "4",
            "applicant": {
              "fullname": "Jane Smith",
              "email": "janesmith@example.com",
              "phoneNumber": "987-654-3210",
              "profile": {
                "resume": null,
                "resumeOriginalName": null
              },
              "createdAt": "2024-11-23T14:30:00Z"
            }
          },
          {
            "_id": "5",
            "applicant": {
              "fullname": "Jane Smith",
              "email": "janesmith@example.com",
              "phoneNumber": "987-654-3210",
              "profile": {
                "resume": null,
                "resumeOriginalName": null
              },
              "createdAt": "2024-11-23T14:30:00Z"
            }
          },
          {
            "_id": "6",
            "applicant": {
              "fullname": "Jane Smith",
              "email": "janesmith@example.com",
              "phoneNumber": "987-654-3210",
              "profile": {
                "resume": null,
                "resumeOriginalName": null
              },
              "createdAt": "2024-11-23T14:30:00Z"
            }
          }
    ]
}
const shortlistingStatus =  ["Shortlisted", "Under Review", "Rejected"];
  
//const shortlistingStatus = ["Accepted", "Rejected"];

const AppliedList = () => {
  

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <tr className= 'py-50 bg-pink-400 text-white border-b border-white  hover:bg-purple-300  rounded-lg ' key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell >
                                    {
                                        item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="float-right cursor-pointer ">
                                    <Popover>
                                        <PopoverTrigger>
                                <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="bg-red-500 text-white w-32 border-b border-white ">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div key={index} className='flex w-fit items-center my-2 cursor-pointer border-b border-white '>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>

                            </tr>
                        ))
                    }

                </TableBody>

            </Table>
        </div>
    )
}

export default AppliedList