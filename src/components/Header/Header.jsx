import { Link } from "react-router-dom";
import { Top } from "./Style";
import Dropdown from "../Dropdown/Dropdown";
import styled from "styled-components";

const HeaderStyled = styled.div`

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 30px;
  .left{
    display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
    height: 100px
    
  }

  .logo {
    width: 200px;
    height: auto;
  }
`;

const Header = () => (
  <HeaderStyled>
    <div className="left">
    <img
      className="logo"
      src={process.env.PUBLIC_URL + "imagens/DosimagemLOGO.png"}
      alt="Logo"
    />
      <Dropdown />
    </div>

    <div className="login">
      {window.sessionStorage.getItem("accessToken") ? (
        <Link to="/logout">Logout</Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  </HeaderStyled>
);

export default Header;
