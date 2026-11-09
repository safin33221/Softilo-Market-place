"use server";

import { serverFetch } from "@/lib/serverFetch";

export interface CreateProductPayload {
  title: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  description?: string;
}

export async function getProducts(params?: { page?: number; limit?: number }) {
  try {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString() ? `?${query.toString()}` : "";

    const res = await serverFetch.get(`/products${qs}`);
    return await res.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch products",
      items: [],
    };
  }
}

export async function createProduct(payload: CreateProductPayload) {
  try {
    const res = await serverFetch.post("/products", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create product",
    };
  }
}

export async function updateProduct(id: string, payload: Partial<CreateProductPayload>) {
  try {
    const res = await serverFetch.patch(`/products/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update product",
    };
  }
}

export async function deleteProduct(id: string) {
  try {
    const res = await serverFetch.delete(`/products/${id}`);
    return await res.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete product",
    };
  }
}

