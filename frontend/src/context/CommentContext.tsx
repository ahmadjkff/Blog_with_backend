import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useUser } from "./userContext";

interface CommentContextType {
  comments: IComment[];
  getBlogComments: (blogId: string) => void;
  addNewComment: (blogId: string, comment: string) => void;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

interface IComment {
  comment: string;
  authorId: { username: string };
  blogId: string;
}

export function CommentProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] = useState<IComment[]>([]);
  const { token } = useUser();
  const API_URL = import.meta.env.VITE_API_URL;

  const getBlogComments = async (blogId: string) => {
    try {
      if (!blogId) return;

      const response = await fetch(`${API_URL}/comment/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) return;

      setComments(await response.json());
    } catch (error) {}
  };

  const addNewComment = async (blogId: string, comment: string) => {
    try {
      if (!blogId) return;

      const response = await fetch(`${API_URL}/comment`, {
        method: "POST",
        body: JSON.stringify({
          comment,
          blogId,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) return;

      getBlogComments(blogId);
    } catch (error) {}
  };

  return (
    <CommentContext.Provider
      value={{ comments, getBlogComments, addNewComment }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export function useComment() {
  const context = useContext(CommentContext);
  if (context === undefined) {
    throw new Error("useComment must be used within a CommentProvider");
  }
  return context;
}
