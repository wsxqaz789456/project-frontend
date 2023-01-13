import {
  Box,
  Text,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { uploadBoard } from "../api";

import ProtectedPage from "../components/ProtectedPage";

interface IUploadBoard {
  title: string;
  content: string;
}

export default function UploadSale() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUploadBoard>();
  const navigate = useNavigate();
  const toast = useToast();
  const mutation = useMutation(uploadBoard, {
    onSuccess: () => {
      toast({
        title: "게시글이 등록 되었습니다.",
        status: "success",
      });
      navigate("/board/all");
    },
    onError: (err) => {
      toast({
        title: "게시글이 등록되지 않았습니다.",
        status: "error",
      });
      console.log("error : ", err);
    },
  });
  const onSubmit = (data: IUploadBoard) => {
    mutation.mutate(data);
  };
  return (
    <ProtectedPage>
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <VStack
            spacing={10}
            as={"form"}
            mt={5}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Heading>게시글 작성</Heading>
            <FormControl>
              <FormLabel>제목</FormLabel>
              <Input
                {...register("title", { required: "제목을 입력해주세요." })}
                type="text"
              ></Input>
              <Text color={"red.500"} fontSize={"xs"}>
                {errors?.title?.message}
              </Text>
            </FormControl>
            <FormControl>
              <FormLabel>내용</FormLabel>
              <Textarea
                {...register("content", { required: "내용을 입력해주세요." })}
              />
              <Text color={"red.500"} fontSize={"xs"}>
                {errors?.content?.message}
              </Text>
            </FormControl>
            <Button
              type={"submit"}
              colorScheme={"green"}
              size={"lg"}
              width={"100%"}
            >
              등록하기
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
