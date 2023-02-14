import React, { useEffect } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import GenerateElevator from '../KonvaShapes/GenerateShapes';

function MyShape(props) {
  const [selected, setSelected] = React.useState(false);

  function handleClick() {
    setSelected(!selected);
  }

  return <Rect x={0} y={0} width={50} height={50} fill={selected ? 'red' : 'blue'} onClick={handleClick} />;
}

function MyCanvas() {
  const [shapes, setShapes] = React.useState<any[]>([]);

  useEffect(() => {
    setShapes([...shapes, ...Array(10)]);
  }, []);

  function deleteSelectedShape() {
    setShapes(shapes.filter((shape) => !shape.selected));
  }

  return (
    <div>
      <Stage width={500} height={500}>
        <Layer>
          {shapes.map((shape, index) => (
            <MyShape key={index} shape={shape} />
          ))}
        </Layer>
      </Stage>
      <button onClick={deleteSelectedShape}>Delete selected shape</button>
    </div>
  );
}

export default MyCanvas;
