import { Capacitor } from "@capacitor/core";

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const isNative = Capacitor.isNativePlatform();
  const proxyURL = import.meta.env.VITE_PROXY_URL;
  const prevURL = typeof input === "string" ? input : input.url;
  const newURL = isNative ? new URL(proxyURL + prevURL, proxyURL) : input;
  const res = await fetch(newURL, init);
  return res.json();
}
