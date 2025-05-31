import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { FaImage, FaVideo, FaTimes, FaPaperclip } from "react-icons/fa";
import { StoreContext } from "../context/StoreContext";
import { useContext } from "react";
const BeuChatSection = ({ collegeId, postedBy }) => {
  const [chats, setChats] = useState(null);
  const { url } = useContext(StoreContext);
  const [message, setMessage] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        alert('Please select an image or video file');
        return;
      }

      // Check file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert('File is too large. Maximum size is 10MB.');
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const handleChatPost = async (e) => {
    try {
      e.preventDefault();
      setUploading(true);
      
      let mediaUrl = null;
      let mediaType = null;

      if (selectedFile) {
        try {
          console.log('Preparing to upload file:', {
            name: selectedFile.name,
            type: selectedFile.type,
            size: selectedFile.size
          });

          const formData = new FormData();
          formData.append('file', selectedFile);
          
          console.log('Sending upload request...');
          const uploadRes = await axios.post(
            `${url}/chat/upload-media`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );
          
          console.log('Upload response:', uploadRes.data);
          
          if (uploadRes.data.success) {
            mediaUrl = uploadRes.data.url;
            mediaType = uploadRes.data.type;
          } else {
            throw new Error(uploadRes.data.error || 'Failed to upload media');
          }
        } catch (uploadError) {
          console.error('Upload error details:', {
            message: uploadError.message,
            response: uploadError.response?.data,
            status: uploadError.response?.status
          });
          alert(`Error uploading media: ${uploadError.response?.data?.error || uploadError.message}`);
          setUploading(false);
          return;
        }
      }

      console.log('Sending chat message with:', { message, mediaUrl, mediaType });
      const res = await axios.post(`${url}/chat/post-chat`, {
        collegeCode: collegeId,
        postedBy: postedBy,
        message: message || '',
        mediaUrl,
        mediaType
      });

      if (res.data.success) {
        fetchChats();
        setMessage('');
        removeSelectedFile();
      } else {
        throw new Error(res.data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Chat error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      alert(`Error sending message: ${error.response?.data?.error || error.message}`);
    } finally {
      setUploading(false);
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
    //   <div
    //     className="bg-[#1E293B] h-full p-1 rounded-md  overflow-y-scroll "
    //     style={{ scrollbarWidth: "none" }}
    //   >
    //     {loadingChat === true ? (
    //       <div className="flex justify-center items-center h-full">
    //         <h3 className=" animate-pulse text-green-400">Loading chats...</h3>
    //       </div>
    //     ) : (
    //       <div>
    //         {chats && chats.length > 0 ? (
    //           chats.map((chat, i) => (
    //             <div
    //               className={`flex flex-row ${
    //                 chat.postedBy === "beu" && "justify-end"
    //               }`}
    //             >
    //               <div
    //                 key={i}
    //                 className={` m-1 p-1 rounded-md  ${
    //                   chat.postedBy === "beu" ? "bg-green-500" : "bg-red-500"
    //                 } text-white w-[80%] break-words `}
    //               >
    //                 {chat.message}
    //               </div>
    //             </div>
    //           ))
    //         ) : (
    //           <p>not chat</p>
    //         )}
    //       </div>
    //     )}
    //   </div>
    //   <form action="" onSubmit={handleChatPost}>
    //     <div className="w-full  bottom-0 p-2 flex justify-between gap-1 ">
    //       <input
    //         type="text"
    //         required
    //         value={message}
    //         onChange={(e) => setMessage(e.target.value)}
    //         className=" text-black  text-[18px] flex-1 px-2 outline-none border-none bg-white rounded-full"
    //         placeholder="type you message..."
    //       />
    //       <button
    //         type="submit"
    //         className={`bg-white p-3 rounded-full ${
    //           message === null && "cursor-not-allowed "
    //         }`}
    //       >
    //         <IoSend style={{ color: "green", fontSize: "18px" }} />
    //       </button>
    //     </div>
    //   </form>
    <div className="pt-6 pb-1 px-3 border-[3px] border-slate-700 bg-slate-800 w-1/2 h-[83vh] rounded-lg ml-1 flex flex-col">
      <div
        className="bg-slate-900 h-full p-2 rounded-md overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        {loadingChat === true ? (
          <div className="flex justify-center items-center h-full">
            <h3 className="animate-pulse text-emerald-400 text-lg">
              Loading chats...
            </h3>
          </div>
        ) : (
          <div>
            {chats && chats.length > 0 ? (
              chats.map((chat, i) => (
                <div
                  key={i}
                  className={`flex flex-row ${
                    chat.postedBy === "beu" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`m-1 px-4 py-2 rounded-xl max-w-[80%] break-words text-sm shadow-md ${
                      chat.postedBy === "beu"
                        ? "bg-emerald-600 text-white"
                        : "bg-indigo-600 text-white"
                    }`}
                  >
                    {chat.mediaUrl && chat.mediaType === 'image' && (
                      <img 
                        src={chat.mediaUrl} 
                        alt="Shared image"
                        className="rounded-lg mb-2 max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => window.open(chat.mediaUrl, '_blank')}
                      />
                    )}
                    {chat.mediaUrl && chat.mediaType === 'video' && (
                      <video 
                        src={chat.mediaUrl} 
                        controls 
                        className="rounded-lg mb-2 max-w-full"
                      />
                    )}
                    {chat.message}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-300">No chats yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Media Preview */}
      {previewUrl && (
        <div className="p-2 bg-slate-700 rounded-lg mb-2">
          <div className="relative">
            <button
              onClick={removeSelectedFile}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <FaTimes size={16} />
            </button>
            {selectedFile.type.startsWith('image/') ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-40 rounded-lg mx-auto"
              />
            ) : (
              <video
                src={previewUrl}
                className="max-h-40 rounded-lg mx-auto"
                controls
              />
            )}
          </div>
        </div>
      )}

      {/* Chat Input Form */}
      <form onSubmit={handleChatPost} className="relative">
        <div className="w-full bottom-0 p-2 flex justify-between gap-2">
          <div className="flex-1 flex items-center gap-2 bg-white rounded-full shadow-sm pr-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-4 py-2 outline-none border-none bg-transparent text-black text-[16px]"
              placeholder="Type your message..."
              disabled={uploading}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="text-gray-500 hover:text-emerald-600 transition-colors"
              disabled={uploading}
            >
              <FaPaperclip size={20} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*,video/*"
              className="hidden"
              disabled={uploading}
            />
          </div>
          <button
            type="submit"
            disabled={!message && !selectedFile || uploading}
            className={`bg-emerald-500 hover:bg-emerald-600 p-3 rounded-full transition duration-200 shadow-md flex items-center justify-center min-w-[48px] ${((!message && !selectedFile) || uploading) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {uploading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <IoSend style={{ color: "white", fontSize: "20px" }} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeuChatSection;
