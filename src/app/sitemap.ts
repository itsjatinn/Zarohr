import type { MetadataRoute } from "next";

const siteUrl = "https://www.zarohr.com";
const lastModified = new Date();

const routes = ["", "/what-we-do", "/contact", "/getstarted", "/comingsoon"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
