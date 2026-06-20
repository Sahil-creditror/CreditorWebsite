export const openWebinarRegistration = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("openWebinarRegistration"));
};
