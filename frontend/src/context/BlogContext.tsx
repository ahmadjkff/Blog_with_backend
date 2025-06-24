import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useUser } from "./userContext";

interface BlogContextType {
  blogs: Blog[];
  myBlogs: Blog[];
  blog: Blog | undefined;
  error: string | null;
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
  fetchblogs: () => void;
  fetchMyBlogs: () => void;
  addBlog: (
    title: string,
    content: string,
    category: string,
    img: string
  ) => Promise<boolean | undefined>;
  fetchBlog: (id: string) => Promise<boolean | undefined>;
  deleteBlog: (id: string) => void;
  editBlog: (
    id: string,
    title: string,
    content: string,
    category: string,
    img: string
  ) => Promise<boolean | undefined>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
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
  const [error, setError] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const { token } = useUser();

  const fetchblogs = async () => {
    try {
      const response = await fetch(`${API_URL}/blog`);
      if (!response.ok) {
        setError("Failed to fetch blogs");
        return;
      }

      setBlogs(await response.json());
      setError(null);
    } catch (error: any) {
      setError(error.message);
      console.log("Failed to fetch blogs: ", error);
    }
  };

  const fetchMyBlogs = async () => {
    try {
      const response = await fetch(`${API_URL}/blog/my-blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      setMyBlogs(data);
    } catch (error: any) {
      setError(error.message);
      console.log("Failed to fetch blogs: ", error);
    }
  };

  const addBlog = async (
    title: string,
    content: string,
    category: string,
    img: string
  ): Promise<boolean> => {
    try {
      if (!title || !content || !category) {
        setError("All fields are required");
        return false;
      }

      const response = await fetch(`${API_URL}/blog`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, category, img }),
      });

      if (!response.ok) {
        setError("Failed to add blog");
        return false;
      }

      setError(null);
      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  const fetchBlog = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        setError("failed to get the blog");
        return;
      }

      const data = await response.json();

      setBlog(data);
      setError(null);
      return true;
    } catch (error: any) {
      setError(error.message);
      console.log("Failed to fetch blogs: ", error);
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/blog/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const otherblogs = blogs.filter((b) => b._id !== id);
      setBlogs(otherblogs);

      if (!response.ok) {
        setError("failed to deleted the blog, pleas try again");
        return;
      }

      setError(null);
    } catch (error: any) {
      setError(error.message);
      console.log("Failed to fetch blogs: ", error);
    }
  };

  const editBlog = async (
    id: string,
    title: string,
    content: string,
    category: string,
    img: string
  ) => {
    try {
      const response = await fetch(`${API_URL}/blog/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          category,
          img,
        }),
      });

      if (!response.ok) {
        setError("Failed to edit blog, try again later");
        return false;
      }

      setError(null);
      return true;
    } catch (error: any) {
      setError(error.message);
      console.log("Failed to fetch blogs: ", error);
      return false;
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        myBlogs,
        blog,
        error,
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
