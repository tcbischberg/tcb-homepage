# Astro + Tina + Contextual Editing

```
npm run dev
```

To see the Tina preview, visit 
[http://localhost:3000/admin/index.html#/~](http://localhost:3000/admin/index.html#/~).

## How?

Astro v2.6 introduced [custom client 
directives](https://docs.astro.build/en/reference/directives-reference/#custom-client-directives), 
which makes it possible to have components that only hydrate in Tina's visual 
editor.

This demo uses the following directive:

```mjs
/**
 * client-directives/tina.mjs
 * @type {import('astro').ClientDirective}
 */
export default (load, opts, el) => {
  try {
    const isEditor =
      window.frameElement && window.frameElement.id === 'tina-iframe'
    if (isEditor) {
      load().then((hydrate) => hydrate())
    }
  } catch (e) {
    console.error(e)
  }
}
```

This gets added to the astro config via a custom integration. Then it's 
possible to write Tina-friendly React components like this:

```astro
<MyComponent client:tina {...props} />
```

This is not _exactly_ zero-js, because each page needs to check whether to 
hydrate these components. But it results in <1KB of js total getting sent to 
the client (if I understand Astro's hydration strategy correctly).
