export default function getFormattedTime() {
  return new Date().toLocaleString("sv-SE", { hour12: false }).replace("T", " ")
}
