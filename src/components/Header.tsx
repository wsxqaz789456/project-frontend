import {
  Text,
  HStack,
  IconButton,
  Button,
  ToastId,
  Box,
  useDisclosure,
  useColorMode,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

import { FaMoon, FaSun } from "react-icons/fa";
import { SlHandbag } from "react-icons/sl";
import { Link } from "react-router-dom";
import { logOut } from "../api";
import useUser from "../lib/useUser";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

//화면의 상단에 표시될 Header Component 작성
export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();

  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const queryClient = useQueryClient();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(logOut, {
    onMutate: () => {
      toastId.current = toast({
        title: "로그아웃 중",
        description: "로그아웃 중입니다.",
        status: "loading",
        position: "bottom-right",
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        queryClient.refetchQueries(["me"]);
        toast.update(toastId.current, {
          status: "success",
          title: "로그아웃",
          description: "로그아웃이 완료되었습니다.",
        });
      }
    },
  });

  const onLogOut = async () => {
    mutation.mutate();
  };

  return (
    <HStack
      justifyContent={"space-between"}
      py={"5"}
      px={"40"}
      borderBottomWidth={1}
    >
      <HStack>
        <Link to={"/"}>
          <Box color={"blue.600"}>
            <SlHandbag size={"48"} />
          </Box>
        </Link>

        <Link to={"/sales/all"}>
          <Box marginX={2}>
            <Text>판매상품</Text>
          </Box>
        </Link>
        <Link to={"/sales/upload"}>
          <Box marginX={2}>
            <Text>판매하기</Text>
          </Box>
        </Link>
        <Link to={"/board/all"}>
          <Box marginX={2}>
            <Text>커뮤니티</Text>
          </Box>
        </Link>
      </HStack>
      <HStack spacing={"2"}>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <Button onClick={onSignUpOpen} colorScheme={"red"}>
                Sign up
              </Button>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar size={"md"} name={user?.name} src={user?.avatar} />
              </MenuButton>
              <MenuList>
                <Link to="/sales/upload">
                  <MenuItem>판매하기</MenuItem>
                </Link>
                <MenuItem onClick={onLogOut}>로그아웃</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </HStack>
  );
}
