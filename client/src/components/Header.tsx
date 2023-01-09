import { Typography, Box } from '@mui/material';
import { useThemeStyle } from '../theme';
interface HeaderProps {
  title: string;
  subTitle: string;
}

const Header = ({ subTitle, title }: HeaderProps) => {
  const theme = useThemeStyle();
  return (
    <Box>
      <Typography
        color={theme.palette.secondary[100]}
        variant="h2"
        fontWeight="bold"
        sx={{ marginBottom: '5px', textTransform: 'uppercase' }}
      >
        {title}
      </Typography>
      <Typography color={theme.palette.secondary[300]} variant="h5">
        {subTitle}
      </Typography>
    </Box>
  );
};

export { Header };
