import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaRegComments } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getBoards } from "../api";
import { IComunity } from "../types";

export default function BoardAll() {
  const { data } = useQuery<IComunity[]>(["boards"], getBoards);
  console.log(data);
  return (
    <Box
      pb={40}
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <HStack borderBottomWidth={1} justify={"space-around"} my={10}>
        <Heading>커뮤니티</Heading>
        <Link to="/board/upload">
          <Button colorScheme={"green"}>글쓰기</Button>
        </Link>
      </HStack>
      <Container>
        {data?.map((board) => (
          <Link to={`/board/${board.pk}`}>
            <VStack
              spacing={"1"}
              alignItems={"start"}
              borderBottomWidth={1}
              my={2}
            >
              <Text as="b">제목 : {board.title}</Text>
              <Text>내용 : {board.content}</Text>
              <HStack>
                <HStack spacing={"1"}>
                  <IoEyeSharp />
                  <Text>{board.views}</Text>
                </HStack>
                <HStack pl={5} spacing={"1"}>
                  <FaRegComments />
                  <Text>{board.total_comments}</Text>
                </HStack>
                <Text justifyContent={"flex-end"}></Text>
              </HStack>
            </VStack>
          </Link>
        ))}
      </Container>
    </Box>
  );
}
