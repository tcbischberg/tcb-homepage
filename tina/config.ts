import { Form, TinaCMS, defineStaticConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineStaticConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'article',
        label: 'Artikel',
        path: 'content/articles',
        ui: {
          router: ({ document }) => '/blog/' + document._sys.filename,
          beforeSubmit: async ({ values }: { form: Form; cms: TinaCMS; values: Record<string, any> }) => {
            return {
              ...values,
              slug:
                values.slug ||
                values.title
                  .toLowerCase()
                  .replace(/ /g, '-')
                  .replace(/[^\w-]+/g, ''),
            };
          },
        },
        fields: [
          {
            type: 'datetime',
            name: 'createdAt',
            label: 'Erstellt am',
            ui: {
              dateFormat: 'DD.MM.yyyy',
            },
            required: true,
          },
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            required: true,
            isTitle: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
          {
            type: 'string',
            name: 'slug',
            label: 'Slug',
            required: false,
            description: 'Wird automatisch generiert',
          },
        ],
      },
      {
        name: 'board',
        label: 'Vorstand',
        path: 'content/board',
        fields: [
          {
            type: 'string',
            name: 'name',
            label: 'Name',
            required: true,
          },
          {
            type: 'string',
            name: 'position',
            label: 'Position',
            required: true,
          },
          {
            type: 'string',
            name: 'email',
            label: 'E-Mail',
          },
          {
            type: 'string',
            name: 'phone',
            label: 'Telefon',
          },
          {
            type: 'object',
            name: 'address',
            label: 'Adresse',
            fields: [
              {
                type: 'string',
                name: 'street',
                label: 'Straße und Hausnummer',
                required: true,
              },
              {
                type: 'string',
                name: 'zip',
                label: 'PLZ',
                required: true,
              },
              {
                type: 'string',
                name: 'city',
                label: 'Stadt',
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: 'static',
        label: 'Statische Seiten',
        path: 'content/static',
        fields: [
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
      {
        name: 'sponsor',
        label: 'Sponsoren',
        path: 'content/sponsors',
        fields: [
          {
            type: 'string',
            name: 'name',
            label: 'Name',
          },
          {
            type: 'string',
            name: 'link',
            label: 'Link',
          },
          {
            type: 'image',
            name: 'logo',
            label: 'Logo',
          },
        ],
      },
      {
        name: 'navigation',
        label: 'Navigation',
        path: 'content/navigation',
        fields: [
          {
            type: 'string',
            name: 'label',
            label: 'Name',
            required: true,
          },
          {
            type: 'string',
            name: 'link',
            label: 'Link',
            required: true,
          },
          {
            type: 'number',
            name: 'order',
            label: 'Reihenfolge',
          },
          {
            type: 'object',
            name: 'subpages',
            label: 'Unterseiten',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item.label }),
            },
            fields: [
              {
                type: 'string',
                name: 'label',
                label: 'Name',
                required: true,
              },
              {
                type: 'string',
                name: 'link',
                label: 'Link',
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
});
