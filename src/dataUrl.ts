import { decode } from './'

export type GetDataUrlFromBlurhashType = (
  blurhash: string,
  width: number,
  height: number,
  options?: {
    outputType: 'png' | 'jpeg' | 'webp'
    quality: number
  }
) => string

/*
 * Returns a data URL from an encoded Blurhash string
 * @param blurhash - the blurhash string
 * @param width - width of the canvas to draw the blurred img on (should be fraction of original width)
 * @param height - height of the canvas to draw the blurred img on.
 * @param options {
 *   @param outputType: data URL type, 'webp' only works when user agent is webkit
 *   @param quality: 0 to 1, quality for lossy image types (jpg and webp)
 * }
 * @returns a dara URL
 * */
export const getDataUrlFromBlurhash: GetDataUrlFromBlurhashType = (
  blurhash,
  width,
  height,
  options = { outputType: 'jpeg', quality: 0.7 }
) => {
  if (blurhash) {
    const pixels = decode(blurhash, width, height)
    // defaults
    const { outputType, quality } = options
    if (pixels) {
      // draw the blurhash'd pixels onto a canvas
      const canvas = document.createElement('canvas')
      canvas.setAttribute('width', `${width}px`)
      canvas.setAttribute('height', `${height}px`)
      const ctx = canvas.getContext('2d')
      const imageData = new ImageData(pixels, width, height)
      ctx.putImageData(imageData, 0, 0)

      // get the data URL from the canvas
      // generating a 'image/webp' works in chrome only.
      const dataUri = canvas.toDataURL(`image/${outputType}`, quality)
      return dataUri
    }
  }
  return ''
}
