import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../redux/PasteSlice";
import toast from "react-hot-toast";
import { Edit, Eye, Trash2, Copy, Share2 } from "lucide-react";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    paste.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleClick(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.error("Paste deleted!");
  }

  function handleCopy(text) {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  }

  return (
    <div className="p-4 bg-[#242424] min-h-screen text-white">
      {/* Search Input */}
      <input
        className="p-2 rounded-xl w-full sm:w-[600px] mt-5 border border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
        type="search"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-6 mt-6">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="border border-white rounded-2xl p-5 bg-[#242424]"
            >
              {/* Top row: title left, icons right */}
              <div className="border p-2 rounded-2xl  flex items-start justify-between gap-3">
                <div className="whitespace-pre-wrap  font-semibold text-xl text-white break-words flex-1">
                  {paste.title}
                </div>

                <div className="flex gap-3 flex-shrink-0">
                  <a
                    href={`/?pasteId=${paste?._id}`}
                    className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 transition"
                    title="Edit"
                  >
                    <Edit size={18} className="text-black" />
                  </a>

                  <a
                    href={`/pastes/${paste._id}`}
                    className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition"
                    title="View"
                  >
                    <Eye size={18} className="text-white" />
                  </a>

                  <button
                    onClick={() => handleClick(paste._id)}
                    className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition"
                    title="Delete"
                  >
                    <Trash2 size={18} className="text-white" />
                  </button>

                  <button
                    onClick={() => handleCopy(paste.content)}
                    className="p-2 rounded-full bg-green-500 hover:bg-green-600 transition"
                    title="Copy"
                  >
                    <Copy size={18} className="text-white" />
                  </button>

                  <button
                    onClick={() =>
                      navigator.share
                        ? navigator.share({
                            title: paste.title,
                            text: paste.content,
                          })
                        : alert("Sharing not supported in this browser")
                    }
                    className="p-2 rounded-full bg-purple-500 hover:bg-purple-600 transition"
                    title="Share"
                  >
                    <Share2 size={18} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="text-gray-300 mt-3 whitespace-pre-wrap break-words border p-4 rounded-2xl bg-[#1e1e1e]">
                {paste.content}
              </div>

              {/* Date */}
              <div className="text-xs text-gray-500 mt-3 break-words">
                {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 mt-6 text-center">No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
