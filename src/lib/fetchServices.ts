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
  image {
    asset->,
    hotspot,
    crop
  },
  "images": images[] { asset->, hotspot, crop },
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
  image {
    asset->,
    hotspot,
    crop
  },
  "images": images[] { asset->, hotspot, crop },
  popular
}`;

// ─── Transform Sanity doc → Service ───────────────────────────────────────────
function mapSanityToService(doc: SanityService): Service {
  // Helper to handle both string paths and Sanity image objects
  const imageToUrl = (img: unknown, fieldName?: string): string => {
    if (!img) return "/our-services/placeholder.webp";
    
    // String path from seed
    if (typeof img === 'string') return img;
    
    // Image object from Sanity Studio (with resolved asset)
    const imgObj = img as any;
    
    // Check if asset exists and has _id (resolved asset object)
    if (imgObj?.asset && imgObj.asset._id) {
      try {
        // Use urlFor with resolved asset object - it will handle _id internally
        return urlFor(img as SanityImageSource).width(800).quality(80).auto("format").url();
      } catch (err) {
        return "/our-services/placeholder.webp";
      }
    }
    
    // Asset is null or doesn't have _id - use placeholder
    return "/our-services/placeholder.webp";
  };

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
    image: imageToUrl(doc.image, `${doc.id}-image`),
    images: doc.images?.length
      ? doc.images
          .map((img, idx) => imageToUrl(img, `${doc.id}-images[${idx}]`))
          .filter((url) => url !== "/our-services/placeholder.webp") // Filter out broken images
      : undefined,
    popular: doc.popular,
  };
}

// ─── Fetch all services ───────────────────────────────────────────────────────
export async function fetchAllServices(): Promise<Service[]> {
  if (!isSanityConfigured()) {
    return staticServices;
  }

  try {
    const docs: SanityService[] = await sanityClient.fetch(ALL_SERVICES_QUERY);

    if (!docs || docs.length === 0) {
      return staticServices;
    }

    return docs.map(mapSanityToService);
  } catch (error) {
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
    return staticServices.find((s) => s.id === slug) ?? null;
  }
}
