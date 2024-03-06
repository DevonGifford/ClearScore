import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import Navbar from "./components/navbar/Navbar";
import IdeaCard from "./components/ideacard/IdeaCard";
import Footer from "./components/footer/Footer";

type Idea = {
  uid: string;
  title: string;
  description: string;
  created: string;
  edited: string;
};

type SortType = '' | 'date' | 'alph' | 'alph_rev';

function App() {
  const [sortType, setSortType] = useState<SortType>("");

  const [ideas, setIdeas] = useState<Idea[]>(() => {
    const persistedData = localStorage.getItem("IDEA_DATA");
    return persistedData ? JSON.parse(persistedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("IDEA_DATA", JSON.stringify(ideas));
  }, [ideas]);

  const handleCreateIdea = (title: string = '', description: string = '') => {
    const newIdea = {
      uid: nanoid(),
      edited: "",
      created: new Date().toISOString().split("T")[0],
      title: title,
      description: description,
    };
    setIdeas([newIdea, ...ideas]);
    toast.success("Successfully created idea!");
  };

  const handleDeleteIdea = (uid: string) => {
    const updatedData = ideas.filter((idea) => idea.uid !== uid);
    setIdeas(updatedData);
    toast.success("Successfully deleted idea!");
  };

  const handleUpdateIdea = ( index: number, title: string, description: string) => {
    const updatedData = [...ideas];
    updatedData[index] = {
      ...updatedData[index],
      title,
      description,
      edited: new Date().toISOString().split("T")[0],
    };
    setIdeas(updatedData);
    toast.success("Successfully updated idea!");
  };

  const handleSortIdeas = (newSortOrder: "" | "date" | "alph" | "alph_rev") => {
    setSortType(newSortOrder);
    toast.success("Sort successfully applied!", { position: "top-center" });
  };

  const sortIdeas = (data: Idea[], sortType: SortType) => {
    switch (sortType) {
      case "alph":
        return data.sort((a, b) => a.title.localeCompare(b.title));
      case "alph_rev":
        return data.sort((a, b) => b.title.localeCompare(a.title));
      case "date":
        return data.sort((a, b) => {
          const dateA = a.edited || a.created;
          const dateB = b.edited || b.created;
          return new Date(dateA).getTime() - new Date(dateB).getTime();
        });
      default:
        return [...data];
    }
  };

  const sortedIdeas = sortIdeas(ideas, sortType);  

  return (
    <div className="h-full">
      <Navbar
        handleCreateIdea={handleCreateIdea}
        handleSortIdeas={handleSortIdeas}
      />
      <main className="flex justify-center flex-row flex-wrap gap-8 pb-10 pt-24 mx-10">
        {sortedIdeas.length > 0 ? (
          sortedIdeas.map((item, index) => (
            <IdeaCard
              {...item}
              index={index}
              key={item.uid}
              created={item.created}
              edited={item.edited}
              title={item.title}
              description={item.description}
              handleDeleteIdea={() => handleDeleteIdea(item.uid)}
              handleUpdateIdea={(index, title, description) =>
                handleUpdateIdea(index, title, description)
              }
              data-testid="idea-cards"
            />
          ))
        ) : (
          <section className="flex flex-col space-y-4 h-[30vh] md:h-[70vh] text-center items-center justify-center">
            <h2 className="text-base md:text-xl italic tracking-wider underline">
              Welcome to your IdeaBoard
            </h2>
            <p className="text-sm italic tracking-wider">
              you don't have any ideas yet...
            </p>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
