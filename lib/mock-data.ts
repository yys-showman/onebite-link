import { Folder, LinkItem } from "./types";

export const mockFolders: Folder[] = [
  { id: "dev", name: "개발" },
  { id: "design", name: "디자인" },
  { id: "reading", name: "읽을거리" },
];

export const mockLinks: LinkItem[] = [
  {
    id: "1",
    title: "Next.js Docs",
    url: "https://nextjs.org/docs",
    description: "Next.js의 최신 기능과 API를 확인할 수 있는 공식 문서입니다.",
    folderId: "dev",
  },
  {
    id: "2",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "웹 표준과 브라우저 API를 정리해둔 참고 문서 모음입니다.",
    folderId: "dev",
  },
  {
    id: "3",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "유틸리티 클래스 기반으로 빠르게 UI를 만들 수 있는 CSS 프레임워크입니다.",
    folderId: "dev",
  },
  {
    id: "4",
    title: "Dribbble",
    url: "https://dribbble.com",
    description: "디자이너들의 포트폴리오와 최신 UI 트렌드를 구경할 수 있는 사이트입니다.",
    folderId: "design",
  },
  {
    id: "5",
    title: "Coolors",
    url: "https://coolors.co",
    description: "빠르게 색상 팔레트를 만들고 조합해볼 수 있는 도구입니다.",
    folderId: "design",
  },
  {
    id: "6",
    title: "Overreacted",
    url: "https://overreacted.io",
    description: "댄 아브라모프의 개발 관련 인사이트를 담은 블로그입니다.",
    folderId: "reading",
  },
  {
    id: "7",
    title: "Hacker News",
    url: "https://news.ycombinator.com",
    description: "개발자들이 즐겨 찾는 기술 뉴스와 토론 커뮤니티입니다.",
    folderId: "reading",
  },
  {
    id: "8",
    title: "GitHub",
    url: "https://github.com",
    description: "코드를 저장하고 협업할 수 있는 대표적인 개발 플랫폼입니다.",
    folderId: null,
  },
];
