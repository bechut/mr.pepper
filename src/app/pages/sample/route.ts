export default {
  path: 'sample',
  element: (await import("./page")).default,
  en: (await import("./locale/en")).default,
  vi: (await import("./locale/vi")).default,
};


