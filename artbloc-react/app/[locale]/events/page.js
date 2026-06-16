//import { useContext } from "react";
import EventCard from "@/ui/event-card";

//import EventContext from "../events/EventContext";

function Events() {
  //const test = useContext(EventContext);

  const eventType = ["future", "past"];
  const eventText = [
    ["Frontières Poreuses", "Novembre 2026", "Montréal"],
    ["Fragments de nous", "15 Novembre 2025", "Bâtiment 7"],
  ];

  const eventTextAddOn = [
    [
      " w-120 h-20 text-5xl text-[#f5ebd9] ",
      " w-115 h-10 text-3xl text-[#f5ebd9] ",
    ],
    [
      " w-120 h-20 text-5xl text-[#f5ebd9] ",
      " w-115 h-10 text-3xl text-[#f5ebd9] ",
    ],
  ];

  const eventImg = ["/AB2025Poster.png", "/AB2025Poster.png"];

  const eventImgAddOn = ["art bloc 2025 poster", "art bloc 2025 poster"];

  const eventLink = [
    [
      "/events/upcoming-event/FP2026",
      "https://www.eventbrite.ca/e/pop-up-exhibition-fragments-of-us-tickets-1467377809529?utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=listing&utm-source=cp&aff=ebdsshcopyurl",
    ],
    ["/events/past-event/FDN2025"],
  ];

  const eventBg = [" bg-[#586744] ", " bg-[#586744] "];

  const eventInfo = [
    [
      "bg-[url(/ABBannerTemp.jpg)]",
      "Description de lévénement: quoi sattendre, quest-ce qui va se passer, etc.",
      [
        "w-150 h-100 bg-[url(/chungus.png)]",
        "w-150 h-100 bg-[url(/chungus.png)]",
        "w-150 h-100 bg-[url(/chungus.png)]",
        "w-150 h-100 bg-[url(/chungus.png)]",
        "w-150 h-100 bg-[url(/chungus.png)]",
        "w-150 h-100 bg-[url(/chungus.png)]",
      ],
    ],
    [
      "bg-[url(/ABBannerTemp.jpg)]",
      "Description de lévénement: quoi sattendre, quest-ce qui va se passer, etc.",
      [
        "w-150 h-100 bg-[url(/chungus.png)]",
        "w-150 h-100 bg-[url(/chungus.png)]",
        "w-150 h-100 bg-[url(/chungus.png)]",
        "w-150 h-100 bg-[url(/chungus.png)]",
        "w-150 h-100 bg-[url(/chungus.png)]",
        "w-150 h-100 bg-[url(/chungus.png)]",
      ],
    ],
  ];

  return (
    <div className="relative flex flex-col w-screen min-h-screen ml-15 mb-15">
      <div className="relative flex w-full h-26 text-8xl mt-40 ">
        Nos événements ▪
      </div>
      <div className="relative flex w-175 h-18 text-5xl mt-15 ">À venir</div>

      <EventCard
        type={eventType[0]}
        text={eventText[0]}
        textAddOn={eventTextAddOn[0]}
        img={eventImg[0]}
        imgAddOn={eventImgAddOn[0]}
        link={eventLink[0]}
        bgColor={eventBg[0]}
        eventInfo={eventInfo[0]}
      />

      <div className="relative flex w-175 h-18 text-5xl mt-20 ">
        Événements passés
      </div>

      <EventCard
        type={eventType[1]}
        text={eventText[1]}
        textAddOn={eventTextAddOn[1]}
        img={eventImg[1]}
        imgAddOn={eventImgAddOn[1]}
        link={eventLink[1]}
        bgColor={eventBg[1]}
        eventInfo={eventInfo[1]}
      />
    </div>
  );
}

export default Events;
