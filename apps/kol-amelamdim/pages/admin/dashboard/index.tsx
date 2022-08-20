import { StyledPageContainer } from '@kol-amelamdim/styled';
import axios from '../../../api';

const AdminDashboard = () => {
  return (
    <StyledPageContainer>
      Admin dashboard
      {/* Will be changed .... */}
      <button
        onClick={() => {
          axios
            .get('/api/admin/add-weekly-post')
            .then(() => {
              console.log('here');
            })
            .catch(() => {
              console.log('should catch');
            });
        }}
      >
        Test auth
      </button>
    </StyledPageContainer>
  );
};

export default AdminDashboard;
