import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, IconButton, Pagination } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: any, newPage: number) => void;
}

const PaginationActions: React.FC<TablePaginationActionsProps> = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;
  const totalPage = Math.ceil(count / rowsPerPage);

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <Pagination
        count={totalPage}
        color="secondary"
        showFirstButton
        showLastButton
        onChange={onPageChange}
      />
    </Box>
  );
};

export default PaginationActions;
