import React, { SyntheticEvent, useEffect } from "react";
import CardPortfolio from "../CardPortfolio/CardPortfolio";
import { PortfolioGet } from "../../../Models/Portfolio";
// import focusFieldBy from './../../../../node_modules/react-hook-form/dist/logic/focusFieldBy.d';

interface Props {
  portfolioValues: PortfolioGet[];
  onPortfolioDelete: (e: SyntheticEvent) => void;
}

const ListPortfolio = ({ portfolioValues, onPortfolioDelete }: Props) => {

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    console.log("portfolioValues:", portfolioValues);
    console.log("Type of portfolioValues:", typeof portfolioValues);
    console.log("Is Array:", Array.isArray(portfolioValues));
    setLoading(false);
  }, [portfolioValues]);

  const handleUpdateInfo = async (symbol: string) => {
    try {
      const response = await fetch(`/api/update-info/${symbol}`);
      const data = await response.json();
      // Handle the updated information
    } catch (error) {
      console.error("Error updating info:", error);
    }
  };
  
  const handleGetRecommendation = async (symbol: string) => {
    try {
      const response = await fetch(`/api/get-recommendation/${symbol}`);
      const data = await response.json();
      // Handle the recommendation
    } catch (error) {
      console.error("Error getting recommendation:", error);
    }
  };

  return (
    <section id="portfolio">
      <h3 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
        Followed Companies
      </h3>
      <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
      {loading ? (
          <h3 className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
            Loading...
          </h3>
        ) : (
          <>
            {Array.isArray(portfolioValues) && portfolioValues.length > 0 ? (
              portfolioValues.map((portfolioValue) => (
                <CardPortfolio
                  key={portfolioValue.id}
                  portfolioValue={portfolioValue}
                  onPortfolioDelete={onPortfolioDelete}
                  onUpdateInfo={handleUpdateInfo}
                  onGetRecommendation={handleGetRecommendation}
                />
              ))
            ) : (
              <h3 className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
                You are not following any companies yet! Use the search to find companies to follow.
              </h3>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ListPortfolio;
