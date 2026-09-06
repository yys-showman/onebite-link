export interface Folder {
  id: string;
  name: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnail: string | null;
  folderId: string | null;
}

export interface OpenGraphInfo {
  title: string;
  description: string;
  thumbnail: string | null;
  url: string;
}
