import { BiChevronDown } from "react-icons/bi";
import { TbNotification } from "react-icons/tb";
import "./m-styles.css";

const GuildItem = () => {
  return (
    <div className="guild-list-item">
      <div className="selected-guild-pic"></div>
      <div className="selected-guild-title">Guild 1</div>
    </div>
  );
};

export const Menu = () => {
  return (
    <div className="menu">
      <div className="select-guild" tabIndex={0}>
        <div className="selected-guild">
          {/* <div className="selected-guild-pic"></div> */}
          <div className="selected-guild-title">Select a guild...</div>
          <BiChevronDown size="16" className="selected-guild-icon" />
        </div>
        <div className="guild-list">
          <GuildItem />
          <GuildItem />
          <GuildItem />
          <GuildItem />
          <GuildItem />
          <GuildItem />
          <GuildItem />
          <GuildItem />
        </div>
      </div>
      <div className="menu-profile">
        <TbNotification size="32" className="menu-notification" />
        <div className="menu-profile-highlight">
          <div className="menu-profile-pic"></div>
        </div>
      </div>
    </div>
  );
};
