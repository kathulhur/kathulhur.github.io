/**
 * Eleventy configuration.
 *
 * Source lives in `src/`, the static build lands in `_site/`.
 * Hosted at the root of a custom domain / user site, so pathPrefix is "/".
 * Templates still pass URLs through the `url` filter, so if the site ever
 * moves under a subpath the links keep resolving — only this value changes.
 */
module.exports = function (eleventyConfig) {
  // Ship CSS/JS untouched: assets/** → _site/assets/**
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Keep the browser in sync while editing styles/scripts.
  eleventyConfig.addWatchTarget("src/assets/");

  // The build year, for the footer — set once, used everywhere.
  eleventyConfig.addGlobalData("buildYear", () => new Date().getFullYear());

  return {
    pathPrefix: "/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    // Nunjucks for both templates and inline data interpolation.
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
