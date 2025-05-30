import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import IdeaList from "../components/IdeaList";
import { useIdeas } from "../hooks/useIdeas";
import { categories } from "../data/mockData";

const Home = () => {
  
  const {
    ideas,
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
  } = useIdeas();

  return (
    <div className="min-h-screen bg-[#1C1D23] text-white p-8">
      <main className="container mx-auto  py-6 max-w-5xl bg-[#15161C] rounded-lg shadow-lg">
        <Header onSubmitIdea={addIdea} />

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        <IdeaList ideas={ideas} onVote={voteIdea} onAddComment={addComment} onUpdateIdea={updateIdea} onDeleteIdea={deleteIdea} />
      </main>
    </div>
  );
};

export default Home;
