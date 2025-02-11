import axios from "axios";
import React, { useEffect, useState } from "react";

import { StoreContext } from "../context/StoreContext";
import { useContext } from "react";
const BeuChatSection = ({ collegeId }) => {
  const [chats, setChats] = useState(null);
  const { url } = useContext(StoreContext);
  const fetchChats = async () => {
    try {
      const res = await axios.get(`${url}/chat/get-chat/${collegeId}`);
      if (res?.data?.success) {
        setChats(res?.data?.chat);
      } else {
        console.log(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchChats();
  }, [collegeId]);

  console.log(chats);
  console.log("collegeId from chat", collegeId);
  return (
    <div className="py-6 px-3 border-[3px]   w-1/2 h-[83vh] rounded-lg ml-1 ">
      <div className="bg-[#1E293B] h-full p-1 rounded-md">
        {chats && chats.length > 0 ? (
          chats.map((chat, i) => (
            <div
              className={`flex flex-row ${
                chat.postedBy === "beu" && "justify-end"
              }`}
            >
              <div
                key={i}
                className={` m-1 p-1 rounded-md  ${
                  chat.postedBy === "beu" ? "bg-green-500" : "bg-red-500"
                } text-white w-[80%]`}
              >
                {chat.message}
              </div>
            </div>
          ))
        ) : (
          <p>not chat</p>
        )}
      </div>
    </div>
  );
};

export default BeuChatSection;
