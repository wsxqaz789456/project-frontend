import { Heading, VStack, Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IHomeSales {
  name: string;
  price: number;
  pk: number;
  isOwner: boolean;
  imageUrl: string;
}
export default function HomeSales({ name, price, pk, imageUrl }: IHomeSales) {
  return (
    <Link to={`/sales/${pk}`}>
      <VStack alignItems={"flex-start"}>
        <Box overflow={"hidden"} mb={1} rounded="md">
          <Image w="228" h="153" src={imageUrl} />
        </Box>
        <Box w="228px">
          <Heading noOfLines={2} fontSize={"md"}>
            {name}
          </Heading>
        </Box>
        <Text as="b">{price} 원</Text>
      </VStack>
    </Link>
  );
}
