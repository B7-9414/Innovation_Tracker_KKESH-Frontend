import IdeaCard from './IdeaCard';

const IdeaList = ({ ideas, onVote, onAddComment,onUpdateIdea, onDeleteIdea, }) => {
  if (ideas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <svg
          className="w-16 h-16 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <p className="text-xl font-medium">No ideas found</p>
        <p className="mt-2">Try adjusting your search or category filter</p>
      </div>
    );
  }

  return (
    <div>
      {ideas.map((idea) => (
        <IdeaCard 
          key={idea.id} 
          idea={idea} 
          onVote={onVote}
          onAddComment={onAddComment}
          onUpdateIdea={onUpdateIdea}
          onDeleteIdea={onDeleteIdea}
        />
      ))}
    </div>
  );
};

export default IdeaList;