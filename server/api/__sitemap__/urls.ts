// import { asSitemapUrl, defineSitemapEventHandler } from "#imports";

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig();
  let url = `${config.public.apiBackend}/api/candidato/dynamicUrls/`;
  const candidatos = await $fetch<ReturnType<typeof asSitemapUrl>>(url);
  url = `${config.public.apiBackend}/api/colegio/dynamicUrls/`;
  const colegios = await $fetch<ReturnType<typeof asSitemapUrl>>(url);
  return [...candidatos, ...colegios];
});
