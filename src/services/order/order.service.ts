"use server";

import { serverFetch } from "@/lib/serverFetch";

export async function getOrders(params?: { status?: string; page?: number; limit?: number }) {
  try {
    const query = new URLSearchParams();
    if (params?.status) query.set("status", params.status);
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString() ? `?${query.toString()}` : "";

    const res = await serverFetch.get(`/orders${qs}`);
    return await res.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch orders",
      items: [],
    };
  }
}

export async function updateOrderStatus(id: string, status: string) {
  try {
    const res = await serverFetch.patch(`/orders/${id}/status`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update order status",
    };
  }
}

export async function bookCourier(orderId: string, provider: "STEADFAST" | "PATHAO") {
  try {
    const res = await serverFetch.post(`/orders/${orderId}/book-courier`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider }),
    });
    return await res.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to book courier",
    };
  }
}

