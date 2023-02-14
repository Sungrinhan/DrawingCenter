import { Shape, Text } from 'react-konva';
import React from 'react';

export const GenerateElevator = ({ props }: any) => {
  const [selected, setSelected] = React.useState<Boolean>(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <>
      <Shape
        name="Elevator"
        id="123123"
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.rect(0, 0, 50, 50);
          context.closePath();
          // (!) Konva specific method, it is very important
          context.fillStrokeShape(shape);
        }}
        // draggable
        stroke="black"
        strokeWidth={2}
        fill={selected ? 'red' : 'white'}
        onClick={handleClick}
      />
      <Text text="elevator" />
    </>
  );
};

export const GenerateGate = () => {
  const [selected, setSelected] = React.useState<Boolean>(false);

  const handleClick = () => {
    setSelected(!selected);
  };
  return (
    <>
      <Shape
        name="Gate"
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.rect(50, 50, 100, 70);
          context.closePath();
          // (!) Konva specific method, it is very important
          context.fillStrokeShape(shape);
        }}
        // draggable
        stroke="black"
        strokeWidth={2}
        fill={selected ? 'red' : 'white'}
        onClick={handleClick}
      />
      <Text x={50} y={50} text="Gate" />
    </>
  );
};

export const GenerateWorkingStage = () => {
  const [selected, setSelected] = React.useState<Boolean>(false);

  const handleClick = () => {
    setSelected(!selected);
  };
  return (
    <>
      <Shape
        name="WorkingStage"
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.rect(70, 70, 40, 40);
          context.closePath();
          // (!) Konva specific method, it is very important
          context.fillStrokeShape(shape);
        }}
        // draggable
        stroke="black"
        strokeWidth={2}
        fill={selected ? 'red' : 'white'}
        onClick={handleClick}
      />
      <Text x={70} y={70} text="Working Stage" />
    </>
  );
};

export const GenerateStairs = () => {
  const [selected, setSelected] = React.useState<Boolean>(false);

  const handleClick = () => {
    setSelected(!selected);
  };
  return (
    <>
      <Shape
        name="Stairs"
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.rect(100, 100, 30, 40);
          context.closePath();
          // (!) Konva specific method, it is very important
          context.fillStrokeShape(shape);
        }}
        // draggable
        stroke="black"
        strokeWidth={2}
        fill={selected ? 'red' : 'white'}
        onClick={handleClick}
      />
      <Text x={100} y={100} text="Stairs" />
    </>
  );
};
