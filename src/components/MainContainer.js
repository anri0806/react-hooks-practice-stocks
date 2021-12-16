import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((res) => res.json())
      .then((data) => setStocks(data));
  }, []);

  function handleClickStock(item) {
    const newItem = portfolio.find((port) => port.id === item.id);
    //BY DOING THIS, IT WILL AVOID ADDING SAME STOCK

    if (!newItem) {
      setPortfolio([...portfolio, item]);
    }
  }

  function handleClickRemove(deleteItem) {
    const filteredItem = portfolio.filter((port) => port.id !== deleteItem.id);

    setPortfolio(filteredItem);
  }

  const sortedItem = [...stocks]
    .filter((stock) => {
      if (filter === "All") {
        return stock;
      } else {
        return stock.type === filter;
      }
    })
    .sort((a, b) => {
      if (sort === "Alphabetically") {
        return a.ticker.localeCompare(b.ticker);
      } else if (sort === "Price") {
        return a.price - b.price;
      }
      return stocks;
    });

  return (
    <div>
      <SearchBar
        filter={filter}
        onChangeFilter={setFilter}
        sort={sort}
        onChangeSort={setSort}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={sortedItem} onClickStock={handleClickStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer
            portfolio={portfolio}
            onClickStock={handleClickRemove}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
