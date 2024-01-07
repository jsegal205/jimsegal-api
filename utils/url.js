const slugify = (input) => {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // only allow alphanumeric, space, hyphen
    .replace(/ +/g, "-") // reduce multiple space to single hyphen
    .replace(/-+/g, "-"); // reduce multiple hyphen to single hyphen
};

export { slugify };
