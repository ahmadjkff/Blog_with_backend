import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useUser } from "./userContext";

interface BlogContextType {
  blogs: Blog[];
  myBlogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
  fetchblogs: () => void;
  fetchMyBlogs: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export interface Blog {
  _id: string;
  title: string;
  content: string;
  img?: string | undefined;
  createdAt: string;
  authorId: {
    username: string;
    _id: string;
  };
}

export function BlogProvider({ children }: { children: ReactNode }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [myBlogs, setMyBlogs] = useState<Blog[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const { token } = useUser();

  const fetchblogs = async () => {
    const response = await fetch(`${API_URL}/blog`);
    if (!response.ok) return;

    setBlogs(await response.json());
  };

  const fetchMyBlogs = async () => {
    const response = await fetch(`${API_URL}/blog/my-blogs`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      return;
    }

    const data = await response.json();

    setMyBlogs(data);
  };

  return (
    <BlogContext.Provider
      value={{ blogs, myBlogs, setBlogs, fetchblogs, fetchMyBlogs }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("BlogContext must be used within a BlogProvider");
  }
  return context;
}
