import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import {
  Hits,
  InstantSearch,
  SearchBox,
  Configure,
  Pagination,
  RefinementList,
} from "react-instantsearch";
import { Hit } from "./Hit";
import Recommend from "./Recommend";

const searchClient = algoliasearch(
  "K9V3E6T6OT",
  "ff0e8c70b3ea078c129f4944a9015fd8",
);

export const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="FigureVerse" insights>
      <Configure hitsPerPage={12} />

      <div className="ais-InstantSearch">
        <h2 className="mt-8 text-center text-xl font-semibold">
          Search for your favorite figures
        </h2>
        <SearchBox placeholder="Search..." className="mt-4" />
        <div className="mb-12 mt-10">
          <div className="mb-8 flex items-center justify-between">
            <span className="hidden text-lg font-semibold lg:block">
              List of products:
            </span>
            <Recommend />
          </div>
          <div className="flex flex-col gap-2 lg:flex-row">
            <div>
              <div className="pb-2 text-base font-semibold">
                Filter by type:
              </div>
              <RefinementList attribute="type" operator="or" />
            </div>
            <div className="flex-grow">
              <Hits hitComponent={Hit} />
              <div className="mt-12 flex w-full justify-center">
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </InstantSearch>
  );
};
