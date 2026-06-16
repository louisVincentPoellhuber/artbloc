import Form from "next/form";
import Link from "next/link";
import Image from "next/image";

import SectionBox from "@/ui/section-box";

//auatomated email send using a bot email? look into it

function Contact() {
  const contactInvolvementText = [
    [
      "Joindre en tant qu’artiste",
      "Les artistes sont au coeur de notre projet. Incrivez-vous pour discuter des possibilités de participer à un de nos prochains évènements.",
    ],
    [
      "Inscrivez-vous à notre infolettre",
      "Rejoignez notre communauté et restez à jour de toutes les nouvelles de Art Bloc!",
    ],
    [
      "Contribuer à notre mission",
      "Vos contributions nous aident à pérenniser notre organisme et à toucher un public plus large grâce à l'art. Chaque don compte pour bâtir une communauté artistique inclusive.",
    ],
  ];
  const contactInvolvementTextAddOn = [
    " w-full h-28 text-3xl ",
    " w-7/8 h-40 text-lg",
  ];
  //need actual links
  const contactInvolvementLink = [
    "/contact",
    "mailto:artbloc@outlook.com",
    "/contact",
  ];

  const contactInvolvementBg = ["bg-[#cb7484]", "bg-[#d57278]", "bg-[#e8998d]"];

  return (
    <div>
      <div className="relative flex flex-col w-screen ml-15">
        <div className="relative flex w-full h-26 text-8xl mt-40 ">
          Contactez-nous ▪
        </div>
        <div className="relative flex w-175 h-18 text-3xl mt-7 ">
          Une question? Écrivez-nous! Il nous fera un plaisir de vous répondre.
        </div>
        <div className="relative flex flex-row w-screen mt-5 mb-5 h-120">
          <div className="relative flex flex-col justify-center w-3/5 ml-5">
            <Link
              href="mailto:artbloc@outlook.com"
              target="_blank"
              className="relative flex text-3xl mb-2"
            >
              <Image
                src="/emailIcon.png"
                width={40}
                height={40}
                alt="email icon"
                className="mr-2"
              />
              artbloc@outlook.com
            </Link>

            <Link
              href="https://www.instagram.com/artblocstudio/"
              target="_blank"
              className="relative flex text-3xl mb-2"
            >
              <Image
                src="/instagramIcon.png"
                width={40}
                height={40}
                alt="email icon"
                className="mr-2"
              />
              @artblocstudio
            </Link>

            <Link
              href="https://www.facebook.com/profile.php?id=61579428009401"
              target="_blank"
              className="relative flex text-3xl mb-2"
            >
              <Image
                src="/facebookIcon.png"
                width={40}
                height={40}
                alt="email icon"
                className="mr-2"
              />
              ART BLOC Studio
            </Link>
          </div>

          <Form
            action=""
            className="relative grid grid-cols-2 w-4/5 ml-35 mr-30"
          >
            <label className="relative flex w-full h-8 text-2xl ">Prénom</label>
            <label className="relative flex w-full h-8 text-2xl ">Nom</label>

            <input
              type="text"
              name="firstName"
              placeholder="Prénom"
              className="relative flex w-4/5 h-8 border"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Nom"
              className="relative flex w-4/5 h-8 border"
            />
            <label className="relative flex col-span-2 w-full h-8 text-2xl  ">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="relative flex col-span-2 w-9/10 h-8 border"
            />

            <label className="relative flex col-span-2 w-full h-8 text-2xl ">
              Message
            </label>

            <textarea
              type="text"
              name="message"
              className="relative flex col-span-2 w-9/10 h-40 resize border"
            />

            <button
              type="submit"
              className="relative flex col-span-2 items-center justify-center justify-self-end w-40 h-15 mt-5 mr-23 bg-[#d57278] text-xl border"
            >
              Envoyer
            </button>
          </Form>
        </div>
      </div>

      <SectionBox
        role="contactInvolvement"
        text={contactInvolvementText}
        textAddOn={contactInvolvementTextAddOn}
        link={contactInvolvementLink}
        bgImg={contactInvolvementBg}
      />
    </div>
  );
}

export default Contact;
