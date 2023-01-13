import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import uploadImage, { createPhoto, getUploadURL } from "../api";
import ProtectedPage from "../components/ProtectedPage";

interface IForm {
  file: FileList;
}
interface IUploadURLResponse {
  result: { id: string; uploadURL: string };
}

export default function UploadPhotos() {
  const { salePk } = useParams();
  const { register, handleSubmit, watch, reset } = useForm<IForm>();
  const toast = useToast();
  const createPhotoMutation = useMutation(createPhoto, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "이미지가 업로드 되었습니다.",
        isClosable: true,
      });
      reset();
    },
  });
  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      if (salePk) {
        createPhotoMutation.mutate({
          file: `https://imagedelivery.net/dhKQL7Jk2_MFReP9JYLhDA/${result.id}/public`,
          salePk,
        });
      }
    },
  });
  const uploadURLMutation = useMutation(getUploadURL, {
    onSuccess: (data: IUploadURLResponse) => {
      uploadImageMutation.mutate({
        uploadURL: data.result.uploadURL,
        file: watch("file"),
      });
    },
  });

  const onSubmit = (data: any) => {
    uploadURLMutation.mutate();
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
          <Heading textAlign={"center"}>사진 등록</Heading>
          <VStack
            spacing={5}
            mt={10}
            as={"form"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl>
              <Input {...register("file")} type="file" accept="image/*" />
              <FormHelperText>사진을 1장 이상 업로드하세요.</FormHelperText>
            </FormControl>
            <Button
              isLoading={
                createPhotoMutation.isLoading ||
                uploadImageMutation.isLoading ||
                uploadURLMutation.isLoading
              }
              w="full"
              colorScheme={"red"}
              type={"submit"}
            >
              사진 등록하기
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
