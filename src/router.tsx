import { createBrowserRouter } from "react-router-dom";

import Root from "./components/Root";
import BoardAll from "./routes/BoardAll";
import BoardDetail from "./routes/BoardDetail";

import GithubConfirm from "./routes/GIthubConfirm";
import Home from "./routes/Home";
import KakaoConfirm from "./routes/KakaoConfirm";
import NotFound from "./routes/NotFound";
import SaleDetail from "./routes/SaleDetail";
import SaleModify from "./routes/SaleModify";
import UploadPhotos from "./routes/UploadPhotos";
import UploadSale from "./routes/UploadSale";
import BoardUpload from "./routes/BoardUpload";
import BoardModify from "./routes/BoardModify";
import SaleAll from "./routes/SaleAll";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "sales/upload",
        element: <UploadSale />,
      },
      {
        path: "sales/all",
        element: <SaleAll />,
      },
      {
        path: "sales/:salePk",
        element: <SaleDetail />,
      },
      {
        path: "sales/:salePk/modify",
        element: <SaleModify />,
      },
      {
        path: "sales/:salePk/photos",
        element: <UploadPhotos />,
      },
      {
        path: "board/upload",
        element: <BoardUpload />,
      },
      {
        path: "board/all",
        element: <BoardAll />,
      },

      {
        path: "board/:boardPk",
        element: <BoardDetail />,
      },
      {
        path: "board/:boardPk/modify",
        element: <BoardModify />,
      },

      {
        path: "social",
        children: [
          {
            path: "github",
            element: <GithubConfirm />,
          },
          {
            path: "kakao",
            element: <KakaoConfirm />,
          },
        ],
      },
    ],
  },
]);

export default router;
