import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  getCategories,
  getUploadURL,
  IUploadVariables,
  uploadSale,
} from "../api";
import ProtectedPage from "../components/ProtectedPage";
import { ICategory, ISalesDetail } from "../types";

interface IForm {
  name: string;
  location: string;
  description: string;
  price: number;
  bought_price: number;
  unopened: boolean;
  category: number;
}

export default function UploadSale() {
  const { register, handleSubmit } = useForm<IUploadVariables>();
  const { data } = useQuery<ICategory[]>(["categories"], getCategories);
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(uploadSale, {
    onSuccess: (data: ISalesDetail) => {
      toast({
        status: "success",
        title: "게시글이 등록되었습니다.",
      });
      navigate(`/sales/${data.id}/photos`);
    },
    onError: (err) => {
      toast({
        status: "error",
        title: "게시글 등록에 실패하였습니다.",
      });
      console.log("error : ", err);
    },
  });
  const onSubmit = (data: IUploadVariables) => {
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
            onSubmit={handleSubmit(onSubmit)}
            mt={5}
          >
            <FormControl>
              <FormLabel>판매품목</FormLabel>
              <Input
                {...register("name", { required: true })}
                type="text"
              ></Input>
              <FormHelperText>판매할 품목을 적어주세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>지역</FormLabel>
              <Input
                {...register("location", { required: true })}
                type="text"
              ></Input>
              <FormHelperText>지역을 적어주세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>희망가격</FormLabel>
              <InputGroup>
                <InputLeftAddon children={"₩원"} />
                <Input
                  {...register("price", { required: true })}
                  type={"number"}
                />
              </InputGroup>
              <FormHelperText>희망하는 가격을 적어주세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>구매 당시 가격</FormLabel>
              <InputGroup>
                <InputLeftAddon children={"₩원"} />
                <Input
                  {...register("bought_price", { required: true })}
                  type={"number"}
                />
              </InputGroup>
              <FormHelperText>구매 당시 가격을 적어주세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>설명</FormLabel>
              <Textarea {...register("description", { required: true })} />
            </FormControl>
            <FormControl>
              <Checkbox {...register("unopened")}>미개봉 상품입니까?</Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>카테고리를 선택하세요</FormLabel>
              <Select {...register("category", { required: true })}>
                {data?.map((category) => (
                  <option key={category.pk} value={category.pk}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            {mutation.isError ? (
              <Text color={"red.500"}>오류가 발생했습니다.</Text>
            ) : null}
            <Button
              type={"submit"}
              isLoading={mutation.isLoading}
              colorScheme={"red"}
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
