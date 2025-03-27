// src/constants/wedding.ts
export const WEDDING_DATE = "Saturday, July 19 2025";
export const WEDDING_DATE_TIME = "15:30";
export const WEDDING_LOCATION = "Värmdö, Stockholm";
export const WEDDING_VENUE = "Fredriksborg Hotell & Restaurang";
export const WEDDING_ADDRESS = "Fredriksborgsvägen 17, 139 90 Värmdö";

export const CEREMONY_DETAILS = {
    time: "16:00",
    date: WEDDING_DATE,
    venue: WEDDING_VENUE,
    address: WEDDING_ADDRESS,
    description: ""
};

export const RECEPTION_DETAILS = {
    time: "17:00",
    date: WEDDING_DATE,
    venue: WEDDING_VENUE,
    address: WEDDING_ADDRESS,
    description: "The celebration will begin with dinner and continue with dancing until midnight."
};

export const ACCOMMODATIONS = {
    name: WEDDING_VENUE,
    checkin: `15:00`,
    checkout: `11:00`,
    breakfast:"08:00",
    details: ""
};