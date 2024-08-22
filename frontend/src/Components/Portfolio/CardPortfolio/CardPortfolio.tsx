import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";
import { PortfolioGet } from "../../../Models/Portfolio";

interface Props {
  portfolioValue: PortfolioGet;
  onPortfolioDelete: (e: SyntheticEvent) => void;
  onUpdateInfo: (symbol: string) => void;
  onGetRecommendation: (symbol: string) => void;
}

const CardPortfolio = ({ portfolioValue, onPortfolioDelete, onUpdateInfo, onGetRecommendation }: Props) => {
  return (
    <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
      <Link
        to={`/company/${portfolioValue.symbol}/company-profile`}
        className="pt-6 text-xl font-bold"
      >
        {portfolioValue.symbol}
      </Link>
      <div className="flex justify-around">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded"
          onClick={() => onUpdateInfo(portfolioValue.symbol)}
        >
          Update Info
        </button>
        <button
          className="px-4 py-2 text-white bg-green-500 rounded"
          onClick={() => onGetRecommendation(portfolioValue.symbol)}
        >
          Get Recommendation
        </button>
      </div>
      <DeletePortfolio
        portfolioValue={portfolioValue.symbol}
        onPortfolioDelete={onPortfolioDelete}
      />
    </div>
  );
};

export default CardPortfolio;
