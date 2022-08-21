import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { StyledPage } from '@kol-amelamdim/styled';
import { FilterCard } from '../../../components/filter-card/FilterCard';

const Mivhanim = () => {
  return (
    <StyledPage>
      <FilterCard />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>A basic table example with a caption</caption>
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
            {mockData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell>{row.size}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.link}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledPage>
  );
};

export default Mivhanim;

// קובץ ראשון אריה כהן
// parashat-shavoa - 500
// mivhanim - 1000
const mockData = [
  {
    id: '123',
    name: 'קובץ ראשון',
    size: '5000',
    type: 'pdf',
    author: 'נתנאל וקנין',
    link: 'https///.....',
  },
  {
    id: '1433',
    name: 'sec file name',
    size: '5000',
    type: 'pdf',
    author: 'Netanel Vaknin',
    link: 'https///.....',
  },
  {
    id: '123',
    name: 'first file name',
    size: '5000',
    type: 'pdf',
    author: 'Netanel Vaknin',
    link: 'https///.....',
  },
];
