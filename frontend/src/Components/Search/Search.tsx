import React, { ChangeEvent, SyntheticEvent, useState } from "react";

interface Props {
  onSearchSubmit: (e: SyntheticEvent) => void;
  search: string | undefined;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<Props> = ({
  onSearchSubmit,
  search,
  handleSearchChange,
}: Props): JSX.Element => {
  const [inputValue, setInputValue] = useState(search || '');

  const handleClearSearch = () => {
    setInputValue('');
    handleSearchChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <section className="relative bg-gray-100">
      <div className="max-w-xl mx-auto p-1 space-y-1">
        <form
          className="form relative flex flex-col w-full p-1 space-y-4 bg-darkBlue rounded-lg md:flex-row md:space-y-0 md:space-x-3"
          onSubmit={onSearchSubmit}
        >
          <div className="relative flex-1">
            <input
              className="w-full p-3 pr-10 border-2 rounded-lg placeholder-black focus:outline-none"
              id="search-input"
              placeholder="Search companies to follow by ticker or name"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                handleSearchChange(e);
              }}
            />
            {inputValue && (
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={handleClearSearch}
              >
                &#x2715;
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Search;
