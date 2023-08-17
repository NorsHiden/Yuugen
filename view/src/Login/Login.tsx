import { BiLogoDiscordAlt, BiLogoMastercard } from "react-icons/bi";
import { GradientIcon } from "../utils";
import "./login-styles.css";

export const LoginPage = () => {
  return (
    <div className="login">
      <div className="login-side">
        <div className="login-logo">
          <GradientIcon
            Icon={BiLogoMastercard}
            startColor="#D3A78A"
            endColor="#007296"
            size="3rem"
          />
          <div className="login-content">
            <h1 className="login-header">
              The Place Where You Can{" "}
              <span style={{ color: "#D4A88B" }}>Control</span> Your Discord
              Server With <span style={{ color: "#D4A88B" }}>Ease</span>.
            </h1>
            <div className="login-button">
              <BiLogoDiscordAlt />
              Continue with Discord
            </div>
          </div>
        </div>
      </div>
      <div className="login-cover">
        <div className="login-cover-shade"></div>
      </div>
    </div>
  );
};
