type RequestOptions<TBody = unknown> = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: TBody;
};

export async function makeRequest<TResponse = unknown, TBody = unknown>(
  url: string,
  options?: RequestOptions<TBody>
) {
  const { method = "GET", headers = {}, body } = options || {};

  const fetchOptions: RequestInit = {
    method,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  };

  if (body && method !== "GET") {
    fetchOptions.body = JSON.stringify(body);
  }

  const res = await fetch(url, fetchOptions);
  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText}: ${errorBody}`);
  }

  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return res.json() as unknown as Promise<TResponse>;
  } else {
    return res.text() as unknown as Promise<TResponse>;
  }
}
