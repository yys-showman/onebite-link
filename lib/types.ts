export interface Folder {
  id: string;
  name: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  folderId: string | null;
}
