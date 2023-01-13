import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

interface IProtectedProps {
  children: React.ReactNode;
}

export default function ProtectedPage({ children }: IProtectedProps) {
  const { isLoggedIn, user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  return <>{children}</>;
}
