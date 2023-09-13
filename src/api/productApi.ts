import { Filter } from "@state/search";
import { RestClient } from "./restClient";

type ProductCreateRequest = {
  description: string;
  title: string;
  price: number;
  country: string;
  state: string;
  city: string;
  zip: string;
  latitude?: number;
  longitude?: number;
};

export type ProductReturnNoUser = {
  id: number;
  title: string;
  description: string;
  price: number;
  latitude?: number;
  longitude?: number;
  city: string;
  state: string;
  zip: string;
  country: string;
  /**
   * An array containing the ids of the pictures associated with this product
   */
  pictures: number[];
};

export default class ProductApi extends RestClient {
  async search(_filter: Filter) {}

  async uploadFile(productId: number, file: File | File[], uploadCallback?: (progress: number) => void) {
    const formData = new FormData();
    if (Array.isArray(file)) {
      for (const f of file) {
        formData.append("data", f);
      }
    } else {
      formData.append("data", file);
    }

    await this.client.post(
      "/api/files/upload",
      formData,
      { product_id: productId },
      {
        onUploadProgress: uploadCallback
          ? (evt) => {
              uploadCallback(evt.progress ?? 0);
            }
          : undefined,
      },
    );
  }

  async createProduct(productDetails: ProductCreateRequest): Promise<number> {
    return (await this.client.post<{ id: number }>("/api/products/create", productDetails)).data.id;
  }

  async getProductsByUserId(userId: number, limit?: number, lowerLimit?: number): Promise<ProductReturnNoUser[]> {
    return (
      await this.client.get<ProductReturnNoUser[]>("/api/products/by_user", {
        user_id: userId,
        limit,
        lower_limit: lowerLimit,
      })
    ).data;
  }
}
