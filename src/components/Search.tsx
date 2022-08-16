import { Input } from "antd";
import { ChangeEvent, FC, useState } from "react";

interface SearchProps {
  placeholder: string;
  handleSearch: (value: string) => void;
}
const Search: FC<SearchProps> = ({ placeholder, handleSearch }) => {
  const [value, setValue] = useState<string>("");
  return (
    <Input
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        handleSearch(event.target.value);
      }}
      placeholder={placeholder}
    />
  );
};

export default Search;
