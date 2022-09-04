import { useEffect, useState, useContext, ReactElement } from 'react';
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
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { Category, CategoryObject, IFile } from '@kol-amelamdim/types';
import { StyledPageContainer } from '@kol-amelamdim/styled';
import { FILE_TYPES_DICTIONARY } from '@kol-amelamdim/types';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import { FilterCard } from '../../components/filter-card/FilterCard';
import { UploadFileDialog } from '../../components';
import { AlertContext } from '../../context/alert-context-provider';
import { AlertLayout } from '../../layouts';
import axios from '../../api';

const rowsPerPage = 25;

const Mivhanim = ({ files, error }) => {
  const [fileType, setFileType] = useState('');
  const [filterText, setFilterText] = useState('');
  const [page, setPage] = useState<number>(0);
  const [filteredFiles, setFilteredFiles] = useState<IFile[]>([]);
  const [isUploadFileDialogOpen, setIsUploadFileDialogOpen] = useState(false);

  const router = useRouter();
  const { category } = router.query;
  const { setAlertMessage, setAlertType } = useContext(AlertContext);

  //TODO: handle Error & loading & no data to show.
  //TODO: handle file upload to be added to the tabled immediately
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleFilter = () => {
    const isFilteredByFileType =
      fileType && fileType !== FILE_TYPES_DICTIONARY.all;
    let filteredFileType = [...files];
    if (isFilteredByFileType) {
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
  }, [error, setAlertType, setAlertMessage]);

  const renderNoData = () => <div>אין מידע להציג</div>;
  return (
    <StyledPageContainer>
      {files.length === 0 ? (
        renderNoData()
      ) : (
        <>
          <Typography variant="h3" component="h2" sx={{ mt: 2 }}>
            {CategoryObject[category as string].hebName}
          </Typography>
          <FilterCard
            setFileType={setFileType}
            fileType={fileType}
            filterText={filterText}
            setFilterText={setFilterText}
            onClick={handleFilter}
          />
          <TableContainer component={Paper} sx={{ maxHeight: 400, mt: '20px' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>שם</TableCell>
                  <TableCell>מחבר</TableCell>
                  <TableCell>גודל קובץ</TableCell>
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
            component="div"
            rowsPerPageOptions={[]}
            count={filteredFiles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
          <Button
            variant="contained"
            onClick={() => setIsUploadFileDialogOpen(true)}
          >
            שיתוף חומרים
          </Button>
          {isUploadFileDialogOpen && (
            <UploadFileDialog
              isOpen={isUploadFileDialogOpen}
              onClose={() => setIsUploadFileDialogOpen(false)}
              defaultCategory={category as Category}
            />
          )}
        </>
      )}
    </StyledPageContainer>
  );
};
Mivhanim.getLayout = function getLayout(page: ReactElement) {
  return <AlertLayout>{page}</AlertLayout>;
};

export default Mivhanim;

export async function getServerSideProps(context) {
  try {
    const { category } = context.query;
    const { data } = await axios.get(`/api/category/${category}`);

    return {
      props: {
        files: data.files,
        error: false,
      },
    };
  } catch (e) {
    return {
      props: {
        files: [],
        error: true,
      },
    };
  }
}
