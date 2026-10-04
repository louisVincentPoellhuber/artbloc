// The newsletter signup is a Zeffy form embedded directly in the card, so it
// takes one click instead of sending people off-site.
//
// The three numbers below are tuned to Zeffy's current form layout:
//  - FRAME is deliberately far taller than the form needs. Zeffy's document
//    fills whatever height it is given, and a frame that matches its content
//    exactly renders its own scrollbar.
//  - VIEW is what actually shows: two fields and the submit button.
//  - CROP would trim the dead row left by the form's hidden title, but it is
//    deliberately 0. A fixed pixel offset into a cross-origin iframe is
//    renderer-dependent — at 40px it clipped the first field in Firefox while
//    rendering correctly in Chromium at every width, and there is no way to
//    verify it from here. Showing the form from its true top cannot clip,
//    at the cost of a little empty space under the body copy.
const FRAME = 480;
const CROP = 0;
const VIEW = 200;

export default function NewsletterCard({ title, body, embedUrl }) {
  if (!embedUrl) return null;

  return (
    <div className="relative flex flex-col rounded-2xl bg-coral p-6 text-cream">
      <h3 className="font-display text-2xl font-semibold leading-tight">{title}</h3>
      <p className="mt-3 text-cream/90">{body}</p>
      {/* -mx-6 cancels the card's padding so the fields span its full width. */}
      <div className="mt-2 -mx-6">
        <div className="relative w-full overflow-hidden" style={{ height: VIEW }}>
          <iframe
            title={title}
            src={embedUrl}
            scrolling="no"
            style={{ top: -CROP, height: FRAME }}
            className="absolute left-0 w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
