import api from "@api";
import { ProductLocationReturn, ProductReturn } from "@api/productApi";
import SaleItem from "@components/SaleItem";
import SalesContainer from "@components/SalesContainer";
import Elevate, { Elevation } from "@components/lib/Elevate";
import { useEffect, useState } from "react";

type Props = {
  results: ProductLocationReturn[];
};

export default function Results({ results }: Props) {
  const [fetchedResults, setFetchedResults] = useState<ProductReturn[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const toSet: ProductReturn[] = [];

      for (const product of results) {
        toSet.push(await api.productApi.getProductById(product.id));
      }

      if (mounted) {
        setFetchedResults(toSet);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [results]);

  return (
    <div className="w-full md:px-10 mt-2">
      <SalesContainer className="overflow-y-auto">
        {fetchedResults.map((product) => {
          return (
            <Elevate key={product.id} elevation={Elevation.Default}>
              <SaleItem item={product} key={product.id} />
            </Elevate>
          );
        })}
      </SalesContainer>
    </div>
  );
}
