import { useState } from "react";
import { LightbulbIcon } from "lucide-react";
import SubmitIdeaModal from "./SubmitIdeaModal";

const Header = ({ onSubmitIdea }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="border-b border-gray-800 bg-[#121420] py-4  flex justify-between items-center">
      <div className="flex items-center mx-4">
        <h1 className="text-white text-3xl font-bold">Innovation Tracker</h1>
      </div>

      <div className="flex gap-4 mx-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1C1D23] hover:bg-indigo-700 text-white   px-4 py-2 rounded-lg transition-colors duration-200 font-medium flex items-center"
        >
          Submit Idea
        </button>
        <a
        href="https://innovation-assistant-kkesh.streamlit.app/"
        target="_blank"
        className='bg-indigo-700 hover:bg-indigo-900 text-white   px-4 py-2 rounded-lg transition-colors duration-200 font-medium flex items-center cursor-pointer'>
          Innovation Assistant 🤖
        </a>
      </div>

      {isModalOpen && (
        <SubmitIdeaModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={onSubmitIdea}
        />
      )}
    </header>
  );
};

export default Header;
