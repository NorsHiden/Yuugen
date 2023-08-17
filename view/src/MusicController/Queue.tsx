import { BiLogoYoutube, BiTime, BiTrash, BiUserCircle } from "react-icons/bi";
import { MdDragHandle } from "react-icons/md";

const QueueItem = () => {
  return (
    <div className="music-queue-item">
      <div className="music-queue-item-num">1</div>
      <div className="music-queue-item-pic"></div>
      <div>
        <div className="music-queue-item-title">
          【2023年 最新】YOASOBI メドレー 全曲 アイドル 最新
        </div>
        <div className="music-queue-item-artist">Artist</div>
      </div>
      <div className="music-queue-item-duration">
        <BiTime size="24" className="music-queue-item-duration-icon" />
        <div className="music-queue-item-duration-time">3:30</div>
      </div>
      <div className="music-queue-item-source">
        <BiLogoYoutube size="24" />
      </div>
      <div className="music-queue-item-requester">
        <BiUserCircle size="24" />
        <div className="music-queue-item-requester-name">StarLight</div>
      </div>
      <BiTrash size="24" className="music-queue-item-remove" />
      <MdDragHandle size="24" className="music-queue-item-drag" />
    </div>
  );
};

export const Queue = () => {
  return (
    <div className="music-queue">
      <div className="music-header">Queue</div>
      <div className="music-queue-list">
        <QueueItem />
        <QueueItem />
        <QueueItem />
        <QueueItem />
        <QueueItem />
        <QueueItem />
        <QueueItem />
        <QueueItem />
        <QueueItem />
        <QueueItem />
        <QueueItem />
        <QueueItem />
      </div>
    </div>
  );
};
