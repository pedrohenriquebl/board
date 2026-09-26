export function getCookiesFromHeaders(incoming: Headers) {
  const outgoing = new Headers({ "Content-Type": "application/json" });
  const cookie = incoming.get("cookie");

  if (cookie) outgoing.set("cookie", cookie);
  return outgoing;
}
