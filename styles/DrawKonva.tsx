import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { Stage } from 'react-konva';
import { Button } from 'antd';

export const GlobalLayout = () => (
  <Global
    styles={css`
      body {
        background-color: rgb(245, 246, 247);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #menu {
        display: none;
        position: absolute;
        width: 60px;
        background-color: white;
        box-shadow: 0 0 5px grey;
        border-radius: 3px;
      }

      #menu button {
        width: 100%;
        background-color: white;
        border: none;
        margin: 0;
        padding: 10px;
      }

      #menu button:hover {
        background-color: lightgray;
      }
    `}
  />
);

export const LinkButton = styled.div`
  display: inline-block;
`;

export const StageSize = styled(Stage)`
  border: 1px solid black;
`;

export const ButtonWrapper = styled.div`
  margin-right: 10px;
  width: auto;
  display: flex;
  flex-direction: column;
`;

export const GeneratingButton = styled(Button)`
  margin-top: 10px;
`;

export const RedButton = styled(Button)`
  margin-top: 10px;
  background-color: red;
`;

export const BlackButton = styled(Button)`
  margin-top: 10px;
  background-color: black;
  color: white;
`;
