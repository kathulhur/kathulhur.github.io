module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("resume.pdf");

  return {
    dir: {
      input: ".",
      output: "_site",
      data: "_data",
      includes: "_includes",
    },
  };
};
