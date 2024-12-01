import React, { useState } from "react";

const UpdatesCard = ({ data }) => {
  const {
    title,
    description,
    date,
    College,
    category,
    targetAudience,
    attachments,
  } = data;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpanding = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="bg-slate-800 shadow-md rounded-lg p-6 mb-4 hover:bg-slate-700 transition-all duration-400 ease-in-out">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      <div className="text-sm mb-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-fuchsia-400"></div>
          <p className="text-xl">{College}</p>
        </div>

        <p>
          <strong>Date:</strong> {new Date(date).toLocaleDateString()}
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Target Audience:</strong> {targetAudience}
        </p>
      </div>

      {isExpanded && (
        <>
          <p className="mb-4">{description}</p>

          {/* Render attachments if there are any */}
          {attachments && attachments.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-medium mb-2">Attachments:</h3>
              <ul className="list-disc list-inside">
                {attachments.map((attachment, index) => (
                  <li key={index}>
                    <a
                      href={attachment.fileUrl}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {attachment.fileName}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      <div className="flex justify-end" onClick={handleExpanding}>
      <p className="bg-slate-600 cursor-pointer px-2 rounded-xl">
        {isExpanded ? "See less" : "Read more.."}
      </p> 
      </div>
    </div>
  );
};

export default UpdatesCard;
