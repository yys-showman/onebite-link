"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Folder } from "./types";
import { createClient } from "@/utils/supabase/client";

interface FoldersContextValue {
  folders: Folder[];
  addFolder: (name: string) => Promise<Folder>;
  deleteFolder: (id: string) => Promise<void>;
  renameFolder: (id: string, name: string) => Promise<void>;
}

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("folders")
      .select("id, name")
      .order("id", { ascending: true })
      .then(({ data }) => {
        if (data) {
          setFolders(data.map((row) => ({ id: String(row.id), name: row.name })));
        }
      });
  }, []);

  const addFolder = async (name: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("folders")
      .insert({ name })
      .select("id, name")
      .single();

    if (error || !data) {
      throw error ?? new Error("폴더 추가에 실패했습니다.");
    }

    const folder: Folder = { id: String(data.id), name: data.name };
    setFolders((prev) => [...prev, folder]);
    return folder;
  };

  const deleteFolder = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("folders")
      .delete()
      .eq("id", Number(id));

    if (error) {
      throw error;
    }

    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  const renameFolder = async (id: string, name: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("folders")
      .update({ name })
      .eq("id", Number(id));

    if (error) {
      throw error;
    }

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
