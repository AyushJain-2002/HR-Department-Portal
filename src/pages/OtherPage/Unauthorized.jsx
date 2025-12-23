import { useNavigate, useLocation } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <Box sx={{ mb: 4 }}>
        <LockOutlinedIcon sx={{ fontSize: 80, color: 'warning.main' }} />
      </Box>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
        403 - Access Denied
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        You don't have permission to access {from}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button 
          variant="outlined" 
          size="large"
          onClick={() => navigate(-1)}
          sx={{ px: 4, py: 2 }}
        >
          Go Back
        </Button>
        <Button 
          variant="contained" 
          size="large"
          onClick={() => navigate('/')}
          sx={{ px: 4, py: 2 }}
        >
          Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default Unauthorized;