import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000/api/v1/"
      : "https://djangoproject-w9c2.onrender.com/api/v1",
  withCredentials: true,
});

export async function getSales() {
  const response = await instance.get(`sales/`);
  return response.data;
}
export async function getSale({ queryKey }: QueryFunctionContext) {
  const [_, salePk] = queryKey;
  const response = await instance.get(`sales/${salePk}`);
  return response.data;
}

export async function getBoards() {
  const response = await instance.get(`boards/`);
  return response.data;
}
export async function getBoard({ queryKey }: QueryFunctionContext) {
  const [_, boardPk] = queryKey;
  const response = await instance.get(`boards/${boardPk}`);
  return response.data;
}

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export async function logOut() {
  const response = await instance.post(`users/log-out`, null, {
    headers: {
      "X-CSRFToken": Cookie.get("csrftoken") || "",
    },
  });
  return response.data;
}

export const githubLogin = (code: string) =>
  instance
    .post(
      `/users/github`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const kakaoLogin = (code: string) =>
  instance
    .post(
      `/users/kakao`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export interface IUsernameLoginVarialbes {
  username: string;
  password: string;
}

export interface IUsernameLoginSuccess {
  ok: string;
}
export interface IUsernameLoginError {
  error: string;
}

export const usernameLogin = ({
  username,
  password,
}: IUsernameLoginVarialbes) =>
  instance.post(
    `/users/log-in`,
    { username, password },
    {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    }
  );
export interface IUserSignUp {
  username: string;
  name: string;
  email: string;
  password: string;
}

export const userSignUp = ({ username, name, email, password }: IUserSignUp) =>
  instance.post(
    `/users/`,
    { username, password, name, email },
    {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    }
  );

export async function getCategories() {
  const response = await instance.get(`categories`);
  return response.data;
}
export interface IPhotos {
  pk: number;
  file: string;
}
export interface IUploadVariables {
  name: string;
  location: string;
  description: string;
  price: number;
  bought_price: number;
  unopened: boolean;
  category: number;
  salePk: string;
  photos: IPhotos[];
}

export const uploadSale = (valiables: IUploadVariables) =>
  instance
    .post(`sales/`, valiables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const modifySale = (variables: IUploadVariables) =>
  instance
    .put(`sales/${variables.salePk}`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const getUploadURL = () =>
  instance
    .post(`photos/get-url`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export interface IUploadImageVariables {
  file: FileList;
  uploadURL: string;
}

export default async function uploadImage({
  file,
  uploadURL,
}: IUploadImageVariables) {
  const form = new FormData();
  form.append("file", file[0]);
  const response = await axios.post(uploadURL, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
export interface ICreateVariables {
  file: string;
  salePk: string;
}
export const createPhoto = ({ file, salePk }: ICreateVariables) =>
  instance
    .post(
      `sales/${salePk}/photos`,
      { file },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export interface IuploadQuestionValiable {
  question: string;
  salePk: string;
}

export const uploadQuestion = ({ question, salePk }: IuploadQuestionValiable) =>
  instance
    .post(
      `sales/${salePk}/questions`,
      { question },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export interface IuploadReQuestionValiable {
  question: string;
  salePk: string;
  parent: number;
}

export const uploadReQuestion = ({
  question,
  salePk,
  parent,
}: IuploadReQuestionValiable) =>
  instance
    .post(
      `sales/${salePk}/questions`,
      { question, parent },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const deleteQuestion = (salePk: string, questionId: number) =>
  instance.delete(`sales/${salePk}/questions/${questionId}`, {
    headers: {
      "X-CSRFToken": Cookie.get("csrftoken") || "",
    },
  });

export const deleteSale = (salePk: string) =>
  instance
    .delete(`sales/${salePk}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.status);

export const deleteBoardComment = (pk: number) =>
  instance
    .delete(`boards/comments/${pk}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.status);

interface IUploadComment {
  body: string;
  boardPk: string;
}

export const uploadComment = async (variables: IUploadComment) =>
  instance
    .post(`boards/${variables.boardPk}/comments`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const deletePost = async (pk: any) =>
  instance
    .delete(`boards/${pk}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.status);

interface uploadBoardValiables {
  title: string;
  content: string;
}
interface modifyBoardValiables {
  title: string;
  content: string;
  pk: string;
}

export const uploadBoard = (valiables: uploadBoardValiables) =>
  instance
    .post(`boards/`, valiables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const modifyBoard = (valiables: modifyBoardValiables) =>
  instance
    .put(`boards/${valiables.pk}`, valiables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
