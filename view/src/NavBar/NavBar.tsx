import { GradientIcon } from "../utils";
import "./nb-styles.css";
import {
  BiLogOutCircle,
  BiLogoMastercard,
  BiSolidDashboard,
  BiSolidMusic,
  BiUser,
} from "react-icons/bi";

export const NavBar = () => {
  return (
    <div className="navbar">
      <GradientIcon
        Icon={BiLogoMastercard}
        startColor="#D3A78A"
        endColor="#007296"
        size="3rem"
      />
      <div className="navbar-list">
        <div className="navbar-item">
          <BiSolidDashboard size="35" />
          <div className="navbar-item-hover">Dashboard</div>
        </div>
        <div className="navbar-item">
          {/* <GradientIcon
            Icon={BiSolidMusic}
            startColor="#D3A78A"
            endColor="#007296"
            size="2rem"
          /> */}
          <BiSolidMusic size="35" />
          <div className="navbar-item-hover">Music</div>
        </div>
      </div>
      <div className="navbar-settings">
        <div className="navbar-item">
          <BiUser size="35" />
          <div className="navbar-item-hover">Account</div>
        </div>
        <div className="navbar-item">
          <BiLogOutCircle size="35" />
          <div className="navbar-item-hover">Logout</div>
        </div>
      </div>
    </div>
  );
};