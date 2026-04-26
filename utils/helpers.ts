export class Helpers {
  isIsoDateString(value: unknown): boolean {
    if (typeof value !== "string") {
      return false;
    }

    return Number.isNaN(Date.parse(value)) === false;
  }
}
