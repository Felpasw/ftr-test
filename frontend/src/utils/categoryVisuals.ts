import type { TransactionType } from "../services/interfaces/transaction.interface";

export type CategoryIconKey =
  | "briefcase"
  | "utensils"
  | "car"
  | "cart"
  | "piggy"
  | "wallet"
  | "tools"
  | "ticket"
  | "heart"
  | "paw"
  | "house"
  | "gift"
  | "dumbbell"
  | "book"
  | "baggage"
  | "mailbox"
  | "receipt";

export type CategoryVisual = {
  iconSrc: string;
  bgColor: string;
  textColor: string;
};

/*
 * SRC por icon key. Icons do Figma vêm com fill fixo — os 8 originais em cor
 * natural (verde pro briefcase, azul pros talheres…) e os 8 extras em cinza.
 */
const ICON_SRC: Record<CategoryIconKey, string> = {
  briefcase: "/icons/briefcase-business.svg",
  utensils: "/icons/utensils.svg",
  car: "/icons/car-front.svg",
  cart: "/icons/shopping-cart.svg",
  piggy: "/icons/piggy-bank.svg",
  wallet: "/icons/wallet.svg",
  tools: "/icons/tool-case.svg",
  ticket: "/icons/ticket.svg",
  heart: "/icons/heart-pulse.svg",
  paw: "/icons/paw-print.svg",
  house: "/icons/house.svg",
  gift: "/icons/gift.svg",
  dumbbell: "/icons/dumbbell.svg",
  book: "/icons/book-open.svg",
  baggage: "/icons/baggage-claim.svg",
  mailbox: "/icons/mailbox.svg",
  receipt: "/icons/receipt-text.svg",
};

export const CATEGORY_ICON_LIBRARY: ReadonlyArray<CategoryIconKey> = [
  "briefcase",
  "car",
  "heart",
  "piggy",
  "cart",
  "ticket",
  "tools",
  "utensils",
  "paw",
  "house",
  "gift",
  "dumbbell",
  "book",
  "baggage",
  "mailbox",
  "receipt",
];

/*
 * Palette das 7 cores do picker do Figma. Cada hex vira o par pastel
 * (bg claro + texto escuro) usado em pills, chips e cards.
 */
export const CATEGORY_COLOR_OPTIONS = [
  "#16a34a",
  "#2563eb",
  "#9333ea",
  "#db2777",
  "#dc2626",
  "#ea580c",
  "#ca8a04",
] as const;

export type CategoryColor = (typeof CATEGORY_COLOR_OPTIONS)[number];

const PALETTE_BY_COLOR: Record<CategoryColor, { bg: string; text: string }> = {
  "#16a34a": { bg: "#e0fae9", text: "#15803d" },
  "#2563eb": { bg: "#dbeafe", text: "#1d4ed8" },
  "#9333ea": { bg: "#f3e8ff", text: "#7e22ce" },
  "#db2777": { bg: "#fce7f3", text: "#be185d" },
  "#dc2626": { bg: "#fee2e2", text: "#b91c1c" },
  "#ea580c": { bg: "#ffedd5", text: "#c2410c" },
  "#ca8a04": { bg: "#f7f3ca", text: "#a16207" },
};

/*
 * Palette default por ícone — serve de fallback quando a categoria não tem
 * `color` armazenada. Casa com a "cor natural" do SVG pra que o visual fique
 * coerente (briefcase sempre verde, carrinho sempre laranja, etc).
 */
const DEFAULT_PALETTE_BY_ICON: Record<CategoryIconKey, CategoryColor> = {
  briefcase: "#16a34a",
  utensils: "#2563eb",
  car: "#9333ea",
  cart: "#ea580c",
  piggy: "#16a34a",
  wallet: "#9333ea",
  tools: "#ca8a04",
  ticket: "#db2777",
  heart: "#dc2626",
  paw: "#ca8a04",
  house: "#ea580c",
  gift: "#db2777",
  dumbbell: "#dc2626",
  book: "#2563eb",
  baggage: "#9333ea",
  mailbox: "#16a34a",
  receipt: "#ca8a04",
};

const KEYWORD_TO_ICON: ReadonlyArray<[RegExp, CategoryIconKey]> = [
  [/aliment|restaur|jantar|almoco|comida|lanche|food/i, "utensils"],
  [/transport|gasol|carro|uber|onibus|taxi/i, "car"],
  [/merc|compra|super|feira/i, "cart"],
  [/invest|rendim|poup|aplic/i, "piggy"],
  [/salari|salario|receit|renda|pagamento|freelan/i, "briefcase"],
  [/util|aluguel|conta|agua|luz|internet/i, "tools"],
  [/entretenimento|cinema|lazer|show|teatro|ingresso/i, "ticket"],
  [/saude|medic|consult|exam|farmacia|hospital|dentista|clinic/i, "heart"],
  [/pet|animal|cachorro|gato/i, "paw"],
  [/casa|lar|moveis|reforma/i, "house"],
  [/presente|gift|celebra/i, "gift"],
  [/academia|fitness|esporte/i, "dumbbell"],
  [/educac|estud|curso|livro|escola/i, "book"],
  [/viagem|turismo|hotel|voo/i, "baggage"],
  [/correio|carta|entrega|post/i, "mailbox"],
  [/boleto|nota|recibo|conta/i, "receipt"],
];

const detectIconKey = (
  categoryName: string | null | undefined,
  type: TransactionType,
): CategoryIconKey => {
  const normalized = categoryName?.trim() ?? "";
  for (const [pattern, key] of KEYWORD_TO_ICON) {
    if (pattern.test(normalized)) return key;
  }
  if (type === "INCOME") return "briefcase";
  return "wallet";
};

const isCategoryIconKey = (value: string | null | undefined): value is CategoryIconKey =>
  value != null && value in ICON_SRC;

const isCategoryColor = (value: string | null | undefined): value is CategoryColor =>
  value != null && value in PALETTE_BY_COLOR;

export type CategorySummary = {
  name?: string | null;
  icon?: string | null;
  color?: string | null;
};

/*
 * Core do visual: resolve ícone + paleta respeitando o que a categoria tem
 * salvo (icon/color) e caindo pro detect por nome quando faltam campos.
 * Backend-first: se usuário escolheu, usa; senão deduz do nome; senão wallet.
 */
export function resolveCategoryVisual(
  category: CategorySummary | null | undefined,
  type: TransactionType = "EXPENSE",
): CategoryVisual {
  const iconKey = isCategoryIconKey(category?.icon)
    ? category.icon
    : detectIconKey(category?.name, type);

  const colorKey: CategoryColor = isCategoryColor(category?.color)
    ? category.color
    : DEFAULT_PALETTE_BY_ICON[iconKey];

  const palette = PALETTE_BY_COLOR[colorKey];

  return {
    iconSrc: ICON_SRC[iconKey],
    bgColor: palette.bg,
    textColor: palette.text,
  };
}

export const getIconSrc = (key: CategoryIconKey): string => ICON_SRC[key];
