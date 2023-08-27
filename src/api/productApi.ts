import { Filter } from "@state/search";
import { RestClient } from "./restClient";

export default class ProductApi extends RestClient {
  async search(_filter: Filter) {}

  async uploadFile(productId: number, file: File, uploadCallback?: (progress: number) => void) {
    const formData = new FormData();
    formData.append("data", file);

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
}
