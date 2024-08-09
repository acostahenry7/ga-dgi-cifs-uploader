function addQueryParams(url, params) {
  url = url + "?";

  Object.entries(params).forEach((param, index) => {
    url += `${param[0]}=${param[1]}${
      index != Object.entries(params).length - 1 ? "&" : ""
    }`;
  });

  return url;
}

export { addQueryParams };
