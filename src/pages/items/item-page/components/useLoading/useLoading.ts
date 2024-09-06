import { useContext } from "react";

import { LoadingContext } from "../layout/Layout";

export default function useLoading() {
  return useContext(LoadingContext) as boolean;
}