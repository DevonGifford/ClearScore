import { useEffect, useState } from "react";
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

function App() {
  const [sortType, setSortType] = useState<"" | "date" | "alph" | "alph_rev">(
    ""
  );

  const [ideas, setIdeas] = useState<Idea[]>(() => {
    const persistedData = localStorage.getItem("IDEA_DATA");
    const initialData = persistedData ? JSON.parse(persistedData) : [];
    return initialData;
  });

  useEffect(() => {
    if (ideas.length > 0) {
      localStorage.setItem("IDEA_DATA", JSON.stringify(ideas));
    }
  }, [ideas]);

  const handleCreateIdea = (title?: string, description?: string) => {
    const lazyUid = new Date().toISOString(); //Note: wouldn't fly in production, collision risks etc.
    const newIdea = {
      uid: lazyUid,
      edited: "",
      created: lazyUid.split("T")[0],
      title: title || "",
      description: description || "",
    };
    const updatedIdeas = [newIdea, ...ideas];
    setIdeas(updatedIdeas);
    toast.success("Successfully created idea!");
  };

  const handleDeleteIdea = (uid: string) => {
    const updatedData = ideas.filter((idea) => idea.uid !== uid);
    setIdeas(updatedData);
    toast.success("Successfully deleted idea!");
  };

  const handleUpdateIdea = (
    index: number,
    title: string,
    description: string
  ) => {
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

  const sortIdeas = (data: Idea[], sortType: string) => {
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
        return data.slice();
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
          <div className="flex flex-col space-y-4 h-[30vh] md:h-[70vh] text-center items-center justify-center">
            <p className="text-base md:text-xl italic tracking-wider underline">
              Welcome to your IdeaBoard
            </p>
            <p className="text-sm italic tracking-wider">
              you don't have any ideas yet...
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
