import { useState } from "react";
import { ModeToggle } from "../theme/theme-toggle";
import { Button } from "../ui/button";
import NewIdeaModal from "../newidea/IdeaModal";
import IdeaForm from "../newidea/IdeaForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ArrowDown10,
  ArrowDownAZ,
  ArrowUpAZ,
  CopyPlus,
  ListFilter,
  Sparkles,
} from "lucide-react";

interface NavBarProps {
  handleCreateIdea: () => void;
  handleSortIdeas: (newSortOrder: "" | "date" | "alph" | "alph_rev") => void;
}

const Navbar: React.FC<NavBarProps> = ({
  handleCreateIdea,
  handleSortIdeas,
}) => {
  const [open, setOpen] = useState(false);

  const closeNewIdeaModal = () => {
    setOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full z-50 flex justify-between items-center py-1 px-4 h-19 border-b border-primary/10 bg-secondary/80 bg-opacity-80 ">
        <figure className="flex flex-col">
          <p className="font-semibold text-2xl italic tracking-widest">
            IdeaBoard
          </p>
          <p className="text-xs font-thin italic tracking-widest -translate-y-1.5">
            Technical Assessment
          </p>
        </figure>

        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                role="sort-dropdown"
                className="h-8 mt-1 flex flex-row justify-center items-center w-auto px-2 py-0 text-sm text-primary/60 tracking-widest hover:bg-transparent hover:text-primary"
              >
                <ListFilter className="h-4 w-4" />
                <p className="hidden md:inline-block md:ml-1 text-base italic font-normal">
                  sort
                </p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30 ml-10">
              <DropdownMenuLabel className="flex justify-center">
                Sort By
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSortIdeas("")}>
                <Sparkles />
                <div className="pl-5">Default</div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortIdeas("alph")}>
                <ArrowDownAZ />
                <div className="pl-5">Title A-Z</div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortIdeas("alph_rev")}>
                <ArrowUpAZ />
                <div className="pl-5">Title Z-A</div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortIdeas("date")}>
                <ArrowDown10 />
                <div className="pl-5">Date </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            size="default"
            variant="outline"
            className="mt-1 px-2"
            onClick={() => setOpen(true)}
            data-testid="create idea"
          >
            <CopyPlus className="md:hidden h-4 w-4" />
            <p className="hidden md:inline-block text-sm ">New Idea</p>
          </Button>

          <div role="themeButton">
            <ModeToggle />
          </div>
        </div>
      </nav>

      <NewIdeaModal open={open} onClose={() => setOpen(false)}>
        <IdeaForm
          closeFormModal={closeNewIdeaModal}
          handleCreateIdea={handleCreateIdea}
        />
      </NewIdeaModal>
    </>
  );
};

export default Navbar;
