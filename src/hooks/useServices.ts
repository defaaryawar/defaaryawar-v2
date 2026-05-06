import { useState, useEffect, useRef } from "react";
import { fetchAllServices, fetchServiceBySlug } from "@/lib/fetchServices";
import { sanityClient } from "@/lib/sanity";
import type { Service } from "@/data/services";

// ─── Simple in-memory cache ───────────────────────────────────────────────────
let cachedServices: Service[] | null = null;
const cachedSingleService = new Map<string, Service>();

// ─── useServices: fetch all services with real-time listener + polling fallback ────
export function useServices() {
  const [services, setServices] = useState<Service[]>(cachedServices ?? []);
  const [loading, setLoading] = useState(!cachedServices);
  const [error, setError] = useState<string | null>(null);
  const fetched = useRef(false);
  const subscriptionRef = useRef<any>(null);
  const pollingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Initial fetch from cache or API
    if (!fetched.current) {
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
    }

    // Setup real-time listener for mutations (production: low latency)
    let listenerActive = false;
    try {
      subscriptionRef.current = sanityClient
        .listen('*[_type == "service"]')
        .subscribe({
          next: (update) => {
            listenerActive = true;
            // When mutation happens, refetch all services
            if (update.type === 'mutation') {
              fetchAllServices()
                .then((data) => {
                  cachedServices = data;
                  cachedSingleService.clear(); // Clear single service cache to prevent stale data
                  setServices(data);
                })
                .catch((err) => {
                  setError(err.message);
                });
            }
          },
          error: (_err) => {
            listenerActive = false;
          },
        });
    } catch (err) {
      listenerActive = false;
    }

    // Setup polling fallback (production: reliability)
    // Polls every 5 minutes if listener fails
    pollingIntervalRef.current = setInterval(() => {
      if (!listenerActive) {
        fetchAllServices()
          .then((data) => {
            // Only update if data actually changed
            if (JSON.stringify(cachedServices) !== JSON.stringify(data)) {
              cachedServices = data;
              cachedSingleService.clear();
              setServices(data);
            }
          })
          .catch((err) => {
            setError(err.message);
          });
      }
    }, 5 * 60 * 1000); // 5 minutes

    // Cleanup on unmount
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
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
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    if (!slug) return;

    // Fetch terbaru tiap kali dibuka (buat nanggulangin cache)
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

    // Setup listener real-time khusus buat single service ini
    try {
      subscriptionRef.current = sanityClient
        .listen(`*[_type == "service" && id == $slug]`, { slug })
        .subscribe({
          next: (update) => {
            if (update.type === "mutation") {
              fetchServiceBySlug(slug).then((data) => {
                if (data) {
                  cachedSingleService.set(slug, data);
                  setService(data);
                }
              });
            }
          },
        });
    } catch (err) {
      // Listener gagal (misal kena block), biarkan pake fetch biasa
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [slug]);

  return { service, loading, error };
}
