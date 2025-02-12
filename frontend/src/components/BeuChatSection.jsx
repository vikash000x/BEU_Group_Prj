import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { StoreContext } from "../context/StoreContext";
import { useContext } from "react";
const BeuChatSection = ({ collegeId }) => {
  const [chats, setChats] = useState(null);
  const { url } = useContext(StoreContext);
  const [message, setMessage] = useState(null);
  const [loadingChat, setLoadingChat] = useState(false);
  const handleChatPost = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${url}/chat/post-chat`, {
        collegeCode: collegeId,
        postedBy: "beu",
        message: message,
      });
      if (res.data.success) {
        fetchChats();
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchChats = async () => {
    try {
      setLoadingChat(true);
      const res = await axios.get(`${url}/chat/get-chat/${collegeId}`);
      if (res?.data?.success) {
        setChats(res?.data?.chat);
        setLoadingChat(false);
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

  console.log("collegeId from chat", collegeId);
  return (
    <div className="pt-6 pb-1 px-3 border-[3px]    w-1/2 h-[83vh] rounded-lg ml-1 flex flex-col flex-1 ">
      <div
        className="bg-[#1E293B] h-full p-1 rounded-md  overflow-y-scroll "
        style={{ scrollbarWidth: "none" }}
      >
        {loadingChat === true ? (
          <div className="flex justify-center items-center h-full">
            <h3 className=" animate-pulse text-green-400">Loading chats...</h3>
          </div>
        ) : (
          <div>
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
                    } text-white w-[80%] break-words `}
                  >
                    {chat.message}
                  </div>
                </div>
              ))
            ) : (
              <p>not chat</p>
            )}
          </div>
        )}
      </div>
      <form action="" onSubmit={handleChatPost}>
        <div className="w-full  bottom-0 p-2 flex justify-between gap-1 ">
          <input
            type="text"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className=" text-black  text-[18px] flex-1 px-2 outline-none border-none bg-white rounded-full"
            placeholder="type you message..."
          />
          <button
            type="submit"
            className={`bg-white p-3 rounded-full ${
              message === null && "cursor-not-allowed "
            }`}
          >
            <IoSend style={{ color: "green", fontSize: "18px" }} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeuChatSection;
