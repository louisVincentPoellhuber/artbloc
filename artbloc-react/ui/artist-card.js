import Image from "next/image";
import Link from "next/link";

function ArtistCard({
  text = "",
  textAddOn = "",
  img = "",
  imgAddOn = "",
  divAddOn = "",
  link = "/",
  params = {},
}) {
  let textDiv = [
    `relative flex w-full h-12 justify-center items-center text-2xl ${textAddOn[0]}`,
    `relative flex w-full h-10 justify-center items-center text-xl ${textAddOn[1]}`,
  ];

  let component = (
    <Link
      href={{
        pathname: link,
        query: params,
      }}
      className={divAddOn}
    >
      <div className="relative flex flex-col items-center w-90 h-110 border-2">
        <Image
          src={img}
          width={360}
          height={360}
          alt={imgAddOn}
          className="relative flex"
        />
        <div className={textDiv[0]}>{text[0]}</div>
        <div className={textDiv[1]}>{text[1]}</div>
      </div>
    </Link>
  );

  return component;
}

export default ArtistCard;
