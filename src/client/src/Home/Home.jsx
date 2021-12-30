import React, { useEffect, useState } from "react";
import Banner from "./components/Banner/Banner";

const Home = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };


  return (
    <div className="Home">
      <article>
        <Banner width={width} />
      </article>
    </div>
  );
};

export default Home;
