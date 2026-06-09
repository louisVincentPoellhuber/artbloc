import Link from "next/link";

function LinkButton({
  text = "",
  textAddOn = "",
  buttonAddOn = "",
  address = "/",
  params = {},
  role = "",
}) {
  let component;

  if (role === "newPage") {
    component = (
      <Link
        href={{
          pathname: address,
          query: params,
        }}
        className={buttonAddOn}
      >
        <div className={textAddOn}>{text}</div>
      </Link>
    );
  } else if (role === "newTab") {
    component = (
      <Link href={address} target="_blank" className={buttonAddOn}>
        <div className={textAddOn}>{text}</div>
      </Link>
    );
  } else {
    component = (
      <Link href={address} className={buttonAddOn}>
        <div className={textAddOn}>{text}</div>
      </Link>
    );
  }

  return component;
}

export default LinkButton;
