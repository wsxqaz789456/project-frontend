import {
  VStack,
  Heading,
  Button,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogin } from "../api";

export default function KakaoConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      const status = await kakaoLogin(code);
      if (status == 200) {
        toast({
          status: "success",
          title: "welcome",
          description: "logined with kakao",
        });
        queryClient.refetchQueries(["me"]);
        navigate("/");
      }
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack minHeight={"100vh"} justifyContent={"center"}>
      <Heading>Processing Login.</Heading>
      <Text>기다려주세요.</Text>
      <Spinner size={"xl"} />
    </VStack>
  );
}
