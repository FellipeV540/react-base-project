import styled from "styled-components";

const ButtonStyled = styled.article`
  padding: 10px 20px;
  background-color: var(--primaria);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;

  &:hover {
    background-color: var(--primaria-hover);
  }
`;

export const Button = function (props) {
  return (
    <ButtonStyled>
      <button onClick={props.onClick}>{props.title}</button>
    </ButtonStyled>
  );
};
const IconButtonStyled = styled.article`
  button {
    background-color: transparent;
    border: none;
    border-radius: 100px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: lightblue;
      color: var(--secundaria);
    }
    .icon {
      font-size: 20px;
    }
  }
`;

export const IconButton = function (props) {
  return (
    <IconButtonStyled>
      <button onClick={props.onClick}>
        <div className="icon">{props.children}</div>
      </button>
    </IconButtonStyled>
  );
};
