import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack minHeight={"100vh"} justifyContent={"center"}>
      <Heading>Page not Found.</Heading>
      <Text>잘못된 경로입니다.</Text>
      <Link to="/">
        <Button colorScheme={"red"} variant={"link"}>
          홈으로 &rarr;
        </Button>
      </Link>
    </VStack>
  );
}
