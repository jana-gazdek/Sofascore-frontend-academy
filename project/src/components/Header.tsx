"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <header>
      <div>
        <Link href="/">
          Sofa za sirotinju
        </Link>
      </div>
      <nav>
        <Link href="/">Home</Link>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search teams, players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            Search
          </button>
        </form>
      </nav>
      <ThemeToggle />
    </header>
  );
}