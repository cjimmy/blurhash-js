# blurhash ts (refactored)

> Refactored Typescript encoder and decoder for the [@woltapp/blurhash](https://github.com/woltapp/blurhash) algorithm to output data URIs instead of simply drawing to a canvas.

Currently used to power [blurred.dev](https://blurred.dev), a free tool to convert images to blurhashes to data URLs and to play around with the parameters.

## Motivation

* The original repo no longer appears to be actively maintained.
* It had many places to be improved, from security to speed, and looking at other PRs, contibuting seemed fruitless.
* The original repo was written to output to `canvas` elements. With Next.js 11's Image component supporting data URLs, I wanted to extend it to generate a data URL instead of having to embed a `<canvas>` underneath the image.
* [react-blurhash](https://github.com/woltapp/react-blurhash) exists but I wanted to have something that worked well with Next.js' `<Image>`. Again, I didn't want to overlap two image components.


## New additions

In addition to the original API provided by @woltapp/blurhash, there are two notable changes (and lots of code cleanup)

### `<img>` instead of `<canvas>`
The [demo](demo/index.html) uses <img> elements to display the images at their intended proportions instead of forcing it into certain dimensions on `<canvas>` elements.

### `getDataUrlFromBlurhash(blurhash: string, width: number, height: number, options?: { outputType: 'png' | 'jpeg' | 'webp', quality: number }) => string`

From a blurhash (e.g. `LJONIK5I0V4_9+pfIxE7N3$wIAxA`), this method writes it to a `canvas`, and then uses the `toDataURL()` ([MDN reference]()) to get a data URL that can be used as the `src` for an `<img>` or the `blurDataURL` prop for `next/image`.


## Caveats

### uses `document`

`getDataUrlFromBlurhash()` uses `document.createElement` which means it must be used on the clientside. If using Next, this can be done by putting it inside a `useEffect`

### incredibly slow

`getDataUrlFromBlurhash()` is slow, sometimes more than a full second. I would not recommend using it to dynamically generate the data URL from the blurhash (which is much smaller to store!). It's how I was hoping to use it, but it's not fast enough.

For these two reasons above, this repo is not published as a package. I am putting it up on Github as others may be able to build upon it.
