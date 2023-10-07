import React, { useState, useEffect } from 'react';

const WheelComponent = ({
  segments,
  segColors,
  winningSegment,
  onFinished,
  primaryColor = 'black',
  contrastColor = 'white',
  buttonText = 'Spin',
  isOnlyOnce = true,
  size = 290,
  upDuration = 100,
  downDuration = 1000,
  fontFamily = 'proxima-nova'
}) => {
  let currentSegment = '';
  let isStarted = false;
  const [isFinished, setFinished] = useState(false);
  let timerHandle = 0;
  const timerDelay = segments.length;
  let angleCurrent = 0;
  let angleDelta = 0;
  let canvasContext = null;
  let maxSpeed = (2 * Math.PI) / segments.length;
  const upTime = segments.length * upDuration;
  const downTime = segments.length * downDuration;
  let spinStart = 0;
  let frames = 0;
  const centerX = size;
  const centerY = size;

  useEffect(() => {
    wheelInit();
  }, []);

  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const initCanvas = () => {
    const canvas = document.getElementById('canvas');
    canvas.addEventListener('click', spin, false);
    canvasContext = canvas.getContext('2d');
  };

  const spin = () => {
    isStarted = true;
    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      maxSpeed = (2 * Math.PI) / segments.length;
      frames = 0;
      timerHandle = setInterval(onTimerTick, timerDelay);
    }
  };

  const onTimerTick = () => {
    frames++;
    draw();
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;

    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      if (winningSegment) {
        if (currentSegment === winningSegment && frames > segments.length) {
          progress = duration / upTime;
          angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          progress = duration / downTime;
          angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }

      if (progress >= 1) finished = true;
    }

    angleCurrent += angleDelta;
    while (angleCurrent >= 2 * Math.PI) angleCurrent -= 2 * Math.PI;

    if (finished) {
      setFinished(true);
      onFinished(currentSegment);
      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
    }
  };

  const wheelDraw = () => {
    clear();
    drawWheel();
  };

  const draw = () => {
    clear();
    drawWheel();
  };

  const drawSegment = (key, lastAngle, angle) => {
    const ctx = canvasContext;
    const value = segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segColors[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor;
    ctx.font = 'bold 1em ' + fontFamily;
    ctx.fillText(value.substr(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = segments.length;
    const PI2 = 2 * Math.PI;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = '1em ' + fontFamily;

    for (let i = 1; i <= len; i++) {
      const angle = (PI2 * i) / len + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw a center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = primaryColor;
    ctx.lineWidth = 10;
    ctx.strokeStyle = contrastColor;
    ctx.fill();
    ctx.font = 'bold 1em ' + fontFamily;
    ctx.fillStyle = contrastColor;
    ctx.textAlign = 'center';
    ctx.fillText(buttonText, centerX, centerY + 3);
    ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = primaryColor;
    ctx.stroke();
  };

  const clear = () => {
    const ctx = canvasContext;
    ctx.clearRect(0, 0, 2 * size, 2 * size);
  };

  return (
    <div
      id="wheel"
      className="flex justify-center items-center text-center"
      style={{
        width: '100%', // Use 100% width to make it responsive
        maxWidth: '500px', // You can adjust the maximum width as needed
        margin: '0 auto', // Center align the wheel component
      }}
    >
      <canvas
        id="canvas"
        width={`${2 * size}`}
        height={`${2 * size}`}
        style={{
          pointerEvents: isFinished && isOnlyOnce ? 'none' : 'auto',
          maxWidth: '100%', // Ensure the canvas doesn't exceed its container's width
        }}
      />
    </div>
  );
};

export default WheelComponent;
