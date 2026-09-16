import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { MaterialRequest } from "../types/orderApi.js";
import type { OrderLineDraft } from "../types/order.js";

export type SkuMap = Record<string, string>;

function mapPath(): string {
  return resolve(process.cwd(), "data", "sku-map.json");
}

export function loadSkuMap(): SkuMap {
  const raw = readFileSync(mapPath(), "utf-8");
  const parsed: unknown = JSON.parse(raw);

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`SKU map must be a JSON object at ${mapPath()}`);
  }

  return parsed as SkuMap;
}

export function mapLinesToMaterials(
  lines: OrderLineDraft[],
): MaterialRequest[] {
  const map = loadSkuMap();
  const missing: string[] = [];
  const materials: MaterialRequest[] = [];

  lines.forEach((line, index) => {
    const sku = line.sku.trim();
    const materialName = map[sku];

    if (!materialName) {
      missing.push(sku || `(empty sku at line ${index + 1})`);
      return;
    }

    materials.push({
      materialName,
      quantity: line.quantity,
      itemNumber: index + 1,
    });
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing SKU mapping for: ${missing.join(", ")}. Update data/sku-map.json`,
    );
  }

  if (materials.length === 0) {
    throw new Error("Order has no line items to send to Order API");
  }

  return materials;
}
