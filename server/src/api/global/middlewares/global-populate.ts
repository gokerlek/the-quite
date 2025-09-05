/**
 * `global-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = {
   header: {
      populate: {
         logo: {
            populate: {
               image: {
                  fields: ['alternativeText', 'url'],
               },
            },
         },
         navItems: true,
         cta: true,
      },
   },
   footer: {
      populate: {
         logo: {
            populate: {
               image: {
                  fields: ['alternativeText', 'url'],
               },
            },
         },
         navItems: true,
         socialLinks: {
            populate: {
               image: {
                  fields: ['alternativeText', 'url'],
               },
            },
         },
      },
   },
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
   // Add your own logic here.
   return async (ctx, next) => {
      strapi.log.info('In global-populate middleware.');
      ctx.query.populate = populate;
      await next();
   };
};
