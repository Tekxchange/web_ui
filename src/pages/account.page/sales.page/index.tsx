import api from "@api";
import { ProductReturnNoUser } from "@api/productApi";
import { useProtectedAuth } from "@components/ProtectedRoute";
import { c } from "@utils";
import { useEffect, useState } from "react";
import SaleItem from "@components/SaleItem";
import { useParams } from "react-router-dom";
import classes from "./sales.module.less";
import Elevate, { Elevation } from "@components/lib/Elevate";

export default function SalesPage() {
  const user = useProtectedAuth();

  // Used later when the need arises to go to a specific SaleItem (editing, etc.)
  const { id: _id } = useParams();

  const [products, setProducts] = useState<ProductReturnNoUser[]>([]);

  useEffect(() => {
    let mounted = true;
    api.productApi.getProductsByUserId(user.id).then((res) => {
      if (mounted) setProducts(res);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={c`dark:bg-zinc-800 h-full w-full overflow-y-scroll flex items-center flex-col p-4`}>
      <h1 className={c`text-xl dark:font-semibold text-center mb-4`}>My Sales</h1>
      <hr className={c`max-w-md w-full`} />
      <div className={c`mt-4 w-full ${classes.salesContainer}`}>
        {products.map((product) => (
          <Elevate key={product.id} elevation={Elevation.Default}>
            <SaleItem item={product} />
          </Elevate>
        ))}
      </div>
    </div>
  );
}
