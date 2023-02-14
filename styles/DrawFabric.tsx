import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { Stage } from 'react-konva';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';

export const GlobalLayout = () => (
  <Global
    styles={css`
      body {
        background-color: rgb(245, 246, 247);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}
  />
);

export const Canvas = styled(FabricJSCanvas)`
  border: 1px solid black;
  display: inline-block;
  width: 500px;
  height: 500px;
`;

export const StageSize = styled(Stage)`
  border: 1px solid black;
`;
