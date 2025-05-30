import { useState, useEffect } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
} from 'lucide-react';
import { categories } from '../data/mockData';

const IdeaCard = ({ idea, onVote, onAddComment, onUpdateIdea, onDeleteIdea }) => {
  if (!idea) return null;

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: idea.title,
    description: idea.description,
    category: idea.category || categories[0],
  });
  const [notification, setNotification] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setEditForm({
      title: idea.title,
      description: idea.description,
      category: idea.category || categories[0],
    });
  }, [idea]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(idea.id, newComment);
      setNewComment('');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (editForm.title.trim() && editForm.description.trim() && editForm.category) {
      try {
        const result = await onUpdateIdea(idea.id, {
          title: editForm.title,
          description: editForm.description,
          category: editForm.category,
          likes: idea.votes,
        });
        setIsEditing(false);
        showNotification(result.message);
      } catch (error) {
        showNotification("Failed to update idea", "error");
      }
    } else {
      showNotification("Please fill all fields", "error");
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      title: idea.title,
      description: idea.description,
      category: idea.category || categories[0],
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      const result = await onDeleteIdea(idea.id);
      setIsDeleteDialogOpen(false);
      showNotification(result.message);
    } catch (error) {
      setIsDeleteDialogOpen(false);
      showNotification("Failed to delete idea", "error");
    }
  };

  return (
    <div className="bg-[#191A21] rounded-lg p-5 mx-4 mb-4 border border-gray-800 hover:border-gray-700 transition-all duration-200 group">
      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg text-white ${
            notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Display Idea */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-indigo-400 transition-colors">
            {idea.title}
          </h3>
          <p className="text-gray-300 mb-4">{idea.description}</p>
        </div>
        {idea.category && (
          <span className="bg-indigo-900/60 text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
            {idea.category}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onVote(idea.id)}
            className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors"
          >
            <ThumbsUp className="h-5 w-5 mr-1" />
            <span>{idea.votes}</span>
          </button>
          <button
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors"
          >
            <MessageSquare className="h-5 w-5 mr-1" />
            <span>{idea.comments}</span>
            {isCommentsOpen ? (
              <ChevronUp className="h-4 w-4 ml-1" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-1" />
            )}
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors"
          >
            <Edit2 className="h-5 w-5 mr-1" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="flex items-center text-gray-400 hover:text-red-400 transition-colors"
          >
            <Trash2 className="h-5 w-5 mr-1" />
            <span>Delete</span>
          </button>
        </div>
        <span className="text-gray-500 text-sm">
          {new Date(idea.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Comments Section */}
      {isCommentsOpen && (
        <div className="mt-4 border-t border-gray-800 pt-4">
          <div className="space-y-4 mb-4">
            {idea.commentsList.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-300">
                      {comment.author.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmitComment} className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-[#121420] text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#191A21] rounded-lg p-6 max-w-lg w-full border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Edit Idea</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                placeholder="Idea title"
                className="w-full bg-[#121420] text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                placeholder="Idea description"
                className="w-full bg-[#121420] text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
              />
              <select
                name="category"
                value={editForm.category}
                onChange={handleEditChange}
                className="w-full bg-[#121420] text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories?.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#191A21] rounded-lg p-6 max-w-sm w-full border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Delete Idea</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete "{idea.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaCard;
