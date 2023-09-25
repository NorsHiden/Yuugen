export const NowPlaying = () => {
  return (
    <div className="flex w-full h-60">
      <div className="flex z-10 items-center pt-16 space-x-8 ml-8 overflow-hidden">
        <img
          className="w-32 h-32 object-cover rounded-2xl drop-shadow-xl"
          src="https://i1.sndcdn.com/artworks-M8Wi9lt9SqthzRKr-glE10g-t500x500.jpg"
          alt="Album Art"
        />
        <div className="w-full space-y-1 overflow-hidden">
          <p className="text-2xl font-bold text-white truncate">夜に駆ける</p>
          <p className="text-xl font-normal text-white truncate">YOASOBI</p>
          <p className="text-l font-light text-white truncate">04:21</p>
          <div className="flex items-center space-x-2">
            <img
              className="w-4 h-4 object-cover rounded-full"
              src="https://i1.sndcdn.com/artworks-M8Wi9lt9SqthzRKr-glE10g-t500x500.jpg"
              alt="Requester Avatar"
            />
            <p className="text-l font-light text-white max-w-sm truncate">
              Starlight
            </p>
          </div>
        </div>
      </div>
      <img
        className="absolute w-full h-60 object-cover blur-2xl opacity-80"
        src="https://i1.sndcdn.com/artworks-M8Wi9lt9SqthzRKr-glE10g-t500x500.jpg"
        alt="Background Image"
      />
    </div>
  );
};
