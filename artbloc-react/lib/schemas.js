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

export const Block = z.discriminatedUnion("type", [
  RichTextBlock,
  CaptionedImageBlock,
  VideoEmbedBlock,
]);

export const artistSchema = z.object({
  slug: z.string(),
  name: z.string(),
  mediums: z.array(z.string()).default([]),
  avatar: z.string(),
  blocks: z.array(Block).default([]),
});

export const eventSchema = z.object({
  slug: z.string(),
  title: LocalizedString,
  date: z.string(),
  color: z.enum(["coral", "teal"]),
  status: z.enum(["upcoming", "past"]),
  venue: LocalizedString.optional(),
  poster: z.string().optional(),
  eventbriteUrl: z.string().optional(),
  categories: z.array(LocalizedString).default([]),
  artists: z.array(z.string()).default([]),
  blocks: z.array(Block).default([]),
});

export const teamSchema = z.object({
  slug: z.string(),
  name: z.string(),
  role: LocalizedString,
  photo: z.string(),
  group: z.enum(["exec", "satellite"]),
});

export const siteSchema = z.object({
  contact: z.object({
    email: z.string(),
    instagram: z.string(),
    facebook: z.string(),
  }),
  address: LocalizedString.optional(),
  slideshow: z.array(z.string()).default([]),
});
