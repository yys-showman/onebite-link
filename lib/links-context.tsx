"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { LinkItem } from "./types";
import { mockLinks } from "./mock-data";

interface AddLinkInput {
  url: string;
  title: string;
  description: string;
  thumbnail: string | null;
  folderId: string | null;
}

interface LinksContextValue {
  links: LinkItem[];
  addLink: (input: AddLinkInput) => LinkItem;
  deleteLink: (id: string) => void;
}

const LinksContext = createContext<LinksContextValue | null>(null);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(mockLinks);

  const addLink = (input: AddLinkInput) => {
    const link: LinkItem = { id: crypto.randomUUID(), ...input };
    setLinks((prev) => [link, ...prev]);
    return link;
  };

  const deleteLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  return (
    <LinksContext.Provider value={{ links, addLink, deleteLink }}>
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinksProvider");
  }
  return context;
}
