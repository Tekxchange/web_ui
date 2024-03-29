import { DistanceUnit, Filter } from "@state/search";
import { RestClient } from "./restClient";
import { LatLong } from "src/pages/app.page";
import { MinUserReturn } from "./userApi";

export type ProductLocationReturn = {
  id: number;
  longitude: number;
  latitude: number;
  price: number;
};

type ProductFilter = {
  coordinate: LatLong;
  radius: number;
  units?: DistanceUnit;
  query?: string;
  priceLow?: number;
  priceHigh?: number;
  city?: string;
  zip?: string;
  productIdLower?: number;
};

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

export type ProductReturn = {
  id: number;
  title: string;
  description: string;
  price: number;
  createdBy: MinUserReturn;
  latitude?: number;
  longitude?: number;
  pictures: number[];
};

export default class ProductApi extends RestClient {
  async search(filter: Filter): Promise<ProductLocationReturn[]> {
    const query: ProductFilter = {
      coordinate: { latitude: filter.latitude, longitude: filter.longitude },
      radius: filter.radius,
      priceHigh: filter.priceHigh.raw,
      priceLow: filter.priceLow.raw,
      units: filter.radiusUnit,
      query: filter.query.raw,
    };

    return (await this.client.post<ProductLocationReturn[]>("/api/products/search", query)).data;
  }

  async uploadFile(productId: number, file: File | File[], uploadCallback?: (progress: number) => void) {
    const toUpload = Array.isArray(file) ? file : [file];

    const promises = toUpload.map((fileToUpload) => {
      const formData = new FormData();
      formData.append("data", fileToUpload);

      return this.client.post(
        "/api/files/upload",
        formData,
        { product_id: productId },
        {
          headers: {
            "Content-Type": fileToUpload.type,
          },
          onUploadProgress: uploadCallback
            ? (evt) => {
                uploadCallback(evt.progress ?? 0);
              }
            : undefined,
        },
      );
    });

    return await Promise.all(promises);
  }

  async createProduct(productDetails: ProductCreateRequest): Promise<number> {
    return (await this.client.post<{ id: number }>("/api/products/create", productDetails)).data.id;
  }

  async getProductById(id: number): Promise<ProductReturn> {
    return (await this.client.get<ProductReturn>("/api/products/product", { id })).data;
  }

  async deleteProduct(id: number): Promise<void> {
    await this.client.delete("/api/products/product", { id });
  }

  getPictureUrl(pictureId: number): string {
    return `${this.client.baseUrl}/api/files/get_file?id=${pictureId}`;
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
