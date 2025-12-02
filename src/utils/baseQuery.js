// src/utils/baseQuery.js
import { httpClient } from "@/utils/http"; // Import axios instance đã cấu hình interceptor

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      // Gọi Axios (nó sẽ tự chạy qua interceptor check token hết hạn)
      const result = await httpClient({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      // RTK Query yêu cầu trả về object { data: ... }
      return { data: result.data };
    } catch (axiosError) {
      // Xử lý lỗi trả về chuẩn format RTK Query
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

export default axiosBaseQuery;
