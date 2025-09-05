import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksHero extends Struct.ComponentSchema {
   collectionName: 'components_blocks_heroes';
   info: {
      displayName: 'Hero';
   };
   attributes: {
      heading: Schema.Attribute.String;
      image: Schema.Attribute.Media<'images', true>;
      links: Schema.Attribute.Component<'shared.link', true>;
      text: Schema.Attribute.RichText;
   };
}

export interface LayoutFooter extends Struct.ComponentSchema {
   collectionName: 'components_layout_footers';
   info: {
      displayName: 'Footer';
   };
   attributes: {
      logo: Schema.Attribute.Component<'shared.logo', false>;
      navItems: Schema.Attribute.Component<'shared.link', true>;
      socialLinks: Schema.Attribute.Component<'shared.logo', true>;
      text: Schema.Attribute.Text;
   };
}

export interface LayoutHeader extends Struct.ComponentSchema {
   collectionName: 'components_layout_headers';
   info: {
      displayName: 'Header';
   };
   attributes: {
      cta: Schema.Attribute.Component<'shared.link', false>;
      logo: Schema.Attribute.Component<'shared.logo', false>;
      navItems: Schema.Attribute.Component<'shared.link', true>;
   };
}

export interface SharedLink extends Struct.ComponentSchema {
   collectionName: 'components_shared_links';
   info: {
      displayName: 'Link';
   };
   attributes: {
      href: Schema.Attribute.String;
      isButtonLink: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
      isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
      label: Schema.Attribute.String;
      type: Schema.Attribute.Enumeration<['PRIMARY', 'SECONDARY']>;
   };
}

export interface SharedLogo extends Struct.ComponentSchema {
   collectionName: 'components_shared_logos';
   info: {
      displayName: 'Logo';
   };
   attributes: {
      href: Schema.Attribute.String;
      image: Schema.Attribute.Media<'images'>;
      isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
      label: Schema.Attribute.String;
   };
}

declare module '@strapi/strapi' {
   export module Public {
      export interface ComponentSchemas {
         'blocks.hero': BlocksHero;
         'layout.footer': LayoutFooter;
         'layout.header': LayoutHeader;
         'shared.link': SharedLink;
         'shared.logo': SharedLogo;
      }
   }
}
