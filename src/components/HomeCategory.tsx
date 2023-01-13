import { HStack, VStack, Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { FaBook, FaAlignJustify } from "react-icons/fa";
import { GiClothes, GiRunningShoe } from "react-icons/gi";

export default function HomeCategory() {
  return (
    <HStack mt={10} mb={10} spacing={10}>
      <Link to={"/"}>
        <VStack>
          <GiRunningShoe size={48} />
          <Text> 신발</Text>
        </VStack>
      </Link>
      <Link to={"/"}>
        <VStack>
          <FaBook size={48} />
          <Text> 책</Text>
        </VStack>
      </Link>
      <Link to={"/"}>
        <VStack>
          <GiClothes size={48} />
          <Text>옷</Text>
        </VStack>
      </Link>
      <Link to={"/"}>
        <VStack>
          <FaAlignJustify size={48} />
          <Text>기타</Text>
        </VStack>
      </Link>
    </HStack>
  );
}
