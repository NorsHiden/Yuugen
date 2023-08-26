import { GradientIcon } from "../utils";
import {
  BiLogOutCircle,
  BiLogoMastercard,
  BiSolidDashboard,
  BiSolidMusic,
  BiUser,
} from "react-icons/bi";

export const NavBar = () => {
  return (
    <div className="flex flex-col items-center z-10 w-16 pt-2">
      <GradientIcon
        Icon={BiLogoMastercard}
        startColor="#D3A78A"
        endColor="#007296"
        size="2rem"
      />
      <div className="flex flex-col pt-8 gap-4">
        <div className="group relative">
          <div className="transition-all duration-200 text-white hover:text-[#d3a78a] hover:scale-110 cursor-pointer">
            <BiSolidDashboard size="25" />
            <div className="flex absolute bg-[#001a23] text-xs font-medium text-white p-2 rounded-lg translate-x-[35px] translate-y-[-20px] opacity-0 pointer-events-none transition-all duration-200 group-hover:block group-hover:z-10 group-hover:opacity-100 group-hover:-translate-y-[28px]">
              Dashboard
            </div>
          </div>
        </div>
        <div className="group relative">
          <div className="transition-all duration-200 text-white hover:text-[#d3a78a] hover:scale-110 cursor-pointer">
            <GradientIcon
              Icon={BiSolidMusic}
              startColor="#D3A78A"
              endColor="#007296"
              size="1.7rem"
            />
            <div className="flex absolute bg-[#001a23] text-xs font-medium text-white p-2 rounded-lg translate-x-[35px] translate-y-[-20px] opacity-0 pointer-events-none transition-all duration-200 group-hover:block group-hover:z-10 group-hover:opacity-100 group-hover:-translate-y-[28px]">
              Music
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-auto mb-6 gap-6">
        <div className="group relative">
          <div className="transition-all duration-200 text-white hover:text-[#d3a78a] hover:scale-110 cursor-pointer">
            <BiUser size="25" />
            <div className="flex absolute bg-[#001a23] text-xs font-medium text-white p-2 rounded-lg translate-x-[35px] translate-y-[-20px] opacity-0 pointer-events-none transition-all duration-200 group-hover:block group-hover:z-10 group-hover:opacity-100 group-hover:-translate-y-[28px]">
              Account
            </div>
          </div>
        </div>
        <div className="group relative">
          <a
            className="transition-all duration-200 text-white hover:text-[#d3a78a] hover:scale-110 cursor-pointer"
            href="/api/oauth/logout"
          >
            <BiLogOutCircle size="25" />
            <div className="flex absolute bg-[#001a23] text-xs font-medium text-white p-2 rounded-lg translate-x-[35px] translate-y-[-20px] opacity-0 pointer-events-none transition-all duration-200 group-hover:block group-hover:z-10 group-hover:opacity-100 group-hover:-translate-y-[28px]">
              Logout
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
