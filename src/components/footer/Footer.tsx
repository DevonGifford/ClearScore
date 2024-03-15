import { ExternalLink, Github, Linkedin, UserSquare } from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="hidden lg:flex w-full justify-between items-center py-2 px-4 h-16 bg-transparent fixed z-50 bottom-0">
        <a
          href="https://github.com/DevonGifford/ClearScore"
          target="_blank"
          aria-label="Link to source code"
        >
          <div className="hidden sm:flex flex-row gap-2 transition ease-in-out duration-150 hover:scale-110 text-zinc-500 hover:text-primary ">
            <span className="block text-xs">Project Source Code</span>
            <ExternalLink size={10} className=" translate-y-1" />
          </div>
        </a>
        <div className="flex flex-col gap-1 mr-2 ">
          <div className="flex flex-row gap-6 text-zinc-500">
            <a
              target="_blank"
              href="https://devongifford.vercel.app/"
              className="transition ease-in-out duration-150 hover:scale-110 hover:text-primary "
              aria-label="Visit Devon's Portfolio website"
            >
              <UserSquare size={16} />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/dbgifford/"
              className="transition ease-in-out duration-150 hover:scale-110 hover:text-primary "
              aria-label="Visit Devon's LinkedIn profile"
            >
              <Linkedin size={16} />
            </a>
            <a
              target="_blank"
              href="https://github.com/DevonGifford"
              className="transition ease-in-out duration-150 hover:scale-110 hover:text-primary "
              aria-label="Visit Devon's GitHub profile"
            >
              <Github size={16} />
            </a>
          </div>
          <p className="text-center text-xs tracking-wide text-zinc-500">
            by Devon Gifford
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
