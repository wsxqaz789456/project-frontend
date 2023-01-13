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
import { useNavigate, useParams } from "react-router-dom";
import { getCategories, getSale, IUploadVariables, modifySale } from "../api";
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
  const { salePk } = useParams();
  console.log(salePk);

  const { register, handleSubmit } = useForm<IUploadVariables>();
  const { data } = useQuery<ICategory[]>(["categories"], getCategories);
  const { data: saledata } = useQuery<ISalesDetail>(["sale", salePk], getSale);
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(modifySale, {
    onSuccess: (data: ISalesDetail) => {
      toast({
        status: "success",
        title: "게시글이 수정되었습니다.",
      });
      navigate(`/sales/${salePk}`);
    },
    onError: (err) => {
      toast({
        status: "error",
        title: "권한이 없습니다.",
      });
      navigate(`/sales/${salePk}`);
      console.log("error: ", err);
    },
  });
  const onSubmit = (data: IUploadVariables) => {
    if (salePk) {
      data["salePk"] = salePk;
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
          <Heading> 내용 수정</Heading>
          <VStack
            spacing={10}
            as={"form"}
            onSubmit={handleSubmit(onSubmit)}
            mt={5}
          >
            <FormControl>
              <FormLabel>판매품목</FormLabel>
              <Input
                {...register("name")}
                type="text"
                placeholder={saledata?.name}
              ></Input>
              <FormHelperText>판매할 품목을 적어주세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>지역</FormLabel>
              <Input
                {...register("location")}
                type="text"
                placeholder={saledata?.location}
              ></Input>
              <FormHelperText>지역을 적어주세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>희망가격</FormLabel>
              <InputGroup>
                <InputLeftAddon children={"₩원"} />
                <Input {...register("price")} type={"number"} />
              </InputGroup>
              <FormHelperText>희망하는 가격을 적어주세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>구매 당시 가격</FormLabel>
              <InputGroup>
                <InputLeftAddon children={"₩원"} />
                <Input {...register("bought_price")} type={"number"} />
              </InputGroup>
              <FormHelperText>구매 당시 가격을 적어주세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>설명</FormLabel>
              <Textarea {...register("description")} />
            </FormControl>
            <FormControl>
              <Checkbox {...register("unopened")}>미개봉 상품입니까?</Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>카테고리를 선택하세요</FormLabel>
              <Select {...register("category")}>
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
              수정하기
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
