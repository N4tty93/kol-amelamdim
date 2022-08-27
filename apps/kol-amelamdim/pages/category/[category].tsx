import {
  useEffect,
  useState,
  ChangeEvent,
  useContext,
  ReactElement,
} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Link,
  Button,
} from '@mui/material';
import { useRouter } from 'next/router';
import { Category, IFile } from '@kol-amelamdim/types';
import { StyledPageContainer } from '@kol-amelamdim/styled';
import { FILE_TYPES_DICTIONARY } from '@kol-amelamdim/constants';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import { FilterCard } from '../../components/filter-card/FilterCard';
import { useCategoriesFiles } from '../../hooks/use-categories-files';
import { AuthContext } from '../../context/auth-context-provider';
import { UploadFileDialog } from '../../components';
import { AlertContext } from '../../context/alert-context-provider';
import { AlertLayout } from '../../layouts';

const Mivhanim = () => {
  const [fileType, setFileType] = useState('');
  const [filterText, setFilterText] = useState('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filteredFiles, setFilteredFiles] = useState<IFile[]>([]);
  const [isUploadFileDialogOpen, setIsUploadFileDialogOpen] = useState(false);

  const router = useRouter();
  const { category } = router.query;
  const { files, error, loading } = useCategoriesFiles(category as Category);
  const { isAuthenticated } = useContext(AuthContext);
  const { setAlertMessage, setAlertType } = useContext(AlertContext);

  //TODO: handle Error & loading & no data to show.
  //TODO: handle file upload to be added to the tabled immediately
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilter = () => {
    let filteredFileType = [...files];
    if (
      fileType &&
      FILE_TYPES_DICTIONARY[fileType] !== FILE_TYPES_DICTIONARY[10]
    ) {
      filteredFileType = filteredFileType.filter(
        (file) => file.type === FILE_TYPES_DICTIONARY[fileType]
      );
    }

    let filteredTextData = [...filteredFileType];
    if (filterText) {
      filteredTextData = filteredTextData.filter(
        (file) =>
          file.name.includes(filterText) || file.author.includes(filterText)
      );
    }

    setFilteredFiles(filteredTextData);
  };

  const handleShareContentButtonClick = async () => {
    if (isAuthenticated) {
      setIsUploadFileDialogOpen(true);
    } else {
      await router.push('/login');
    }
  };
  useEffect(() => {
    if (files) {
      setFilteredFiles(files);
    }
  }, [files]);

  useEffect(() => {
    if (error) {
      setAlertType('warning');
      setAlertMessage(API_ERRORS.errorFetchData.message.heb);
    }
  }, [error]);

  const renderNoData = () =>
    loading ? (
      <div style={{ fontSize: '200px' }}>טוען..</div>
    ) : (
      <div>אין מידע להציג</div>
    );
  return (
    <StyledPageContainer>
      {loading ? (
        renderNoData()
      ) : (
        <>
          <FilterCard
            setFileType={setFileType}
            fileType={fileType}
            filterText={filterText}
            setFilterText={setFilterText}
            onClick={handleFilter}
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>שם</TableCell>
                  <TableCell>מחבר</TableCell>
                  <TableCell>גודל קובץ (מגה בייט)</TableCell>
                  <TableCell>סוג קובץ</TableCell>
                  <TableCell>לינק להורדה</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFiles
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow key={row.key}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.author}</TableCell>
                        <TableCell>{row.size}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>
                          <Link href={row.URL}>להורדה</Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredFiles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Button variant="contained" onClick={handleShareContentButtonClick}>
            שיתוף חומרים
          </Button>
          <UploadFileDialog
            isOpen={isUploadFileDialogOpen}
            onClose={() => setIsUploadFileDialogOpen(false)}
            defaultCategory={category as Category}
          />
        </>
      )}
    </StyledPageContainer>
  );
};
Mivhanim.getLayout = function getLayout(page: ReactElement) {
  return <AlertLayout>{page}</AlertLayout>;
};

export default Mivhanim;
