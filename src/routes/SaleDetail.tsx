import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormHelperText,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaBox, FaBoxOpen } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteQuestion, deleteSale, getSale, uploadQuestion } from "../api";
import { IReply, ISaleQuestion, ISalesDetail } from "../types";

export default function SaleDetail() {
  const { salePk } = useParams();
  const { register, handleSubmit } = useForm();

  const mutation = useMutation(uploadQuestion, {
    onSuccess: () => {
      toast({
        title: "댓글이 등록 되었습니다.",
        status: "success",
      });
      queryClient.refetchQueries(["sales"]);
    },
  });
  const toast = useToast();
  const { data } = useQuery<ISalesDetail>([`sales`, salePk], getSale);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    if (salePk) {
      data["salePk"] = salePk;
      mutation.mutate(data);
    }
  };

  const onDeleteComment = async (event: any) => {
    if (salePk) {
      await deleteQuestion(salePk, event.target.value);
      queryClient.refetchQueries(["sales"]);
      toast({
        title: "댓글이 삭제되었습니다.",
        status: "success",
      });
    }
  };

  const onUploadPhoto = async () => {
    navigate(`photos`);
  };
  const onModifySale = () => {
    navigate(`modify`);
  };

  const onDeleteSale = async () => {
    if (window.confirm("정말 삭제합니까?")) {
      if (salePk) {
        const status = await deleteSale(salePk);
        console.log(status);
        queryClient.refetchQueries(["sales"]);
        alert("삭제되었습니다.");
        navigate("/");
      }
    } else {
      alert("취소합니다.");
    }
  };
  return (
    <Box px={80} mt={10} py={10}>
      <Grid
        gap={3}
        rounded={"xl"}
        overflow={"hidden"}
        height={"60vh"}
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {data?.photos.slice(0, 5).map((photo, index) => (
          <GridItem
            mt={10}
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={photo.pk}
          >
            <Image objectFit={"cover"} w={"100%"} h={"100%"} src={photo.file} />
          </GridItem>
        ))}
      </Grid>
      <Box mt={5} borderBottomWidth={1}>
        <HStack justifyContent={"space-between"}>
          <VStack>
            <Heading>{data?.name}</Heading>
            <Text>{data?.location}</Text>
          </VStack>
          <HStack>
            <VStack>
              <Avatar src={data?.owner.avatar}></Avatar>
              <Text>{data?.owner.username}</Text>
            </VStack>
          </HStack>
        </HStack>
        <HStack
          borderBottomWidth={1}
          w={"100%"}
          justifyContent={"space-between"}
        >
          <HStack mt={3}>
            <VStack>
              <Text>판매 희망 금액: {data?.price}원</Text>
              <Text>구매 당시 금액: {data?.bought_price}원</Text>
            </VStack>
            {data?.unopened ? (
              <Text>
                <FaBox />
                미개봉 상품입니다.
              </Text>
            ) : (
              <Text>
                <FaBoxOpen />
                개봉 상품입니다.
              </Text>
            )}
          </HStack>
        </HStack>
        <Text minH={"72"}>{data?.description}</Text>
      </Box>
      <HStack justifyContent={"flex-end"}>
        <Link to="/">
          <Button colorScheme={"blue"}>홈 화면</Button>
        </Link>
        <Button onClick={onUploadPhoto} colorScheme={"green"}>
          사진등록
        </Button>
        <Button onClick={onModifySale}>수정하기</Button>
        <Button colorScheme={"red"} onClick={onDeleteSale}>
          삭제하기
        </Button>
      </HStack>
      <VStack spacing={10} as={"form"} mt={5} onSubmit={handleSubmit(onSubmit)}>
        <FormControl width={"60%"}>
          <FormLabel>질문작성</FormLabel>
          <Input
            {...register("question", { required: "질문 내용을 입력하세요." })}
            type="text"
          ></Input>
          <FormHelperText>질문을 적어주세요.</FormHelperText>
        </FormControl>
        <Button type={"submit"}>질문등록</Button>
      </VStack>
      <Container mt={16} maxW="container.lg" marginX="none">
        <Grid gap={10} templateColumns={"1fr 1fr"}>
          {data?.questions
            .filter((question: ISaleQuestion) => question.parent === null)
            .map((question: ISaleQuestion) => (
              <VStack key={question.id} alignItems={"flex-start"}>
                <HStack>
                  <Avatar
                    name={question.author.name}
                    src={question.author.avatar}
                    size="md"
                  />
                  <VStack spacing={0} alignItems={"flex-start"}>
                    <Heading fontSize={"md"}>{question.author.name}</Heading>
                    <HStack spacing={1}>
                      <Text>{question.question}</Text>
                    </HStack>
                  </VStack>
                  <Button
                    value={question.id}
                    onClick={onDeleteComment}
                    colorScheme={"red"}
                    size={"xs"}
                  >
                    삭제
                  </Button>
                </HStack>

                {question.reply.map((reply: IReply, index: number) => (
                  <VStack {...register("key")} key={reply.pk}>
                    <HStack>
                      <Avatar
                        name={reply.author.name}
                        src={reply.author.avatar}
                        size={"sm"}
                      />
                      <VStack>
                        <Text fontSize={"sm"}>{reply.author.name}</Text>
                      </VStack>
                      <Text fontSize={"sm"}>{reply.question}</Text>
                    </HStack>
                  </VStack>
                ))}
              </VStack>
            ))}
        </Grid>
      </Container>
    </Box>
  );
}
