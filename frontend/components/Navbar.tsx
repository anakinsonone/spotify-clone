"use client";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  HomeIcon,
  Search as MagnifyingGlassIcon,
  BellIcon,
  User,
} from "lucide-react";
import { Users } from "lucide-react";
import { ChangeEvent, useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="flex items-center">
      <Button variant="ghost" size="icon" className="rounded-3xl bg-[#1f1f1f]">
        <HomeIcon color="#ffffff" />
      </Button>
      <MagnifyingGlassIcon
        color="#ffffff"
        className="relative left-7 top-2 transform -translate-y-1/3"
      />
      <Input
        className="max-w-sm pl-10 rounded-3xl bg-[#1b1b1b]"
        onChange={handleSearchInput}
        placeholder="What do you want to play?"
        type="text"
        value={searchInput}
      />
    </div>
  );
};

const Navigation = () => {
  return (
    <div className="flex justify-between items-center">
      <ChevronLeftIcon color="#ffffff" />
      <ChevronRightIcon color="#ffffff" />
    </div>
  );
};

const Activity = () => {
  return (
    <div className="flex justify-between items-center gap-2">
      <BellIcon color="#ffffff" />
      <Users color="#ffffff" />
      <User color="#ffffff" />
    </div>
  );
};

export default function Navbar() {
  return (
    <div>
      <div className="flex justify-between items-center p-2 bg-black">
        <Navigation />
        <Search />
        <Activity />
      </div>
    </div>
  );
}
