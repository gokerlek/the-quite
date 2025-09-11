import type { Schema, Struct } from '@strapi/strapi';

export interface AboutTeam extends Struct.ComponentSchema {
   collectionName: 'components_about_teams';
   info: {
      displayName: 'Team';
   };
   attributes: {
      MemberInfo: Schema.Attribute.RichText;
      memberPic: Schema.Attribute.Media<'images'>;
      Members: Schema.Attribute.String;
      Roles: Schema.Attribute.String;
   };
}

export interface ContactContact extends Struct.ComponentSchema {
   collectionName: 'components_contact_contacts';
   info: {
      displayName: 'Contact';
   };
   attributes: {
      addres: Schema.Attribute.String;
      email: Schema.Attribute.String;
      Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
   };
}

export interface EventsDetailMediaField extends Struct.ComponentSchema {
   collectionName: 'components_events_detail_media_fields';
   info: {
      displayName: 'Body';
   };
   attributes: {
      Cover: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
      Date: Schema.Attribute.Date;
      EventBody: Schema.Attribute.RichText;
      Events: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
   };
}

declare module '@strapi/strapi' {
   export module Public {
      export interface ComponentSchemas {
         'about.team': AboutTeam;
         'contact.contact': ContactContact;
         'events-detail.media-field': EventsDetailMediaField;
      }
   }
}
