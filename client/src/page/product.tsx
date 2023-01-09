import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Collapse,
  Button,
  useTheme,
  useMediaQuery,
  Rating,
} from '@mui/material';
import { Header } from '../components/Header';
import { type ProductData, useGetProductsQuery } from '../store/api/productApi';
import { ThemeStyle } from '../theme';
import { useState } from 'react';

interface ProductProps extends ProductData {}
const Product = ({
  _id,
  name,
  price,
  description,
  catergory,
  rating,
  supply,
  stat,
}: ProductProps) => {
  const theme = useTheme<ThemeStyle>();
  const [isExpanded, setExpandedMode] = useState(false);
  const { yealySalesTotal, yearlyTotalSoldUnits } = stat;
  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {catergory}
        </Typography>

        <Typography variant="h4" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: '1.5rem' }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setExpandedMode((mode) => !mode)}
        >
          See more
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply left: {supply}</Typography>
          <Typography>Yearly Sales This Year: {yealySalesTotal}</Typography>
          <Typography>
            Yearly Units Sold This Year: {yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  //@ts-ignore
  const { data, isLoading, error } = useGetProductsQuery();
  const isNonMobileMode = useMediaQuery('(min-width: 1000px)');
  return (
    <Box margin="1.5rem 2.5rem">
      <Header title="Products" subTitle="See your list of products" />
      {isLoading && !data && <div>Loading...</div>}

      {data && !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.333%"
          sx={{
            '& > div': { gridColumn: isNonMobileMode ? undefined : 'span 4' },
          }}
        >
          {data.map((productData) => (
            <Product {...productData} key={productData._id} />
          ))}
        </Box>
      ) : null}
      {error ? <div>An errored occurred while retrieving products</div> : null}
    </Box>
  );
};

export { Products };
