import Image from "next/image";
import Link from "next/link";

import UpcomingEventBubbles from "./upcoming-event-bubbles";
import CardCarousel from "./card-carousel";
import LinkButton from "./link-button";
import InvolvementCard from "./involvement-card";

function SectionBox({
  role = "",
  text = "",
  textAddOn = "",
  img = "",
  imgAddOn = "",
  link = "",
  bgImg = "",
}) {
  let textProp;
  let textAddOnProp;
  let imgProp;
  let imgAddOnProp;
  let linkProp;
  let bgImgProp;

  let textDiv;
  let imgDiv;
  let bgImgDiv;
  let component = (
    <div>
      <h2>SectionBox</h2>
    </div>
  );

  if (role === "homeStaticPic") {
    textProp = text;
    textAddOnProp = textAddOn;
    imgProp = img;
    imgAddOnProp = imgAddOn;
    bgImgProp = bgImg;

    bgImgDiv = `relative flex flex-col items-center justify-center w-screen h-screen ${bgImgProp} bg-cover`;

    imgDiv = `relative flex`;

    textDiv = `relative flex ${textAddOnProp}`;

    component = (
      <div className={bgImgDiv}>
        <div className={imgDiv}>
          <Image src={imgProp} width={450} height={450} alt={imgAddOnProp} />
        </div>
        <div className={textDiv}>{textProp}</div>
      </div>
    );
  } else if (role === "homeABDesc") {
    textProp = text;
    textAddOnProp = textAddOn;

    textDiv = `relative flex flex-col items-center justify-center ${textAddOnProp}`;

    component = <div className={textDiv}>{textProp}</div>;
  } else if (role === "homeEventBubbles") {
    let UEBText;

    textProp = text;
    textAddOnProp = textAddOn;
    linkProp = link;
    bgImgProp = bgImg;

    bgImgDiv = `relative flex w-screen h-screen ${bgImgProp}`;

    textDiv = [
      `relative flex ${textAddOnProp[0]}`,
      `relative flex items-end justify-start ${textAddOnProp[1]}`,
      `relative flex left-1/4 top-1/5 justify-center items-center ${textAddOnProp[2]}`,
      `${textAddOnProp[3]}`,
      `absolute bottom-4 right-0 ${textAddOnProp[4]}`,
    ];

    UEBText = textProp.slice(5, 12);

    //finish implementing UpcomingEventBubbles component

    component = (
      <div className={bgImgDiv}>
        <div className="relative flex flex-col w-200 h-full pl-12 pt-20">
          <div className={textDiv[0]}>{textProp[0]}</div>
          <div className={textDiv[1]}>{textProp[1]}</div>
          <div className={textDiv[1]}>{textProp[2]}</div>
          <div className={textDiv[1]}>{textProp[3]}</div>

          <LinkButton
            text={textProp[4]}
            textAddOn={textDiv[3]}
            buttonAddOn={textDiv[2]}
            address={linkProp[0]}
            role="newTab"
          />
        </div>

        <UpcomingEventBubbles text={UEBText} />

        <Link href={linkProp[1]} className={textDiv[4]}>
          {textProp[12]}
        </Link>
      </div>
    );
  } else if (role === "homeArtistCarousel") {
    textProp = text;
    textAddOnProp = textAddOn;
    linkProp = link;
    bgImgProp = bgImg;

    bgImgDiv = `relative flex w-screen h-screen pl-12 pt-8 ${bgImgProp}`;

    textDiv = [
      `relative flex ${textAddOnProp[0]}`,
      `absolute bottom-4 right-0 ${textAddOnProp[1]}`,
    ];

    //finish implementing CardCarousel component, include only current event artists

    component = (
      <div className={bgImgDiv}>
        <div className={textDiv[0]}>{textProp[0]}</div>

        <CardCarousel />

        <Link href={linkProp} className={textDiv[1]}>
          {textProp[1]}
        </Link>
      </div>
    );
  } else if (role === "homeInvolvement") {
    let ICText;

    textProp = text;
    textAddOnProp = textAddOn;
    linkProp = link;
    bgImgProp = bgImg;

    bgImgDiv = `relative flex flex-col w-screen h-screen `;

    textDiv = [
      `relative flex items-center justify-center pt-8 ${textAddOnProp[0]}`,
      `relative flex ${textAddOnProp[1]}`,
      `relative flex ${textAddOnProp[2]}`,
    ];

    ICText = textDiv.slice(1);

    component = (
      <div className={bgImgDiv}>
        <div className={textDiv[0]}>{textProp[0]}</div>

        <div className="relative flex flex-row w-full h-3/4 pt-20 justify-center">
          <InvolvementCard
            text={textProp[1]}
            textAddOn={ICText}
            address={linkProp[0]}
            bg={bgImgProp[0]}
          />
          <InvolvementCard
            text={textProp[2]}
            textAddOn={ICText}
            address={linkProp[1]}
            bg={bgImgProp[1]}
          />
          <InvolvementCard
            text={textProp[3]}
            textAddOn={ICText}
            address={linkProp[2]}
            bg={bgImgProp[0]}
          />
        </div>
      </div>
    );
  } else if (role === "aboutMission") {
    textProp = text;
    textAddOnProp = textAddOn;

    bgImgDiv = `relative flex w-screen h-screen `;

    textDiv = [
      `relative flex ${textAddOnProp[0]}`,
      `relative flex mt-20 ${textAddOnProp[1]}`,
      `relative flex mt-8 whitespace-pre-line ${textAddOnProp[2]}`,
    ];

    component = (
      <div className={bgImgDiv}>
        <div className="relative flex flex-col justify-center w-1/3 h-full pl-12">
          <div className={textDiv[0]}>{textProp[0]}</div>
        </div>
        <div className="relative flex flex-col justify-center w-2/3 h-full pl-30 ">
          <div className={textDiv[1]}>{textProp[1]}</div>
          <div className={textDiv[2]}>{textProp[2]}</div>
        </div>
      </div>
    );
  } else if (role === "aboutStaticPic") {
    bgImgProp = bgImg;

    bgImgDiv = `relative flex w-screen h-screen ${bgImgProp} bg-cover`;

    component = <div className={bgImgDiv}></div>;
  } else if (role === "aboutHistory") {
    textProp = text;
    textAddOnProp = textAddOn;
    imgProp = img;
    imgAddOnProp = imgAddOn;
    bgImgProp = bgImg;

    bgImgDiv = `relative flex w-screen h-screen ${bgImgProp}`;

    imgDiv = `relative flex w-4/9 h-full justify-center items-center`;

    textDiv = [
      `relative flex mt-20 ${textAddOnProp[0]}`,
      `relative flex mt-8 ${textAddOnProp[1]}`,
      `relative flex mt-2 whitespace-pre-line ${textAddOnProp[2]}`,
    ];

    component = (
      <div className={bgImgDiv}>
        <div className={imgDiv}>
          <Image src={imgProp} width={850} height={850} alt={imgAddOnProp} />
        </div>
        <div className="relative flex flex-col w-5/9 h-full pr-20 ">
          <div className={textDiv[0]}>{textProp[0]}</div>
          <div className={textDiv[1]}>{textProp[1]}</div>
          <div className={textDiv[2]}>{textProp[2]}</div>
        </div>
      </div>
    );
  } else if (role === "contactInvolvement") {
    textProp = text;
    textAddOnProp = textAddOn;
    linkProp = link;
    bgImgProp = bgImg;

    bgImgDiv = `relative flex flex-col w-screen h-screen ${bgImgProp[0]}`;

    textDiv = [
      `relative flex ${textAddOnProp[0]}`,
      `relative flex ${textAddOnProp[1]}`,
    ];

    component = (
      <div className={bgImgDiv}>
        <div className="relative flex flex-row w-full h-4/5 pt-40 justify-center">
          <InvolvementCard
            text={textProp[0]}
            textAddOn={textDiv}
            address={linkProp[0]}
            bg={bgImgProp[1]}
          />
          <InvolvementCard
            text={textProp[1]}
            textAddOn={textDiv}
            address={linkProp[1]}
            bg={bgImgProp[2]}
          />
          <InvolvementCard
            text={textProp[2]}
            textAddOn={textDiv}
            address={linkProp[2]}
            bg={bgImgProp[1]}
          />
        </div>
      </div>
    );
  }

  return component;
}

export default SectionBox;
