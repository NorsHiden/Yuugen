import { BiLogoDiscordAlt, BiLogoMastercard } from "react-icons/bi";
import { GradientIcon } from "../utils";

export const LoginPage = () => {
  return (
    <div className="flex flex-row">
      <div className="h-full w-full">
        <div className="p-4">
          <GradientIcon
            Icon={BiLogoMastercard}
            startColor="#D3A78A"
            endColor="#007296"
            size="3rem"
          />
          <div className="flex flex-col justify-center pl-12 h-[75vh] w-[30rem] gap-[2rem] font-sans">
            <h1 className="w-[30rem] font-bold text-white text-4xl">
              The Place Where You Can{" "}
              <span className="text-[#D4A88B]">Control</span> Your Discord
              Server With <span className="text-[#D4A88B]">Ease</span>.
            </h1>
            <a
              className="flex justify-center items-center h-12 w-80 rounded-lg border-solid border-2 border-[#d4a88b] text-[#d4a88b] gap-[0.5rem] hover:bg-[#d4a88b] hover:text-[#002330] transition-all"
              href="/api/oauth"
            >
              <BiLogoDiscordAlt />
              Continue with Discord
            </a>
          </div>
        </div>
      </div>
      <div className="h-screen w-full bg-cover bg-no-repeat bg-[url('https://www.wallpapertip.com/wmimgs/70-702749_anime-wallpaper-art.jpg')]">
        <div className="h-screen w-full bg-gradient-to-r from-yuugenBackgroundColor to-transparent"></div>
      </div>
    </div>
  );
};
