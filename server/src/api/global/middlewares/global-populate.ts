/**
 * `global-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = {
   // About page population
   Team: {
      populate: {
         memberPic: {
            fields: ['alternativeText', 'url', 'width', 'height', 'formats'],
         },
      },
   },
   // Contact page population
   contact: {
      populate: {
         placeholder: {
            fields: ['alternativeText', 'url', 'width', 'height', 'formats'],
         },
      },
   },
   // Events detail page population
   EventDetails: {
      populate: {
         eventMedia: {
            fields: ['alternativeText', 'url', 'width', 'height', 'formats'],
         },
         PreviousEvents: {
            fields: ['alternativeText', 'url', 'width', 'height', 'formats'],
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
