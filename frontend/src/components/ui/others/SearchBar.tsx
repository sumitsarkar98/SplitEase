import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="hidden md:flex items-center bg-slate-100 px-3 py-2 rounded-lg">
      <FiSearch className="text-slate-400 mr-2" />
      <input
        type="text"
        placeholder="Search transactions..."
        className="bg-transparent outline-none text-sm text-slate-600 placeholder-slate-400 w-52"
      />
    </div>
  );
};

export default SearchBar;
