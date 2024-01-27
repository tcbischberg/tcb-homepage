// .tina/config.ts
import { defineStaticConfig } from "tinacms";
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineStaticConfig({
  branch,
  clientId: null,
  // Get this from tina.io
  token: null,
  // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "article",
        label: "Artikel",
        path: "content/articles",
        ui: {
          filename: {
            readonly: true,
            slugify: ({ slug }) => slug
          },
          router: ({ document }) => "/blog/" + document._sys.filename,
          beforeSubmit: async ({ values }) => {
            return {
              ...values,
              slug: values.slug || values.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
            };
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
            isTitle: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            required: false,
            description: "Wird automatisch generiert"
          }
        ]
      },
      {
        name: "review",
        label: "R\xFCckblicke",
        path: "content/reviews",
        defaultItem: () => ({
          year: (/* @__PURE__ */ new Date()).getFullYear()
        }),
        ui: {
          router: ({ document }) => "/archiv/rueckblicke/" + document._sys.filename
        },
        fields: [
          {
            type: "number",
            name: "year",
            label: "Jahr",
            required: true,
            ui: {
              validate: (value) => {
                if (value < 2e3) {
                  return "Jahr muss vierstellig sein (z.B. 2024)";
                }
              }
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      {
        name: "static",
        label: "Statische Seiten",
        path: "content/static",
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
