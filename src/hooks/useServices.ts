import { useState, useEffect, useRef } from "react";
import { fetchAllServices, fetchServiceBySlug } from "@/lib/fetchServices";
import type { Service } from "@/data/services";

// ─── Simple in-memory cache ───────────────────────────────────────────────────
let cachedServices: Service[] | null = null;
const cachedSingleService = new Map<string, Service>();

// ─── useServices: fetch all services ──────────────────────────────────────────
export function useServices() {
  const [services, setServices] = useState<Service[]>(cachedServices ?? []);
  const [loading, setLoading] = useState(!cachedServices);
  const [error, setError] = useState<string | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (cachedServices || fetched.current) return;
    fetched.current = true;

    fetchAllServices()
      .then((data) => {
        cachedServices = data;
        setServices(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { services, loading, error };
}

// ─── useService: fetch single service by slug ─────────────────────────────────
export function useService(slug: string | undefined) {
  const cached = slug ? cachedSingleService.get(slug) : undefined;
  const fromListCache =
    slug && cachedServices
      ? cachedServices.find((s) => s.id === slug)
      : undefined;
  const initialService = cached ?? fromListCache ?? null;

  const [service, setService] = useState<Service | null>(initialService);
  const [loading, setLoading] = useState(!initialService);
  const [error, setError] = useState<string | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (!slug || initialService || fetched.current) return;
    fetched.current = true;

    fetchServiceBySlug(slug)
      .then((data) => {
        if (data) {
          cachedSingleService.set(slug, data);
        }
        setService(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, initialService]);

  return { service, loading, error };
}
