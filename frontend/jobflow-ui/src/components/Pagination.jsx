import Button from "./ui/Button";
import PropTypes from "prop-types";

function Pagination({ setPage, page, totalPages, isLoading }) {
  const getPageNumbers = () => {
    let start = Math.max(0, Math.min(page - 1, totalPages - 3));
    let end = Math.min(totalPages, start + 3);
    return Array.from({ length: end - start }, (_, i) => start + i);
  };
  return (
    <div>
      <div className="mt-4 flex justify-center space-x-2">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0 || isLoading}
          variant="none"
          className={`rounded-[10px] border border-none px-2 py-1 text-black`}
        >
          Back
        </Button>
        {getPageNumbers().map((pageNum) => (
          <Button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={
              pageNum === page
                ? "bg-black-color rounded-[10px] px-3 py-1 text-white"
                : "border-black-color/10 rounded-[10px] border px-3 py-1 text-black"
            }
          >
            {pageNum + 1}
          </Button>
        ))}
        <Button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page + 1 >= totalPages || isLoading}
          className={`rounded-[10px] border border-none px-2 py-1 text-black`}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
Pagination.propTypes = {
  setPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  isLoading: PropTypes.func,
};

export default Pagination;
