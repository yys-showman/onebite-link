"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { LinkItem } from "./types";
import { createClient } from "@/utils/supabase/client";

interface AddLinkInput {
  url: string;
  title: string;
  description: string;
  thumbnail: string | null;
  folderId: string | null;
}

interface UpdateLinkInput {
  title: string;
  description: string;
  folderId: string | null;
}

interface LinksContextValue {
  links: LinkItem[];
  addLink: (input: AddLinkInput) => Promise<LinkItem>;
  deleteLink: (id: string) => void;
  updateLink: (id: string, input: UpdateLinkInput) => Promise<void>;
}

const LinksContext = createContext<LinksContextValue | null>(null);

function toLinkItem(row: {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
}): LinkItem {
  return {
    id: String(row.id),
    url: row.url,
    title: row.title ?? "",
    description: row.description ?? "",
    thumbnail: row.thumbnail_url,
    folderId: row.folder_id !== null ? String(row.folder_id) : null,
  };
}

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("links")
      .select("id, url, title, description, thumbnail_url, folder_id")
      .order("id", { ascending: false })
      .then(({ data }) => {
        if (data) {
          setLinks(data.map(toLinkItem));
        }
      });
  }, []);

  const addLink = async (input: AddLinkInput) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("links")
      .insert({
        url: input.url,
        title: input.title,
        description: input.description,
        thumbnail_url: input.thumbnail,
        folder_id: input.folderId ? Number(input.folderId) : null,
      })
      .select("id, url, title, description, thumbnail_url, folder_id")
      .single();

    if (error || !data) {
      throw error ?? new Error("링크 추가에 실패했습니다.");
    }

    const link = toLinkItem(data);
    setLinks((prev) => [link, ...prev]);
    return link;
  };

  const deleteLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const updateLink = async (id: string, input: UpdateLinkInput) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("links")
      .update({
        title: input.title,
        description: input.description,
        folder_id: input.folderId ? Number(input.folderId) : null,
      })
      .eq("id", Number(id));

    if (error) {
      throw error;
    }

    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...input } : link)),
    );
  };

  return (
    <LinksContext.Provider value={{ links, addLink, deleteLink, updateLink }}>
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
