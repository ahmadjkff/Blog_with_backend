import { useState, useRef, useEffect } from "react";

interface IOption {
  label: string;
  value: string;
}

interface DropdownProps {
  styles?: string;
  options?: IOption[];
  placeholder?: string;
  onSelect?: (option: IOption) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  styles,
  options = [],
  placeholder = "Select",
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<IOption | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (option: IOption) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles || "relative w-full"} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`border border-black p-3 rounded-md w-full text-start ${placeholder !== "Category" || selected ? "text-black" : "text-gray-500"}`}
      >
        {selected ? selected.label : placeholder}
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
          {options.map((option: IOption) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
