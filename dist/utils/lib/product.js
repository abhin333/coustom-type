import { noAuthFetch } from "../../user/api";
export async function fetchProductDetails({ productId }) {
    const response = await noAuthFetch(`service/buyer/product/${productId}`);
    if (response) {
        const data = await response.json;
        return data;
    }
    throw new Error("Failed to fetch product details: response is null");
}
export async function getProductDetails({ productId }) {
    if (!productId) {
        return;
    }
    const response = noAuthFetch(`service/buyer/product/${productId}/`, { method: "GET" });
    return response;
}
