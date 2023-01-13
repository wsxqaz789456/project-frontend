import { HStack, Heading, Box, Text, Button, Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getSales } from "../api";

import HomeSales from "../components/HomeSales";
import { ISale } from "../types";

export default function SaleAll() {
  const { data: isSales } = useQuery<ISale[]>(["sales"], getSales);
  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      {isSales?.map((sale) => (
        <HomeSales
          imageUrl={sale.photos[0].file}
          key={sale.pk}
          isOwner={sale.is_owner}
          pk={sale.pk}
          name={sale.name}
          price={sale.price}
        />
      ))}
    </Grid>
  );
}
