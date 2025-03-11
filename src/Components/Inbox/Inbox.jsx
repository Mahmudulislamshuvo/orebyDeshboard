import React, { useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme

const Inbox = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const { quill, quillRef } = useQuill();

  const messages = [
    {
      id: 1,
      email: "xyzz@gmail.com",
      sender: "William Livingston",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "3:05 PM",
      read: false,
    },
    {
      id: 2,
      email: "xy@gmail.com",
      sender: "Betty Garmon",
      message:
        "Consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      time: "1:23 PM",
      read: true,
    },
  ];

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleReplyChange = (e) => {
    setReplyMessage(e.target.value);
  };

  const handleSendReply = () => {
    if (replyMessage.trim() !== "") {
      alert(`Reply Sent: ${replyMessage}`);
      // Here, you would typically send the reply to a backend API
      setReplyMessage("");
    }
  };

  return (
    <div className="w-full bg-white shadow-xl rounded-lg flex overflow-x-auto custom-scrollbar">
      <div className="w-[30%] px-4">
        <div className="px-2 pt-4 pb-8 border-r border-gray-300">
          <ul className="space-y-2">
            {messages.map((message) => (
              <li
                key={message.id}
                className={`${
                  message.read ? "bg-gray-200" : "bg-blue-100"
                } hover:bg-gray-300 cursor-pointer rounded py-1.5 px-4 flex items-center justify-between`}
                onClick={() => handleSelectMessage(message)}
              >
                <span className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    ></path>
                  </svg>
                  <span>{message.sender}</span>
                </span>
                <span className="text-sm text-gray-500">{message.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1 px-2">
        {selectedMessage ? (
          <>
            <div className="h-16 flex items-center justify-between ">
              <div className="flex items-center">
                <a
                  href="#"
                  className="flex items-center text-gray-700 px-2 py-1 space-x-0.5 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
                  title="Back"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-sm font-bold">Back</span>
                </a>
              </div>
            </div>

            <div className="py-3 pl-2 text-gray-700">
              <h3 className="text-xl font-semibold">
                {selectedMessage.sender}
              </h3>
              <span className="text-gray-500 ">{selectedMessage.email}</span>
              <p className="mt-8">{selectedMessage.message}</p>

              {/* Reply Section */}
              <div className="mt-12">
                <div className="overflow-hidden shadow-xl">
                  <div className="w-full h-[200px] border rounded-md shadow-sm ">
                    <div ref={quillRef} />
                  </div>
                </div>
                <button
                  onClick={handleSendReply}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                >
                  Send Reply
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-gray-500 text-center mt-8">
            Select a message to view
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
