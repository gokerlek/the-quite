export default [
   'strapi::logger',
   'strapi::errors',
   {
      name: 'strapi::security',
      config: {
         contentSecurityPolicy: {
            useDefaults: true,
            directives: {
               'connect-src': ["'self'", 'https:'],
               'img-src': [
                  "'self'",
                  'data:',
                  'blob:',
                  'market-assets.strapi.io',
               ],
               'media-src': [
                  "'self'",
                  'data:',
                  'blob:',
                  'market-assets.strapi.io',
               ],
               upgradeInsecureRequests: null,
            },
         },
      },
   },
   {
      name: 'strapi::cors',
      config: {
         origin: [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'http://localhost:3001',
            'http://127.0.0.1:3001',
            // Production frontend URL
            process.env.FRONTEND_URL,
         ].filter(Boolean),
         credentials: true,
      },
   },
   'strapi::poweredBy',
   'strapi::query',
   'strapi::body',
   'strapi::session',
   'strapi::favicon',
   'strapi::public',
];
