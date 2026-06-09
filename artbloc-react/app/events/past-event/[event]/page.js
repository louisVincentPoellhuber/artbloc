"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import LinkButton from "../../../../ui/link-button";

function PastEvent({ params }) {
  const eventParams = useSearchParams();

  const bannerURL = eventParams.get("bannerURL");
  //const ticketsLink = eventParams.get("ticketsLink");
  const desc = eventParams.get("desc");
  const image1 = `relative flex ${eventParams.get("image1")} bg-cover`;
  const image2 = `relative flex ${eventParams.get("image2")} bg-cover`;
  const image3 = `relative flex ${eventParams.get("image3")} bg-cover`;
  const image4 = `relative flex ${eventParams.get("image4")} bg-cover`;
  const image5 = `relative flex ${eventParams.get("image5")} bg-cover`;
  const image6 = `relative flex ${eventParams.get("image6")} bg-cover`;

  console.log(image1);

  let bgImgDiv = `relative flex flex-col items-center justify-center w-screen h-200 ${bannerURL} bg-cover`;

  let component = (
    <div className="relative flex flex-col w-screen min-h-screen">
      <div className={bgImgDiv}>
        <div className="relative flex">
          <Image
            src="/ABHomeLogo.png"
            width={400}
            height={400}
            alt="event AB logo"
          />
        </div>
        <LinkButton
          text="Billets"
          textAddOn=" text-3xl "
          buttonAddOn="relative flex justify-center items-center w-70 h-22 mt-5 bg-[#e7988c] border"
          //address={ticketsLink}
          role="newTab"
        />
      </div>

      <div className="relative flex flex-col items-center top-40 w-screen h-400">
        <div className="relative flex w-190 h-40 text-5xl">{desc}</div>
        <LinkButton
          text="Billets"
          textAddOn=" text-3xl "
          buttonAddOn="relative flex justify-center items-center top-50 w-70 h-22 bg-[#e7988c] border "
          //address={ticketsLink}
          role="newTab"
        />
        <div className="absolute grid grid-cols-3 grid-rows-2 gap-3 bottom-50 items-center justify-items-center w-screen h-215 ">
          <div className={image1}></div>
          <div className={image2}></div>
          <div className={image3}></div>
          <div className={image4}></div>
          <div className={image5}></div>
          <div className={image6}></div>
        </div>
      </div>
    </div>
  );
  return component;
}

export default PastEvent;
