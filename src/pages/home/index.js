import React, { useEffect } from "react";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log("chaln dea pau");
  return <>Yoo man</>;
}

export default Home;
