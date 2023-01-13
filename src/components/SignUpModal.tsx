import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { FaUser, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa";
import { userSignUp } from "../api";
import SocialLogin from "./SocialLogin";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface ISignUPValidate {
  username: string;
  name: string;
  email: string;
  password: string;
  password2: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<ISignUPValidate>();
  const toast = useToast();
  const mutation = useMutation(userSignUp, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: () => {
      toast({
        title: "회원가입이 완료되었습니다.",
        status: "success",
      });
      onClose();
      reset();
    },
    onError: (error) => {
      toast({
        title: "회원가입에 실패했습니다.",
        status: "error",
        description: "username 또는 email이 이미 존재합니다.",
      });
      console.log(error);
    },
  });

  const onSubmit = ({ username, password, name, email }: ISignUPValidate) => {
    mutation.mutate({ username, password, name, email });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.400"}>
                    <FaUser />
                  </Box>
                }
              />
              <Input
                {...register("username", {
                  required: "필수값 입니다.",
                  minLength: {
                    value: 6,
                    message: "6글자 이상 입력하세요.",
                  },
                  pattern: {
                    value: /^[A-za-z0-9]{3,10}$/,
                    message: "가능한 문자: 영문 대소문자, 숫자",
                  },
                })}
                variant={"filled"}
                placeholder={"Username"}
              ></Input>
            </InputGroup>
            <Text fontSize={"xs"} color={"red.500"}>
              {errors?.username?.message}
            </Text>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.400"}>
                    <FaUserSecret />
                  </Box>
                }
              />
              <Input
                {...register("name", {
                  required: "필수값 입니다.",
                  minLength: {
                    value: 2,
                    message: "2글자 이상 입력하세요",
                  },
                })}
                variant={"filled"}
                placeholder={"Name"}
              ></Input>
            </InputGroup>
            <Text fontSize={"xs"} color={"red.500"}>
              {errors?.name?.message}
            </Text>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.400"}>
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                {...register("email", {
                  required: "필수값 입니다.",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email 형식에 맞지 않습니다.",
                  },
                })}
                variant={"filled"}
                placeholder={"Email"}
              ></Input>
            </InputGroup>
            <Text fontSize={"xs"} color={"red.500"}>
              {errors?.email?.message}
            </Text>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.400"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                {...register("password", {
                  required: "필수값 입니다.",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8글자 이상이어야 합니다.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
                    message:
                      "비밀번호는 문자, 숫자, 특수문자가 하나 이상 필요합니다.",
                  },
                })}
                type={"password"}
                variant={"filled"}
                placeholder={"Password"}
              ></Input>
            </InputGroup>
            <Text fontSize={"xs"} color={"red.500"}>
              {errors?.password?.message}
            </Text>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.400"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                {...register("password2", {
                  required: "필수값 입니다.",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8글자 이상이어야 합니다.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
                    message:
                      "비밀번호는 문자, 숫자, 특수문자가 하나 이상 필요합니다.",
                  },
                  validate: {
                    checkPassword: (value) => {
                      const { password } = getValues();
                      return (
                        password === value || "패스워드가 일치하지 않습니다."
                      );
                    },
                  },
                })}
                type={"password"}
                variant={"filled"}
                placeholder={"Password Check"}
              ></Input>
            </InputGroup>
            <Text fontSize={"xs"} color={"red.500"}>
              {errors?.password2?.message}
            </Text>
          </VStack>
          <Button
            isLoading={mutation.isLoading}
            type={"submit"}
            mt={4}
            colorScheme={"red"}
            w={"100%"}
          >
            Sign Up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
