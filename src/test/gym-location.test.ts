import { describe, expect, it } from "vitest";

import { appleMapsUrl, googleDirectionsUrl, gymCoords } from "@/lib/gym/location";

describe("gym location links", () => {
  it("sends Google directions to the pin saved in admin, not the visitor's location", () => {
    const url = googleDirectionsUrl({ mapLat: "27.2249", mapLng: "94.1054" });
    expect(url).toBe("https://www.google.com/maps/dir/?api=1&destination=27.2249,94.1054&travelmode=driving");
  });

  it("uses the admin's custom Google Maps link when one is set", () => {
    const url = googleDirectionsUrl({ mapLat: "27.2249", mapLng: "94.1054", mapsLink: "https://maps.app.goo.gl/abc" });
    expect(url).toBe("https://maps.app.goo.gl/abc");
  });

  it("falls back to the default pin when saved coordinates are invalid", () => {
    expect(gymCoords({ mapLat: "abc", mapLng: "" })).toEqual({ lat: 27.224858, lng: 94.105446 });
  });

  it("points Apple Maps at the gym as the destination", () => {
    expect(appleMapsUrl({ mapLat: "27.2249", mapLng: "94.1054" })).toContain("daddr=27.2249,94.1054");
  });
});
