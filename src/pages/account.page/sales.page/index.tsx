import api from "@api";
import { ProductReturnNoUser } from "@api/productApi";
import { useProtectedAuth } from "@components/ProtectedRoute";
import { c } from "@utils";
import { useEffect, useState } from "react";
import SaleItem from "@components/SaleItem";
import { useParams } from "react-router-dom";
import classes from "./sales.module.less";
import Elevate, { Elevation } from "@components/lib/Elevate";
import Modal from "@components/Modal";
import ConfirmDeleteModalContent from "./ConfirmDeleteModalContent";
import useConfirmation from "@utils/useConfirmation";
import { toast } from "react-toastify";

export default function SalesPage() {
  const user = useProtectedAuth();

  // Used later when the need arises to go to a specific SaleItem (editing, etc.)
  const { id: _id } = useParams();
  const [products, setProducts] = useState<ProductReturnNoUser[]>([]);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteConfirmation, doPerformDelete] = useConfirmation();

  function deleteItem(itemId: number) {
    return async () => {
      setConfirmDeleteOpen(true);
      const shouldDelete = await deleteConfirmation;
      setConfirmDeleteOpen(false);

      if (!shouldDelete) return;

      await api.productApi.deleteProduct(itemId);
      setProducts((products) => products.filter((prod) => prod.id !== itemId));
      toast.success("Product and all pictures successfully deleted");
    };
  }

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
      <Modal open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <ConfirmDeleteModalContent onCancel={() => doPerformDelete(false)} onDelete={() => doPerformDelete(true)} />
      </Modal>
      <h1 className={c`text-xl dark:font-semibold text-center mb-4`}>My Sales</h1>
      <hr className={c`max-w-md w-full`} />
      <div className={c`mt-4 w-full ${classes.salesContainer}`}>
        {products.map((product) => (
          <Elevate key={product.id} elevation={Elevation.Default}>
            <SaleItem item={{ ...product, createdBy: user }} onDelete={deleteItem(product.id)} ownItem />
          </Elevate>
        ))}
      </div>
    </div>
  );
}
