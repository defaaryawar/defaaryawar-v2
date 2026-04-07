import { sanityClient, isSanityConfigured, urlFor } from "./sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { services as staticServices, type Service } from "@/data/services";

// ─── Sanity document shape ────────────────────────────────────────────────────
interface SanityService {
  _id: string;
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  price: number;
  priceLabel: string;
  originalPrice: number;
  originalPriceLabel: string;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
  highlights: string[];
  highlightsEn: string[];
  revisions: number;
  warrantyDays: number;
  includeDomain: boolean;
  deliveryDays: number;
  image: unknown;
  images?: unknown[];
  popular?: boolean;
}

// ─── GROQ Queries ─────────────────────────────────────────────────────────────
const ALL_SERVICES_QUERY = `*[_type == "service"] | order(price asc) {
  _id,
  "id": id,
  name,
  nameEn,
  category,
  categoryEn,
  price,
  priceLabel,
  originalPrice,
  originalPriceLabel,
  description,
  descriptionEn,
  features,
  featuresEn,
  highlights,
  highlightsEn,
  revisions,
  warrantyDays,
  includeDomain,
  deliveryDays,
  image,
  images,
  popular
}`;

const SERVICE_BY_SLUG_QUERY = `*[_type == "service" && id == $slug][0] {
  _id,
  "id": id,
  name,
  nameEn,
  category,
  categoryEn,
  price,
  priceLabel,
  originalPrice,
  originalPriceLabel,
  description,
  descriptionEn,
  features,
  featuresEn,
  highlights,
  highlightsEn,
  revisions,
  warrantyDays,
  includeDomain,
  deliveryDays,
  image,
  images,
  popular
}`;

// ─── Transform Sanity doc → Service ───────────────────────────────────────────
function mapSanityToService(doc: SanityService): Service {
  return {
    id: doc.id,
    name: doc.name,
    nameEn: doc.nameEn,
    category: doc.category,
    categoryEn: doc.categoryEn,
    price: doc.price,
    priceLabel: doc.priceLabel,
    originalPrice: doc.originalPrice,
    originalPriceLabel: doc.originalPriceLabel,
    description: doc.description,
    descriptionEn: doc.descriptionEn,
    features: doc.features || [],
    featuresEn: doc.featuresEn || [],
    highlights: doc.highlights || [],
    highlightsEn: doc.highlightsEn || [],
    revisions: doc.revisions,
    warrantyDays: doc.warrantyDays,
    includeDomain: doc.includeDomain,
    deliveryDays: doc.deliveryDays,
    image: doc.image
      ? urlFor(doc.image as SanityImageSource).width(800).quality(80).auto("format").url()
      : "/our-services/placeholder.webp",
    images: doc.images?.length
      ? doc.images.map((img) =>
          urlFor(img as SanityImageSource).width(800).quality(80).auto("format").url()
        )
      : undefined,
    popular: doc.popular,
  };
}

// ─── Fetch all services ───────────────────────────────────────────────────────
export async function fetchAllServices(): Promise<Service[]> {
  if (!isSanityConfigured()) {
    console.info("[Services] Sanity not configured — using static fallback data");
    return staticServices;
  }

  try {
    const docs: SanityService[] = await sanityClient.fetch(ALL_SERVICES_QUERY);

    if (!docs || docs.length === 0) {
      console.info("[Services] No data in Sanity — using static fallback data");
      return staticServices;
    }

    return docs.map(mapSanityToService);
  } catch (error) {
    console.error("[Services] Failed to fetch from Sanity:", error);
    return staticServices;
  }
}

// ─── Fetch single service by slug ─────────────────────────────────────────────
export async function fetchServiceBySlug(
  slug: string,
): Promise<Service | null> {
  if (!isSanityConfigured()) {
    return staticServices.find((s) => s.id === slug) ?? null;
  }

  try {
    const doc: SanityService | null = await sanityClient.fetch(
      SERVICE_BY_SLUG_QUERY,
      { slug },
    );

    if (!doc) {
      return staticServices.find((s) => s.id === slug) ?? null;
    }

    return mapSanityToService(doc);
  } catch (error) {
    console.error("[Services] Failed to fetch service by slug:", error);
    return staticServices.find((s) => s.id === slug) ?? null;
  }
}
