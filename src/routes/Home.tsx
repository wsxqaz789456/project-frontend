import { Box, Heading, HStack, VStack, Text, Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { getBoards, getSales } from "../api";

import HomeComunity from "../components/HomeComunity";
import HomeSales from "../components/HomeSales";

import { ISale, IComunity } from "../types";
import { Link } from "react-router-dom";

export default function Home() {
  const { data: isSales } = useQuery<ISale[]>(["sales"], getSales);
  const { data: isBoards } = useQuery<IComunity[]>(["boards"], getBoards);
  return (
    <VStack>
      <Box mt={10} mb={10}>
        <HStack justifyContent={"space-between"}>
          <Heading>판매 상품</Heading>
          <Link to="/sales/all">
            <Text> 전체 보기</Text>
          </Link>
        </HStack>
        <HStack mt={5}>
          {isSales?.slice(0, 4).map((sale) => (
            <HomeSales
              imageUrl={sale.photos[0].file}
              key={sale.pk}
              isOwner={sale.is_owner}
              pk={sale.pk}
              name={sale.name}
              price={sale.price}
            />
          ))}
        </HStack>
      </Box>
      <Box width={"942px"}>
        <HStack mt={20} justifyContent={"space-between"}>
          <Heading>커뮤니티</Heading>
          <Box>
            <Link to="/board/all">
              <Text>전체보기</Text>
            </Link>
          </Box>
        </HStack>
        <Grid
          borderBottomWidth={1}
          mt={5}
          gap={4}
          templateColumns={"repeat(2, 1fr)"}
        >
          {isBoards?.slice(0, 4).map((board) => (
            <HomeComunity
              key={board.pk}
              pk={board.pk}
              title={board.title}
              content={board.content}
              views={board.views}
              total_comments={board.total_comments}
            />
          ))}
        </Grid>
      </Box>
    </VStack>
  );
}
