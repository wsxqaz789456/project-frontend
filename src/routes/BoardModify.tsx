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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { modifyBoard, getBoard } from "../api";

import ProtectedPage from "../components/ProtectedPage";

interface IUploadBoard {
  title: string;
  content: string;
}
interface IUploadBoardUpdated {
  title: string;
  content: string;
  pk: string;
}

export default function UploadSale() {
  const { boardPk } = useParams();
  const { data } = useQuery(["board", boardPk], getBoard);
  const navigate = useNavigate();
  const toast = useToast();
  const mutation = useMutation(modifyBoard, {
    onSuccess: () => {
      toast({
        title: "게시글이 수정되었습니다.",
        status: "success",
      });
      navigate(`/board/${boardPk}`);
    },
    onError: (err) => {
      toast({
        title: "수정 권한이 없습니다.",
        status: "error",
      });
      console.log("error : ", err);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUploadBoardUpdated>();
  const onSubmit = (data: IUploadBoardUpdated) => {
    const pk = boardPk;
    if (pk) {
      data["pk"] = pk;
      mutation.mutate(data);
    }
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
            <Heading>게시글 수정</Heading>
            <FormControl>
              <FormLabel>제목</FormLabel>
              <Input
                {...register("title", { required: "제목을 입력해주세요." })}
                type="text"
                placeholder={data?.title}
              ></Input>
              <Text color={"red.500"} fontSize={"xs"}>
                {errors?.title?.message}
              </Text>
            </FormControl>
            <FormControl>
              <FormLabel>내용</FormLabel>
              <Textarea
                {...register("content", { required: "내용을 입력해주세요." })}
                placeholder={data?.content}
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
              수정하기
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
