/** @jsxImportSource @emotion/react */
import { Stage, Layer, Text, Star, Group, Rect, Line, Shape } from 'react-konva';
import React, { useEffect, useState, useRef, ReactDOM } from 'react';
import { GlobalLayout, StageSize, ButtonWrapper, GeneratingButton, RedButton } from '../styles/DrawKonva';
import { css } from '@emotion/react';
import { Form, Input, Button, InputNumber } from 'antd';
import useWindowDimensions from '../hooks/useWindowDimensions';

import { GenerateElevator, GenerateGate, GenerateWorkingStage, GenerateStairs } from '../KonvaShapes/GenerateShapes';

const DrawKonva = () => {
  const screenWidth = useWindowDimensions().width * 0.8;
  const screenHeight = useWindowDimensions().height * 0.8;

  const stageRef = useRef(null);

  const [vertical, setVertical] = useState<number | null>(null);
  const [horizontal, setHorizontal] = useState(null);

  const [shapes, setShapes] = useState<any[]>([]);

  const [target, setTarget] = useState(null);

  const [menuNode, setMenuNode] = useState(null);
  const [currentShape, setCurrentShape] = useState(null);

  const handleVertical = (value: any) => setVertical(value);
  const handleHorizontal = (value: any) => setHorizontal(value);

  const handleShapes = (value: any) => setShapes(value);
  const handleTarget = (value: any) => setTarget(value);

  const handleMenuNode = async (value: any) => await setMenuNode(value);
  const handleCurrentShape = (value: any) => setCurrentShape(value);

  const makeMultipleOfTen = (value: any): number => {
    if (value % 10 === 0) {
      return value;
    }
    return makeMultipleOfTen(value + 1);
  };

  const generateRacks = (vertical: number, horizontal: number) => {
    let arr: any = [];
    const start = { x: 0, y: 200 };

    for (let i = 0; i < horizontal; i++) {
      for (let j = 0; j < vertical; j++) {
        const x = start.x + (screenWidth / horizontal) * i;
        const y = start.y + 50 * j;
        arr.push(
          <Shape
            key={i}
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.rect(x, y, 10, 50);
              context.closePath();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            // draggable
            stroke="black"
            strokeWidth={2}
          />,
        );
      }
    }
    handleShapes([...shapes, ...arr]);
  };

  const makeDottedPlaid = () => {
    let newarr = [];
    let longest: number;
    if (screenHeight >= screenWidth) longest = Math.floor(screenHeight);
    else longest = Math.floor(screenWidth);

    for (let i = 1; i < longest / 10; i++) {
      newarr.push(
        <Line key={i} points={[i * 10, 0, i * 10, longest]} stroke={'grey'} strokeWidth={0.1} lineJoin={'round'} />,
        <Line key={i + 10000} points={[0, i * 10, longest, i * 10]} stroke={'grey'} strokeWidth={0.1} />,
      );
    }
    return newarr;
  };

  // 버튼 클릭시 발생하는 이벤트들
  const handleElevatorsClick = () => {
    handleShapes([...shapes, <GenerateElevator shape={GenerateElevator} />]);
  };

  const handleGatesClick = () => {
    handleShapes([...shapes, <GenerateGate />]);
  };

  const handleWorkingStageClick = () => {
    handleShapes([...shapes, <GenerateWorkingStage />]);
  };

  const handleStairsClick = () => {
    handleShapes([...shapes, <GenerateStairs />]);
  };

  const handleDeleteClick = () => {
    handleShapes(shapes.filter((shape) => !shape.selected));
  };

  const handleResetClick = () => {
    handleShapes([]);
  };

  // form 버튼 클릭시 이벤트
  const onFinish = (value: any) => {
    const horizontal = value.horizontal;
    const vertical = value.vertical;

    handleVertical(vertical);
    handleHorizontal(horizontal);

    generateRacks(vertical, horizontal);
  };

  // 마우스 오른쪽 버튼 클릭시 발생하는 이벤트들 ( 삭제 및 pulse )

  const contextMenu = (e) => {
    e.evt.preventDefault();
    if (e.target === stageRef.current) {
      // if we are on empty place of the stage we will do nothing
      return;
    }

    handleCurrentShape(e.target);
    // show menu
    menuNode.style.display = 'initial';
    let containerRect = stageRef.current.container().getBoundingClientRect();
    menuNode.style.top = containerRect.top + stageRef.current.getPointerPosition().y + 4 + 'px';
    menuNode.style.left = containerRect.left + stageRef.current.getPointerPosition().x + 4 + 'px';
  };

  document.getElementById('delete-button')?.addEventListener('click', () => {
    if (currentShape) currentShape.destroy();
  });

  // setup menu
  useEffect(() => {
    if (window) {
      handleMenuNode(document.getElementById('menu'));
      //

      window.addEventListener('click', () => {
        // hide menu
        if (menuNode) {
          menuNode.style.display = 'none';
        }
      });
    }
  }, []);

  return (
    <div>
      <GlobalLayout />
      <h1>Center 평면도 그리기</h1>
      <div
        css={css`
          display: flex;
        `}
      >
        <ButtonWrapper>
          <Form name="racks" onFinish={onFinish}>
            <Form.Item name="horizontal" required>
              <InputNumber placeholder="Horizontal" />
            </Form.Item>
            <Form.Item name="vertical" required>
              <InputNumber placeholder="Vertical" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              랙 생성하기
            </Button>
          </Form>

          <GeneratingButton onClick={handleElevatorsClick}>Elevator</GeneratingButton>
          <GeneratingButton onClick={handleGatesClick}>Gate</GeneratingButton>
          <GeneratingButton onClick={handleWorkingStageClick}>Working Stage</GeneratingButton>
          <GeneratingButton onClick={handleStairsClick}>Stairs</GeneratingButton>
          <RedButton onClick={handleDeleteClick}>Delete</RedButton>
          <RedButton onClick={handleResetClick}>Reset</RedButton>
        </ButtonWrapper>

        {/* stage */}
        <StageSize
          width={screenWidth}
          height={screenHeight}
          visible={true}
          ref={stageRef}
          // onClick={(e) => console.log('Stage Clicked', e)}
          onContextMenu={(e) => contextMenu(e)}
        >
          <Layer>
            {shapes.map((shape, i) => {
              return (
                <Group key={i} draggable onClick={(e) => handleTarget(e.target)}>
                  {shape}
                </Group>
              );
            })}
          </Layer>
          <Layer>
            {makeDottedPlaid().map((line) => {
              return line;
            })}
          </Layer>
        </StageSize>
        <div id="menu">
          <div>
            {/* <button id="pulse-button">Pulse</button> */}
            <button id="delete-button">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawKonva;
