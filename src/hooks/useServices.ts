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
                  console.error('Error refetching services after mutation:', err);
                  setError(err.message);
                });
            }
          },
          error: (err) => {
            console.error('Listener error:', err);
            listenerActive = false;
          },
        });
    } catch (err) {
      console.error('Failed to setup listener:', err);
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
              console.log('[Poll] Services updated');
            }
          })
          .catch((err) => {
            console.error('Error polling services:', err);
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
