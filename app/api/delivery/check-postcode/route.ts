import { NextResponse } from "next/server";

/* =========================================
   POSTCODE FUNCTIONS
========================================= */

function normalisePostcode(postcode: string): string {
  return postcode
    .toUpperCase()
    .replace(/\s+/g, "")
    .trim();
}

function formatPostcode(postcode: string): string {
  const cleaned = normalisePostcode(postcode);

  if (cleaned.length <= 3) {
    return cleaned;
  }

  return `${cleaned.slice(0, -3)} ${cleaned.slice(-3)}`;
}

function isValidUKPostcode(postcode: string): boolean {
  const cleaned = normalisePostcode(postcode);

  const postcodeRegex =
    /^(GIR0AA|[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2})$/;

  return postcodeRegex.test(cleaned);
}

/* =========================================
   DELIVERY AREAS

   Abhi testing ke liye manually control ho rahe hain.

   Baad mein:
   PE11
   PE12
   PE13
   PE1
   PE2

   sab Admin Panel / Database se manage honge.
========================================= */

const deliveryAreas = [
  {
    postcode: "PE11",
    zone: "Spalding Zone",
    deliveryDays: ["Tuesday", "Friday"],
  },
  {
    postcode: "PE10",
    zone: "Donington Area",
    deliveryDays: ["Wednesday", "Saturday"],
  },
  {
    postcode: "PE12",
    zone: "Surrounding Area",
    deliveryDays: ["Tuesday", "Thursday"],
  },

  /* Future areas */

  {
    postcode: "PE13",
    zone: "Wisbech Area",
    deliveryDays: ["Wednesday", "Friday"],
  },

  {
    postcode: "PE1",
    zone: "Peterborough Zone",
    deliveryDays: ["Tuesday", "Thursday"],
  },

  {
    postcode: "PE2",
    zone: "Peterborough South",
    deliveryDays: ["Wednesday", "Saturday"],
  },
];

/* =========================================
   POST API
========================================= */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const postcode = body?.postcode;

    /* EMPTY POSTCODE */

    if (!postcode || typeof postcode !== "string") {
      return NextResponse.json(
        {
          serviceable: false,
          reason: "Please enter your postcode.",
        },
        { status: 400 }
      );
    }

    /* VALIDATE POSTCODE */

    if (!isValidUKPostcode(postcode)) {
      return NextResponse.json(
        {
          serviceable: false,
          reason: "INVALID_POSTCODE",
        },
        { status: 400 }
      );
    }

    /* NORMALISE */

    const cleanedPostcode = normalisePostcode(postcode);

    /* EXTRACT OUTWARD CODE

       Example:

       PE11 4AB
       ↓
       PE114AB
       ↓
       PE11
    */

    const outwardCode = cleanedPostcode.slice(0, -3);

    const formattedPostcode = formatPostcode(postcode);

    /* FIND DELIVERY AREA */

    const deliveryArea = deliveryAreas.find(
      (area) => area.postcode === outwardCode
    );

    /* NOT COVERED */

    if (!deliveryArea) {
      return NextResponse.json({
        serviceable: false,
        postcode: formattedPostcode,
        reason: "OUTSIDE_DELIVERY_AREA",
      });
    }

    /* COVERED */

    return NextResponse.json({
      serviceable: true,

      postcode: formattedPostcode,

      zone: {
        name: deliveryArea.zone,

        deliveryDays: deliveryArea.deliveryDays,
      },
    });
  } catch (error) {
    console.error("Postcode API Error:", error);

    return NextResponse.json(
      {
        serviceable: false,
        reason: "SERVER_ERROR",
      },
      {
        status: 500,
      }
    );
  }
}