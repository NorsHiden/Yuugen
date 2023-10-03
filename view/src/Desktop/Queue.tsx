import { MdMusicOff, MdOutlineDragHandle } from "react-icons/md";
import { TbPlaylistOff } from "react-icons/tb";
import {
  BsFillPlayCircleFill,
  BsStopCircleFill,
  BsYoutube,
} from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { VscLoading } from "react-icons/vsc";
import { PiWaveformFill } from "react-icons/pi";

const Song = ({ song, index }: any) => {
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  const removeFromQueue = () => {
    if (removeLoading) return;
    axios.delete(
      `/api/voice/queue?guildId=${window.location.pathname.slice(
        1
      )}&index=${index}`
    );
    setRemoveLoading(true);
  };

  const PlayButton = () => {
    if (loading) return;
    setLoading(true);
    axios
      .post(
        `/api/voice/play-index?guildId=${window.location.pathname.slice(
          1
        )}&index=${index}`
      )
      .then(() => {
        setLoading(false);
      });
  };
  return (
    <div
      className="flex items-center min-h-[4rem] w-full font-gilroySemiBold gap-4 px-4 rounded-xl hover:bg-gradient-to-r from-yuugenColorSecond to-transparent"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-center justify-center w-12 h-4">
        <div className="flex w-10 justify-center text-lg font-gilroyExtraBold">
          {loading ? (
            <div className="animate-spin">
              <VscLoading />
            </div>
          ) : hover ? (
            <div
              onClick={PlayButton}
              className="text-2xl hover:text-yuugenColorFirst hover:scale-110 cursor-pointer"
            >
              <BsFillPlayCircleFill />
            </div>
          ) : (
            <p>{index + 1}</p>
          )}
        </div>
      </div>
      <img className="w-12 h-12 object-cover rounded-xl" src={song.thumbnail} />
      <p className="w-52 truncate overflow-hidden">{song.title}</p>
      <p className="w-36  truncate overflow-hidden">{song.author}</p>
      <p className="w-24">{song.raw_duration}</p>
      <div className="flex justify-center w-12">
        <BsYoutube />
      </div>
      <p className="w-36">{song.requester_name}</p>
      <div className="flex items-center ml-auto mr-4 gap-4">
        <div
          onClick={removeFromQueue}
          className="text-lg hover:scale-125 hover:text-white cursor-pointer transition-all"
        >
          {removeLoading ? (
            <VscLoading className="animate-spin" />
          ) : (
            <MdMusicOff />
          )}
        </div>
        <div className="text-lg hover:scale-125 hover:text-white cursor-pointer transition-all">
          <MdOutlineDragHandle />
        </div>
      </div>
    </div>
  );
};

const SelectedSong = ({ song, index }: any) => {
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  const removeFromQueue = () => {
    if (removeLoading) return;
    axios.delete(
      `/api/voice/queue?guildId=${window.location.pathname.slice(
        1
      )}&index=${index}`
    );
    setRemoveLoading(true);
  };

  const StopButton = () => {
    if (loading) return;
    setLoading(true);
    axios
      .post(`/api/voice/stop?guildId=${window.location.pathname.slice(1)}`)
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className="flex items-center min-h-[4rem] w-full font-gilroySemiBold px-4 gap-4 rounded-xl
              bg-yuugenColorSecond text-yuugenColorFirst"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-row w-12 justify-center text-2xl">
        {loading ? (
          <div className="animate-spin">
            <VscLoading />
          </div>
        ) : hover ? (
          <div
            onClick={StopButton}
            className="text-2xl hover:scale-110 cursor-pointer"
          >
            <BsStopCircleFill />
          </div>
        ) : (
          <PiWaveformFill />
        )}
      </div>
      <img className="w-12 h-12 object-cover rounded-xl" src={song.thumbnail} />
      <p className="w-52 truncate overflow-hidden">{song.title}</p>
      <p className="w-36  truncate overflow-hidden">{song.author}</p>
      <p className="w-24">{song.raw_duration}</p>
      <div className="flex justify-center w-12">
        <BsYoutube />
      </div>
      <p className="w-36">{song.requester_name}</p>
      <div className="flex items-center ml-auto mr-4 gap-4">
        <div
          onClick={removeFromQueue}
          className="text-lg hover:scale-125 hover:text-white cursor-pointer transition-all"
        >
          {removeLoading ? (
            <VscLoading className="animate-spin" />
          ) : (
            <MdMusicOff />
          )}
        </div>
        <div className="text-lg hover:scale-125 hover:text-white cursor-pointer transition-all">
          <MdOutlineDragHandle />
        </div>
      </div>
    </div>
  );
};

export const Queue = ({ queue, currentIndex, state }: any) => {
  const [clearLoading, setClearLoading] = useState(false);

  const clearQueue = () => {
    if (clearLoading || !queue.length) return;
    axios
      .delete(`/api/voice/clear?guildId=${window.location.pathname.slice(1)}`)
      .then(() => {
        setClearLoading(false);
      });
    setClearLoading(true);
  };

  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col items-center w-full pl-2">
        <div className="flex items-center px-4 w-full h-8 gap-4">
          <p className="flex w-12 justify-center font-gilroyExtraBold">#</p>
          <div className="min-w-[3rem]"></div>
          <p className="w-52">Title</p>
          <p className="w-36">Artist</p>
          <p className="w-24">Time</p>
          <p className="w-12">Plat.</p>
          <p className="w-36">Req.</p>
          <div onClick={clearQueue} className="ml-auto text-lg cursor-pointer">
            {clearLoading ? (
              <VscLoading className="animate-spin" />
            ) : (
              <TbPlaylistOff
                className={
                  !queue.length
                    ? "opacity-40"
                    : "hover:text-yuugenColorFirst hover:scale-110 transition-all"
                }
              />
            )}
          </div>
        </div>
        <div className="flex flex-col w-full h-[calc(100vh-26rem)] overflow-y-auto overflow-x-visible">
          {queue &&
            queue.map((song: any, index: number) => {
              if (index === currentIndex)
                return (
                  <SelectedSong
                    key={index}
                    index={index}
                    song={song}
                    state={state}
                  />
                );
              return <Song key={index} song={song} index={index} />;
            })}
        </div>
      </div>
    </div>
  );
};
