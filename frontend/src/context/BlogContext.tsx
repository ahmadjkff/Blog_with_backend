import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useUser } from "./userContext";

interface BlogContextType {
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
  fetchblogs: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

interface Blog {
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
  const { token } = useUser();

  const fetchblogs = async () => {
    const response = await fetch(`http://localhost:3222/blog`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) return;

    setBlogs(await response.json());
  };

  return (
    <BlogContext.Provider value={{ blogs, setBlogs, fetchblogs }}>
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
