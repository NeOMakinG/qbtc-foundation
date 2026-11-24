// Site configuration. Edit these values and redeploy; nothing else needs to change.
window.QBTC_SITE = {
  // Explainer video. Leave empty ("") and the video section stays hidden.
  // Set it to an .mp4/.webm file path (e.g. "/media/explainer.mp4") or a
  // YouTube/Vimeo embed URL (e.g. "https://www.youtube-nocookie.com/embed/VIDEO_ID").
  videoSrc: "/media/explainer-full.mp4",
  // Optional poster image shown before an .mp4/.webm video plays (e.g. "/media/explainer-poster.jpg").
  videoPoster: "/media/explainer-poster.jpg",
  // Caption under the player (full-length version).
  videoLabel: "Full explainer · 6 min 38 s · every point of the QBTC deck, in 7 chapters",
  // Optional vertical cut for phones, offered as a link under the full video (never instead of it).
  // Extra links under the player: the 2.5-min cut and the vertical cut.
  videoLinks: [
    { src: "/media/explainer.mp4", label: "Short version (2 min 35 s)" },
    { src: "/media/explainer-vertical.mp4", label: "Vertical version (55 s)" },
  ],
};
