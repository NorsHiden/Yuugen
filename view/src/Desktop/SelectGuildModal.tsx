export const GuildSelectModal = ({ guilds }: any) => {
  return (
    <div className="flex absolute items-center justify-center z-50 w-screen h-screen text-white">
      <div className="flex absolute z-0 w-screen h-screen bg-yuugenBackgroundColor/80 backdrop-blur-sm"></div>
      <div className="flex flex-col p-8 absolute z-10 w-[45rem] bg-yuugenColorSecond drop-shadow-2xl rounded-xl gap-4">
        <h1 className="text-2xl font-gilroyBold">Guild Select</h1>
        <div className="flex flex-col w-full h-56 overflow-y-auto ">
          {guilds.map((guild: any) => (
            <a
              href={`/${guild.id}`}
              className="flex items-center w-full h-12 px-2 py-8 gap-4 font-gilroyMedium rounded-lg cursor-pointer hover:bg-gradient-to-r hover:text-yuugenColorSecond from-yuugenColorFirst to-transparent"
            >
              <img
                src={
                  guild.icon
                    ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`
                    : "https://cdn.discordapp.com/embed/avatars/0.png"
                }
                className="w-10 h-10 bg-white rounded-lg"
              />
              <p>{guild.name}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
