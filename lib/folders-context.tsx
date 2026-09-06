"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Folder } from "./types";
import { mockFolders } from "./mock-data";

interface FoldersContextValue {
  folders: Folder[];
  addFolder: (name: string) => Folder;
  deleteFolder: (id: string) => void;
  renameFolder: (id: string, name: string) => void;
}

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(mockFolders);

  const addFolder = (name: string) => {
    const folder: Folder = { id: crypto.randomUUID(), name };
    setFolders((prev) => [...prev, folder]);
    return folder;
  };

  const deleteFolder = (id: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  const renameFolder = (id: string, name: string) => {
    setFolders((prev) =>
      prev.map((folder) => (folder.id === id ? { ...folder, name } : folder)),
    );
  };

  return (
    <FoldersContext.Provider
      value={{ folders, addFolder, deleteFolder, renameFolder }}
    >
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FoldersContext);
  if (!context) {
    throw new Error("useFolders must be used within a FoldersProvider");
  }
  return context;
}
