import { createLucideIcon } from "lucide-react";

/**
 * Lucide ships no brand icons, so WhatsApp is drawn here in Lucide's style:
 * its message-circle bubble with its phone glyph inside. It takes the same
 * props as any Lucide icon (size, strokeWidth, className).
 */
export const WhatsappIcon = createLucideIcon("whatsapp", [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "bubble",
    },
  ],
  [
    "path",
    {
      d: "M12.824 14.056a.45.45 0 0 0 .546-.136l.16-.209A.9.9 0 0 1 14.25 13.35h1.35a.9.9 0 0 1 .9.9v1.35a.9.9 0 0 1-.9.9A8.1 8.1 0 0 1 7.5 8.4a.9.9 0 0 1 .9-.9h1.35a.9.9 0 0 1 .9.9v1.35a.9.9 0 0 1-.36.72l-.211.158a.45.45 0 0 0-.131.555 6.3 6.3 0 0 0 2.876 2.873",
      key: "phone",
    },
  ],
]);
