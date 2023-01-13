import { Text, HStack, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaRegComments } from "react-icons/fa";

interface IHomeComunity {
  title: string;
  content: string;
  views: number;
  total_comments: number;
  pk: number;
}

export default function HomeComunity({
  title,
  content,
  views,
  total_comments,
  pk,
}: IHomeComunity) {
  return (
    <Link to={`/board/${pk}`}>
      <VStack spacing={"1"} alignItems={"start"}>
        <Text as="b">{title}</Text>
        <Text>{content}</Text>
        <HStack>
          <HStack spacing={"1"}>
            <IoEyeSharp />
            <Text>{views}</Text>
          </HStack>
          <HStack pl={5} spacing={"1"}>
            <FaRegComments />
            <Text>{total_comments}</Text>
          </HStack>
        </HStack>
      </VStack>
    </Link>
  );
}
