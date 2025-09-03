import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

const CreatePost = ({ onPostCreated = () => {} }) => {
  const {user} = useUser();
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please upload an image or a reel.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("file", file); 
    formData.append("profilePicUrl", user?.profilePicUrl); 


    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onPostCreated(res.data);
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl max-w-md mx-auto space-y-4"
    >
      {/* Custom file input */}
      <label
        htmlFor="fileUpload"
        className="cursor-pointer flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 16v-1a4 4 0 014-4h1m4-4v8m0 0l4-4m-4 4l-4-4"
          />
        </svg>
        {file
          ? file.type.startsWith("video")
            ? `Reel selected: ${file.name}`
            : `Image selected: ${file.name}`
          : "Upload image or reel"}
      </label>
      <input
        id="fileUpload"
        type="file"
        accept="image/*,video/*" // ✅ allow both
        onChange={(e) => setFile(e.target.files[0])}
        className="hidden"
      />

      {/* Caption textarea */}
      <textarea
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full resize-none border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        rows={4}
      />

      {/* Error message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold transition
          ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white"
          }
        `}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default CreatePost;
