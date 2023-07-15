import { Pagination as MuiPagination } from "@mui/material";

type PaginationProps = {
  onChange: (selectedPage: number) => void;
  page: number;
};

export const Pagination = ({ page, onChange }: PaginationProps) => {
  return (
    <MuiPagination
      count={10}
      color="secondary"
      hideNextButton={page === 10}
      hidePrevButton={page === 1}
      page={page}
      onChange={(_, selectedPage: number) => onChange(selectedPage)}
    />
  );
};
