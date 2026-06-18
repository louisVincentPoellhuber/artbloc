import RichText from "@/ui/blocks/rich-text";
import CaptionedImage from "@/ui/blocks/captioned-image";
import VideoEmbed from "@/ui/blocks/video-embed";
import Quote from "@/ui/blocks/quote";
import TextImage from "@/ui/blocks/text-image";
import Gallery from "@/ui/blocks/gallery";
import ColoredSection from "@/ui/blocks/colored-section";
import CarouselBlock from "@/ui/blocks/carousel";

export const registry = {
  richText: RichText,
  captionedImage: CaptionedImage,
  videoEmbed: VideoEmbed,
  quote: Quote,
  textImage: TextImage,
  gallery: Gallery,
  coloredSection: ColoredSection,
  carousel: CarouselBlock,
};
