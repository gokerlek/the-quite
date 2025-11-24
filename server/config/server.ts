export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  // URL of the server - useful for generating absolute URLs
  url: env('SERVER_URL', 'http://localhost:1337'),
});
