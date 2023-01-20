import { Box, Button, Divider, HStack, VStack, Text } from "@chakra-ui/react";
import { FaGithub, FaComment } from "react-icons/fa";

export default function SocialLogin() {
  const kakaoParmas = {
    client_id: "1fcabcb723408050bb1665d28f350ad0",
    redirect_uri: "http://mypractice.store/social/kakao",
    response_type: "code",
  };

  const params = new URLSearchParams(kakaoParmas).toString();
  return (
    <Box mb={4}>
      {" "}
      <HStack my={8}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color={"gray.500"}
          fontSize={"xs"}
          as={"b"}
        >
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          as="a"
          href="https://github.com/login/oauth/authorize?client_id=4d8d2230323e39321942&scope=read:user,user:email"
          w={"100%"}
          leftIcon={<FaGithub />}
          colorScheme={"telegram"}
        >
          Continue with Github
        </Button>
        <Button
          as={"a"}
          href={`https://kauth.kakao.com/oauth/authorize?${params}`}
          w={"100%"}
          leftIcon={<FaComment />}
          colorScheme={"yellow"}
        >
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
