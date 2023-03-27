import React, { useEffect, useState } from "react";
import shopApi from "../api/shopApi";

interface ProductToSet {
  title: string;
  price: number;
  description: string;
  image: string;
}
const useSetProduct = () => {
  //const dispatch = useDispatch();
  const [res, setRes] = useState(null);
  const [error, setError] = useState(null);
  async function setData(product: ProductToSet) {
    try {
      const { data } = await shopApi.post("/shop/new", product);
      setRes(data);
      return res;
    } catch (error: any) {
      setError(error.response.data?.msg || "something is wrong");
      return null;
    }
  }

  return { setData, res, error };
};

export default useSetProduct;
