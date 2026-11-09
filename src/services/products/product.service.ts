"use server";

import { serverFetch } from "@/lib/serverFetch";
import { Product } from "@/types/api";

export interface CreateProductPayload {
  title: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  description?: string;
}

export interface ProductsResponse {
  success?: boolean;
  message?: string;
  items?: Product[];
  total?: number;
  page?: number;
  limit?: number;
}

export async function getProducts(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<ProductsResponse> {
  try {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.search) query.set("search", params.search);
    const qs = query.toString() ? `?${query.toString()}` : "";

    const res = await serverFetch.get(`/products${qs}`);
    const data = await res.json().catch(() => null);

    if (Array.isArray(data)) {
      return { success: true, items: data, total: data.length };
    }

    if (data?.items && Array.isArray(data.items)) {
      return {
        success: true,
        items: data.items,
        total: data.total || data.items.length,
        page: data.page,
        limit: data.limit,
      };
    }

    return {
      success: true,
      items: [],
      total: 0,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch products",
      items: [],
      total: 0,
    };
  }
}

export async function getProductById(id: string): Promise<{ success: boolean; product?: Product; message?: string }> {
  try {
    const res = await serverFetch.get(`/products/${id}`);
    const data = await res.json().catch(() => null);
    if (res.ok && data) {
      return { success: true, product: data?.product || data };
    }
    return { success: false, message: data?.message || "পণ্য লোড করা সম্ভব হয়নি" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch product",
    };
  }
}

export async function createProduct(payload: CreateProductPayload): Promise<{ success: boolean; product?: Product; message?: string }> {
  try {
    const res = await serverFetch.post("/products", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);

    if (res.ok && (data?.success !== false)) {
      return {
        success: true,
        product: data?.product || data,
        message: data?.message || "পণ্য সফলভাবে যোগ করা হয়েছে",
      };
    }

    return {
      success: false,
      message: data?.message || "পণ্য তৈরিতে সমস্যা হয়েছে",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create product",
    };
  }
}

export async function updateProduct(
  id: string,
  payload: Partial<CreateProductPayload>
): Promise<{ success: boolean; product?: Product; message?: string }> {
  try {
    const res = await serverFetch.patch(`/products/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);

    if (res.ok && (data?.success !== false)) {
      return {
        success: true,
        product: data?.product || data,
        message: data?.message || "পণ্য তথ্য সফলভাবে আপডেট হয়েছে",
      };
    }

    return {
      success: false,
      message: data?.message || "পণ্য আপডেট করতে সমস্যা হয়েছে",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update product",
    };
  }
}

export async function deleteProduct(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const res = await serverFetch.delete(`/products/${id}`);
    const data = await res.json().catch(() => null);

    if (res.ok) {
      return {
        success: true,
        message: data?.message || "পণ্য সফলভাবে মুছে ফেলা হয়েছে",
      };
    }

    return {
      success: false,
      message: data?.message || "পণ্য মুছে ফেলতে সমস্যা হয়েছে",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete product",
    };
  }
}

