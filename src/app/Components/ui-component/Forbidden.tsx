import { Box, Container, Typography } from '@mui/material';

const ForbiddenPage = () => (
  <Box
    display="flex"
    flexDirection="column"
    height="70vh"
    textAlign="center"
    justifyContent="center"
  >
    <Container maxWidth="md">
      <Typography align="center" style={{ fontSize: '3em' }} variant="h1" mb={2}>
        403
      </Typography>
      <Typography align="center" variant="h4">
        Forbidden
      </Typography>
      <Typography align="center" fontWeight={'normal'} variant="h6" mb={2}>
        Access to this resource on the server is denied!
      </Typography>
    </Container>
  </Box>
);

export default ForbiddenPage;
