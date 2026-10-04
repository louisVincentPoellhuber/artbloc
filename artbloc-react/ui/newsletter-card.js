// The newsletter signup is a Zeffy form embedded directly in the card, so it
// takes one click instead of sending people off-site.
//
// The three numbers below are tuned to Zeffy's current form layout:
//  - FRAME is deliberately far taller than the form needs. Zeffy's document
//    fills whatever height it is given, and a frame that matches its content
//    exactly renders its own scrollbar.
//  - CROP hides the dead space at the top, where the form's title still
//    occupies a line box (the title is set to an invisible character in Zeffy
//    so the card's own French heading does that job instead).
//  - VIEW is what actually shows: two fields and the submit button.
//
// They are tuned, not robust: if Zeffy changes the form's internal layout these
// need re-checking, or the crop will start clipping a field instead of padding.
const FRAME = 480;
const CROP = 40;
const VIEW = 160;

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
