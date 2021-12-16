import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, onClickStock }) {
  const portfolioList = portfolio.map((port) => (
    <Stock key={port.id} stock={port} onClickStock={onClickStock} />
  ));

  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolioList}
    </div>
  );
}

export default PortfolioContainer;
