import React from 'react';

import './index.css';

function Banner() {
  const parallaxRef = React.useRef(null);
  const firstRef = React.useRef(null);
  const secondRef = React.useRef(null);
  const thirdRef = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });

  const forFirst = 40;
  const forSecond = 20;
  const forThird = 10;

  const speed = 0.05;

  React.useEffect(() => {
    const setMouseParallaxStyle = () => {
      const distX = coords.x - position.x;
      const distY = coords.y - position.y;

      setPosition((prevPosition) => ({
        x: prevPosition.x + distX * speed,
        y: prevPosition.y + distY * speed
      }));
    };

    const animationFrameId = requestAnimationFrame(setMouseParallaxStyle);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [coords, position.x, position.y, speed]);

  React.useEffect(() => {
    if (!firstRef.current || !secondRef.current || !thirdRef.current) {
      return;
    }

    firstRef.current.style.transform = `translate(${position.x / forFirst}%, ${
      position.y / forFirst
    }%)`;
    secondRef.current.style.transform = `translate(${position.x / forSecond}%, ${
      position.y / forSecond
    }%)`;
    thirdRef.current.style.transform = `translate(${position.x / forThird}%, ${
      position.y / forThird
    }%)`;
  }, [forFirst, forSecond, forThird, position.x, position.y]);

  const handleMouseMove = (event) => {
    const { offsetWidth: parallaxWidth, offsetHeight: parallaxHeight } = parallaxRef.current;

    const coordX = event.pageX - parallaxWidth / 2;
    const coordY = event.pageY - parallaxHeight / 2;

    setCoords({
      x: (coordX / parallaxWidth) * 100,
      y: (coordY / parallaxHeight) * 100
    });
  };

  return (
    <div className="banner__parallax" ref={parallaxRef} onMouseMove={handleMouseMove}>
      <img src="/img/logo/first.jpg" alt="first" ref={firstRef} />
      <img
        className="banner__parallax-second"
        src="/img/logo/second.png"
        alt="first"
        ref={secondRef}
      />
      <img
        className="banner__parallax-third"
        src="/img/logo/third.png"
        alt="first"
        ref={thirdRef}
      />
      <div className="banner__gradient"></div>
    </div>
  );
}

export default Banner;
