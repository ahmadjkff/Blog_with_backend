import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useUser } from "./userContext";

interface BlogContextType {
  blogs: Blog[];
  myBlogs: Blog[];
  blog: Blog | undefined;
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
  fetchblogs: () => void;
  fetchMyBlogs: () => void;
  addBlog: (title: string, content: string, img: string) => void;
  fetchBlog: (id: string) => Promise<boolean | undefined>;
  deleteBlog: (id: string) => void;
  editBlog: (id: string, title: string, content: string, img: string) => void;
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
  const [blog, setBlog] = useState<Blog>();
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

  const addBlog = async (title: string, content: string, img: string) => {
    if (!title || !content) {
      return;
    }

    const response = await fetch(`${API_URL}/blog`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        img,
      }),
    });

    if (!response.ok) return;
  };

  const fetchBlog = async (id: string) => {
    const response = await fetch(`${API_URL}/blog/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return;

    const data = await response.json();

    setBlog(data);
    return true;
  };

  const deleteBlog = async (id: string) => {
    const response = await fetch(`http://localhost:3222/blog/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const otherblogs = blogs.filter((b) => b._id !== id);
    setBlogs(otherblogs);

    if (!response.ok) return;
  };

  const editBlog = async (
    id: string,
    title: string,
    content: string,
    img: string
  ) => {
    const response = await fetch(`${API_URL}/blog/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        img,
      }),
    });

    if (!response.ok) return;
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        myBlogs,
        blog,
        setBlogs,
        fetchblogs,
        fetchMyBlogs,
        addBlog,
        fetchBlog,
        deleteBlog,
        editBlog,
      }}
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
