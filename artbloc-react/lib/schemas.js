import { z } from "zod";

export const LocalizedString = z.object({
  fr: z.string(),
  en: z.string().optional(),
});

const RichTextBlock = z.object({
  type: z.literal("richText"),
  text: LocalizedString,
  variant: z.enum(["lead", "body"]).optional(),
});

const CaptionedImageBlock = z.object({
  type: z.literal("captionedImage"),
  image: z.string(),
  caption: LocalizedString.optional(),
  variant: z.enum(["side", "full"]).default("full"),
});

const VideoEmbedBlock = z.object({
  type: z.literal("videoEmbed"),
  provider: z.literal("youtube").default("youtube"),
  id: z.string(),
});

const QuoteBlock = z.object({
  type: z.literal("quote"),
  text: LocalizedString,
  attribution: LocalizedString.optional(),
});

const TextImageBlock = z.object({
  type: z.literal("textImage"),
  text: LocalizedString,
  image: z.string(),
  alt: LocalizedString.optional(),
  side: z.enum(["left", "right"]).default("left"),
});

const BlockImage = z.object({
  src: z.string(),
  alt: LocalizedString.optional(),
});

const GalleryBlock = z.object({
  type: z.literal("gallery"),
  images: z.array(BlockImage).min(1),
  columns: z.number().default(3),
});

const ColoredSectionBlock = z.object({
  type: z.literal("coloredSection"),
  color: z.enum(["coral", "teal"]),
  heading: LocalizedString.optional(),
  text: LocalizedString,
});

const CarouselBlock = z.object({
  type: z.literal("carousel"),
  images: z.array(BlockImage).min(1),
});

export const Block = z.discriminatedUnion("type", [
  RichTextBlock,
  CaptionedImageBlock,
  VideoEmbedBlock,
  QuoteBlock,
  TextImageBlock,
  GalleryBlock,
  ColoredSectionBlock,
  CarouselBlock,
]);

export const artistSchema = z.object({
  slug: z.string(),
  name: z.string(),
  mediums: z.array(LocalizedString).default([]),
  avatar: z.string(),
  hoverImage: z.string().optional(),
  blocks: z.array(Block).default([]),
});

export const eventSchema = z.object({
  slug: z.string(),
  title: LocalizedString,
  date: z.string(), // ISO date; upcoming/past is derived from this (see lib/events.js)
  color: z.enum(["coral", "teal"]),
  // Card poster side — explicit per event, independent of upcoming/past.
  // "left" = poster left / panel right; "right" = mirrored (poster right).
  orientation: z.enum(["left", "right"]).default("left"),
  venue: LocalizedString.optional(),
  price: LocalizedString.optional(),
  poster: z.string().optional(),
  eventbriteUrl: z.string().optional(),
  artists: z.array(z.string()).default([]),
  blocks: z.array(Block).default([]),
});

export const teamSchema = z.object({
  slug: z.string(),
  name: z.string(),
  role: LocalizedString,
  photo: z.string(),
  hoverImage: z.string().optional(),
  group: z.enum(["exec", "satellite"]),
});

export const siteSchema = z.object({
  contact: z.object({
    email: z.string(),
    instagram: z.string(),
    facebook: z.string(),
  }),
  // "Impliquez-vous" destinations, shared by Home and Contact. A null or absent
  // entry renders its card inert rather than linking nowhere.
  involvement: z
    .object({
      artists: z.string().nullable().optional(),
      newsletter: z.string().nullable().optional(),
      donate: z.string().nullable().optional(),
    })
    .default({}),
  address: LocalizedString.optional(),
  // Either a folder under public/ (e.g. "slideshow") or an explicit list of paths.
  slideshow: z.union([z.string(), z.array(z.string())]).default([]),
});
