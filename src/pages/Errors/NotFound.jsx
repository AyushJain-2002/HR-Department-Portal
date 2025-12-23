import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <Box sx={{ mb: 4 }}>
        <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main' }} />
      </Box>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        The page you're looking for doesn't exist or has been moved
      </Typography>
      <Button 
        variant="contained" 
        size="large"
        onClick={() => navigate('/')}
        sx={{ px: 4, py: 2 }}
      >
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotFound;