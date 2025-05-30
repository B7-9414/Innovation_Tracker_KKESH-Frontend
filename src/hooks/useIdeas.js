import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

export const useIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState(null); // For user feedback

  const fetchIdeas = async () => {
    try {
      setError(null);
      const response = await axios.get(`${API_URL}/ideas`);
      const ideasWithExtras = await Promise.all(
        response.data.map(async (idea) => {
          try {
            const commentsResponse = await axios.get(
              `${API_URL}/ideas/${idea.id}/comments`
            );
            return {
              ...idea,
              votes: idea.likes,
              comments: idea.comments_count,
              commentsList: commentsResponse.data.map((comment) => ({
                id: Date.now().toString() + Math.random(),
                text: comment.text,
                author: { name: "User" },
                createdAt: new Date(),
              })),
              author: { name: "User" },
              createdAt: new Date(),
            };
          } catch (error) {
            console.error(`Error fetching comments for idea ${idea.id}:`, error);
            return {
              ...idea,
              votes: idea.likes,
              comments: idea.comments_count || 0,
              commentsList: [],
              author: { name: "User" },
              createdAt: new Date(),
            };
          }
        })
      );
      setIdeas(ideasWithExtras);
    } catch (error) {
      console.error("Error fetching ideas:", error);
      setError("Failed to load ideas. Please try again.");
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const addIdea = async (idea) => {
    try {
      setError(null);
      console.log("Adding idea:", idea);
      const response = await fetch(`${API_URL}/ideas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(idea),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
      }
      await fetchIdeas();
    } catch (error) {
      console.error("Error adding idea:", error);
      setError("Failed to add idea. Please try again.");
      throw error;
    }
  };

  const updateIdea = async (ideaId, updatedIdea) => {
    try {
      setError(null);
      console.log("Updating idea:", ideaId, updatedIdea);
      await axios.put(`${API_URL}/ideas/${ideaId}`, updatedIdea);
      await fetchIdeas();
      return { success: true, message: "Idea updated successfully" };
    } catch (error) {
      console.error("Error updating idea:", error);
      setError("Failed to update idea. Please try again.");
      throw error;
    }
  };

  const deleteIdea = async (ideaId) => {
    try {
      setError(null);
      console.log("Deleting idea:", ideaId);
      await axios.delete(`${API_URL}/ideas/${ideaId}`);
      await fetchIdeas();
      return { success: true, message: "Idea deleted successfully" };
    } catch (error) {
      console.error("Error deleting idea:", error);
      setError("Failed to delete idea. Please try again.");
      throw error;
    }
  };

  const voteIdea = async (id) => {
    try {
      setError(null);
      const userId = crypto.randomUUID();
      console.log("Voting for idea:", id, "with userId:", userId);
      await axios.post(`${API_URL}/ideas/${id}/like?user_id=${userId}`);
      await fetchIdeas();
    } catch (error) {
      console.error("Error voting for idea:", error);
      setError("Failed to vote for idea. Please try again.");
    }
  };

  const addComment = async (ideaId, text) => {
    try {
      setError(null);
      console.log("Adding comment to idea:", ideaId, text);
      await axios.post(`${API_URL}/comments`, {
        idea_id: ideaId,
        text: text,
      });
      const response = await axios.get(`${API_URL}/ideas/${ideaId}/comments`);
      setIdeas((prevIdeas) =>
        prevIdeas.map((idea) =>
          idea.id === ideaId
            ? {
                ...idea,
                comments: response.data.length,
                commentsList: response.data.map((comment) => ({
                  id: Date.now().toString() + Math.random(),
                  text: comment.text,
                  author: {
                    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
                    name: "User",
                  },
                  createdAt: new Date(),
                })),
              }
            : idea
        )
      );
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add comment. Please try again.");
    }
  };

  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      const matchesSearch =
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || idea.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [ideas, searchQuery, selectedCategory]);

  return {
    ideas: filteredIdeas,
    addIdea,
    updateIdea,
    deleteIdea,
    voteIdea,
    addComment,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    error,
  };
};