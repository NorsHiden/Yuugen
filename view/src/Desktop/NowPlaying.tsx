export const NowPlaying = () => {
  return (
    <div className="flex relative min-w-[32rem] h-full rounded-2xl">
      <div
        className="flex absolute z-10 w-full h-full rounded-r-2xl  bg-cover bg-center opacity-75"
        style={{
          backgroundImage:
            "url(https://i.ytimg.com/vi/qpx8HJAYb8k/maxresdefault.jpg)",
        }}
      />
      <div className="flex absolute z-10 w-full h-full rounded-r-2xl bg-gradient-to-r from-yuugenBackgroundColor to-transparent" />
      <div className="flex flex-col z-20 ml-4 mt-2">
        <h1 className="font-gilroyBold text-2xl text-white mb-4">
          Now Playing
        </h1>
        <p>The ArtistVEVO</p>
        <p className="font-gilroyBold text-xl text-white h-24 overflow-hidden">
          The Most Iconic Song You’ll Ever Hear In Your Life (Music Video)
        </p>
        <p className="flex mt-auto mb-2 font-gilroyBold text-white text-xs">
          Requested By Starlight
        </p>
      </div>
    </div>
  );
};
