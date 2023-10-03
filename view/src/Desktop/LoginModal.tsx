import { FaDiscord } from "react-icons/fa";

export const LoginModal = () => {
  return (
    <div className="flex absolute items-center justify-center z-50 w-screen h-screen">
      <div className="flex absolute z-0 w-screen h-screen bg-yuugenBackgroundColor/80 backdrop-blur-sm"></div>
      <div className="flex flex-col p-8 absolute z-10 w-[45rem] bg-yuugenColorSecond drop-shadow-2xl rounded-xl gap-4">
        <h1 className="text-2xl font-gilroyBold text-white">Login</h1>
        <p className="text-lg text-white">
          It seems you're not logged in. Please login to continue using
          YuugenMusic.
        </p>
        <a href="/api/oauth" className="flex justify-center items-center">
          <div className="flex px-4 py-2 justify-center items-center gap-2 bg-yuugenColorFirst rounded-md text-yuugenColorSecond hover:brightness-110">
            <FaDiscord size="20" />
            <p className="font-gilroyMedium">Login to Discord</p>
          </div>
        </a>
      </div>
    </div>
  );
};
