import React, { useMemo } from "react";
import ChevronLeft from "/public/assets/images/icons/chevronLeft.svg?svgr";
import ChevronRight from "/public/assets/images/icons/chevronRight.svg?svgr";
import { Flex } from "../Flex";

interface Props {
  baseParam?: string;
  count?: number | null;
  next?: string | null;
  previous?: string | null;
  setCurrentUrl: (url: string) => void;
  itemsPerPage?: number;
}

const getPageFromUrl = (url?: string | null, itemsPerPage = 10): number => {
  if (!url) return 1;
  const match = url.match(/offset=(\d+)/);
  console.log(url);
  return match ? Math.floor(parseInt(match[1], 10) / itemsPerPage) + 1 : 1;
};

export const PaginationComponent = ({
  baseParam,
  count,
  next,
  previous,
  setCurrentUrl,
  itemsPerPage,
}: Props): JSX.Element => {
  const currentPage = useMemo(() => {
    if (!previous && next && getPageFromUrl(next, itemsPerPage) === 2) {
      return 1;
    }

    if (previous) {
      return getPageFromUrl(previous, itemsPerPage) + 1;
    }

    return getPageFromUrl(next, itemsPerPage) - 2;
  }, [next, previous, itemsPerPage]);

  const totalPages = Math.ceil((count || 0) / (itemsPerPage || 1));

  const startPage = currentPage - 5 > 0 ? currentPage - 5 : 1;
  const endPage = currentPage + 4 <= totalPages ? currentPage + 4 : totalPages;
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  if (count === 0) return <></>;

  if ((count || 0) <= (itemsPerPage || 0)) {
    return (
      <div className="pagination">
        <span className="text-primary-500 font-semibold">
          Exibindo 1 - {count || 0} de {count || 0} resultados
        </span>
      </div>
    );
  }

  return (
    <Flex direction="col">
      <span className="text-primary-500 font-semibold">
        Exibindo {Math.max(1, (currentPage - 1) * (itemsPerPage || 1) + 1)} -{" "}
        {Math.min(currentPage * (itemsPerPage || 1), count || 0)} de{" "}
        {count || 0} resultados
      </span>
      <div className="pagination">
        <div className="pagination-item">
          <button
            onClick={() => previous && setCurrentUrl(previous)}
            disabled={!previous}
          >
            <ChevronLeft />
          </button>
        </div>
        {pages.map((page) => (
          <div key={page} className="pagination-item">
            <button
              onClick={() => {
                const url = `${baseParam}&limit=10&offset=${
                  (page - 1) * (itemsPerPage || 0)
                }`;
                setCurrentUrl(url);
              }}
              className={`${currentPage === page ? "current" : ""}`}
            >
              {page}
            </button>
          </div>
        ))}
        <div className="pagination-item">
          <button onClick={() => next && setCurrentUrl(next)} disabled={!next}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </Flex>
  );
};
