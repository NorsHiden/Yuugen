import { BiMenu } from "react-icons/bi";

export const NavBar = () => {
  return (
    <nav className="fixed z-50 bg-gradient-to-b from-[rgb(0,11,15,0.5)] to-transparent">
      <div className="flex flex-row w-screen h-16 items-center">
        <div className="ml-2 text-5xl">
          <BiMenu />
        </div>
        <div className="ml-auto mr-4 md:mr-8">
          <div className="h-10 w-10 bg-white rounded-md" />
        </div>
      </div>
    </nav>
  );
};
