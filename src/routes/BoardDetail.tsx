import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Input,
  List,
  Text,
  UnorderedList,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteBoardComment,
  deletePost,
  getBoard,
  uploadComment,
} from "../api";
import { IComunity } from "../types";

interface IComment {
  body: string;
}

export default function BoardDetail() {
  const { boardPk } = useParams();
  const { data } = useQuery<IComunity>(["board", boardPk], getBoard);
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IComment>();

  const deletePostMutation = useMutation(deletePost, {
    onSuccess: () => {
      toast({
        title: "게시글을 삭제했습니다",
        status: "success",
      });
      navigate("/board/all");
    },
    onError: (err) => {
      toast({
        title: "사용자가 일치하지 않습니다.",
        status: "error",
      });
      console.log("error : ", err);
    },
  });

  const CommentMutation = useMutation(uploadComment, {
    onSuccess: () => {
      toast({
        title: "댓글을 등록했습니다.",
        status: "success",
      });
      queryClient.refetchQueries(["board"]);
    },
    onError: (err) => {
      toast({
        title: "로그인한 사용자만 댓글 작성이 가능합니다.",
        status: "error",
      });
      console.log("error : ", err);
    },
  });

  const mutation = useMutation(deleteBoardComment, {
    onSuccess: () => {
      toast({
        title: "댓글을 삭제하였습니다.",
        status: "success",
      });
      queryClient.refetchQueries(["board"]);
    },
    onError: (err) => {
      toast({
        title: "댓글을 삭제하지 못했습니다.",
        status: "error",
        description: "사용자가 일치하지 않습니다.",
      });
      console.log(`error : ${err}`);
    },
  });

  const onDeletePost = () => {
    const pk = boardPk;
    const status = deletePostMutation.mutate(pk);
    console.log("status : ", status);
  };

  const onDeleteComment = (event: any) => {
    const pk = event.target.value;
    mutation.mutate(pk);
    queryClient.refetchQueries(["board"]);
  };

  const onCommentSubmit = (data: any) => {
    if (boardPk) {
      data["boardPk"] = boardPk;
      CommentMutation.mutate(data);
      queryClient.refetchQueries(["board"]);
    }
  };

  const onHome = () => {
    navigate("/");
  };
  const onModify = () => {
    navigate("modify");
  };

  return (
    <Box px={80} mt={30} mb={15}>
      <Heading mb={15}>{data?.title}</Heading>
      <HStack py={5} borderBottomWidth={1}>
        <Avatar src={data?.author.avatar} />
        <VStack spacing={"-1.5"} alignItems={"start"}>
          <Text>{data?.author.name}</Text>
          <Text>
            {data?.created_at} · 조회수 {data?.views}
          </Text>
        </VStack>
      </HStack>
      <Text py={15} borderBottomWidth={1} minH={"30vh"}>
        {data?.content}
      </Text>
      <HStack mt={5} justifyContent={"flex-end"}>
        <Button onClick={onHome} colorScheme={"blue"}>
          목록으로
        </Button>
        <Button onClick={onModify}>수정하기</Button>
        <Button onClick={onDeletePost} colorScheme={"red"}>
          삭제하기
        </Button>
      </HStack>

      <UnorderedList>
        {data?.comments.map((comment) => (
          <HStack justifyContent={"space-between"} my={3} borderBottom={"1px"}>
            <List key={comment.pk}>
              <VStack alignItems={"flex-start"}>
                <HStack>
                  <Avatar
                    name={comment.author.name}
                    size={"md"}
                    src={comment.author.avatar}
                  />
                  <Text>{comment.author.name}</Text>
                </HStack>
                <Text ml={12}>{comment.body}</Text>
              </VStack>
            </List>
            <Button
              onClick={onDeleteComment}
              value={comment.pk}
              size={"sm"}
              colorScheme={"red"}
            >
              삭제
            </Button>
          </HStack>
        ))}
      </UnorderedList>
      <HStack mt={10} as={"form"} onSubmit={handleSubmit(onCommentSubmit)}>
        <Input
          {...register("body", { required: "내용을 입력해주세요." })}
          placeholder={"댓글의 내용을 입력해주세요."}
        ></Input>
        <Button type="submit" colorScheme={"blue"}>
          댓글 등록
        </Button>
        <Text fontSize={"xs"} color={"red.500"}>
          {errors?.body?.message}
        </Text>
      </HStack>
    </Box>
  );
}
