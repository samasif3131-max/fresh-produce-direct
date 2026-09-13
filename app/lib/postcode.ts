// =========================================
// FRESH PRODUCE DIRECT
// POSTCODE DELIVERY ENGINE
// =========================================

export type DeliveryZone = {
  id: string;
  name: string;
  description?: string;
  active: boolean;
  minimumOrder: number;
  deliveryFee: number;
  freeDeliveryThreshold?: number;
  deliveryDays: string[];
};

export type DeliveryRule = {
  ruleType: "outward" | "sector" | "exact";
  postcodePattern: string;
  action: "allow" | "deny";
  priority: number;
  active: boolean;
  zoneId?: string;
};


// =========================================
// DELIVERY ZONES
//
// IMPORTANT:
// For now this is local demo data.
//
// Later we will replace this with Supabase,
// so you can manage PE11, PE12, PE13,
// PE1, PE2 etc from the Admin Panel.
// =========================================

export const deliveryZones: DeliveryZone[] = [
  {
    id: "spalding-zone",
    name: "Spalding Zone",
    description: "Spalding and surrounding delivery areas",
    active: true,
    minimumOrder: 15,
    deliveryFee: 2.99,
    freeDeliveryThreshold: 30,
    deliveryDays: ["Tuesday", "Friday"],
  },

  {
    id: "donington-zone",
    name: "Donington Zone",
    description: "Donington and surrounding villages",
    active: true,
    minimumOrder: 15,
    deliveryFee: 2.99,
    freeDeliveryThreshold: 30,
    deliveryDays: ["Wednesday", "Saturday"],
  },
];


// =========================================
// POSTCODE RULES
//
// Matching order:
//
// 1. Exact postcode
// 2. Postcode sector
// 3. Outward postcode
//
// This structure will later come directly
// from Supabase/Admin Panel.
// =========================================

export const deliveryRules: DeliveryRule[] = [
  {
    ruleType: "outward",
    postcodePattern: "PE11",
    action: "allow",
    priority: 1,
    active: true,
    zoneId: "spalding-zone",
  },

  {
    ruleType: "outward",
    postcodePattern: "PE10",
    action: "allow",
    priority: 1,
    active: true,
    zoneId: "donington-zone",
  },

  // Example deny rule:
  //
  // {
  //   ruleType: "sector",
  //   postcodePattern: "PE119",
  //   action: "deny",
  //   priority: 10,
  //   active: true,
  // },

  // Example exact override:
  //
  // {
  //   ruleType: "exact",
  //   postcodePattern: "PE114AB",
  //   action: "allow",
  //   priority: 20,
  //   active: true,
  //   zoneId: "spalding-zone",
  // },
];


// =========================================
// NORMALISE POSTCODE
// =========================================

export function normalisePostcode(postcode: string): string {
  return postcode
    .toUpperCase()
    .replace(/\s+/g, "")
    .trim();
}


// =========================================
// FORMAT POSTCODE FOR DISPLAY
// =========================================

export function formatPostcode(postcode: string): string {
  const cleaned = normalisePostcode(postcode);

  if (cleaned.length <= 3) {
    return cleaned;
  }

  return `${cleaned.slice(0, -3)} ${cleaned.slice(-3)}`;
}


// =========================================
// VALIDATE UK POSTCODE FORMAT
// =========================================

export function isValidUKPostcode(postcode: string): boolean {
  const cleaned = normalisePostcode(postcode);

  const postcodeRegex =
    /^(GIR0AA|[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2})$/;

  return postcodeRegex.test(cleaned);
}


// =========================================
// GET POSTCODE PARTS
// =========================================

export function getPostcodeParts(postcode: string) {
  const full = normalisePostcode(postcode);

  if (!isValidUKPostcode(full)) {
    throw new Error("Invalid postcode");
  }

  const outward = full.slice(0, -3);
  const inward = full.slice(-3);

  const sector = `${outward}${inward.charAt(0)}`;

  return {
    full,
    outward,
    inward,
    sector,
    formatted: formatPostcode(full),
  };
}


// =========================================
// DELIVERY CHECK RESULT
// =========================================

export type DeliveryCheckResult = {
  serviceable: boolean;
  postcode?: string;
  reason?: "INVALID_POSTCODE" | "OUTSIDE_DELIVERY_AREA";
  zone?: DeliveryZone;
};


// =========================================
// FIND DELIVERY ZONE
// =========================================

function getZone(zoneId?: string) {
  if (!zoneId) return undefined;

  return deliveryZones.find(
    (zone) => zone.id === zoneId && zone.active
  );
}


// =========================================
// CHECK DELIVERY AREA
//
// Priority:
// Exact → Sector → Outward
// =========================================

export function checkPostcodeDelivery(
  postcode: string
): DeliveryCheckResult {
  if (!isValidUKPostcode(postcode)) {
    return {
      serviceable: false,
      reason: "INVALID_POSTCODE",
    };
  }

  const parts = getPostcodeParts(postcode);

  const ruleTypes: DeliveryRule["ruleType"][] = [
    "exact",
    "sector",
    "outward",
  ];

  const patterns = {
    exact: parts.full,
    sector: parts.sector,
    outward: parts.outward,
  };

  for (const ruleType of ruleTypes) {
    const matchingRules = deliveryRules
      .filter(
        (rule) =>
          rule.active &&
          rule.ruleType === ruleType &&
          rule.postcodePattern === patterns[ruleType]
      )
      .sort((a, b) => b.priority - a.priority);

    const rule = matchingRules[0];

    if (rule) {
      if (rule.action === "deny") {
        return {
          serviceable: false,
          postcode: parts.formatted,
          reason: "OUTSIDE_DELIVERY_AREA",
        };
      }

      return {
        serviceable: true,
        postcode: parts.formatted,
        zone: getZone(rule.zoneId),
      };
    }
  }

  return {
    serviceable: false,
    postcode: parts.formatted,
    reason: "OUTSIDE_DELIVERY_AREA",
  };
}