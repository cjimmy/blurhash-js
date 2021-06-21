import { encode, getDataUrlFromBlurhash } from '../dist/index'

// grab the handles for all the relevant elements
const blurhashElement = document.getElementById('blurhash') as HTMLDivElement
const dataUriElement = document.getElementById('datauri') as HTMLDivElement
const outputImg = document.getElementById('output') as HTMLImageElement
const originalImg = document.getElementById('original') as HTMLImageElement
const fileInput = document.getElementById('fileinput') as HTMLInputElement
const componentXElement = document.getElementById('x') as HTMLInputElement
const componentYElement = document.getElementById('y') as HTMLInputElement

// allow 1-9
function clamp(n: number) {
  return isNaN(n) ? 1 : Math.min(9, Math.max(1, n))
}

function renderSelectedFile() {
  const file = fileInput.files[0]
  if (file) {
    originalImg.onload = function () {
      // revoke pointer to blob
      URL.revokeObjectURL(originalImg.src)
      // process the image to gen blurhash
      setTimeout(generateBlurhash, 0)
    }
    // create pointer to blob and set it as src
    originalImg.src = URL.createObjectURL(fileInput.files[0])
  }
}

function generateBlurhash() {
  // draw the original image onto a canvas
  const { width, height } = originalImg
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const reduceFactor = getReductionFactor(width, height, 160)
  ctx.drawImage(originalImg, 0, 0, width / reduceFactor, height / reduceFactor)
  const componentX = clamp(+componentXElement.value)
  const componentY = clamp(+componentYElement.value)
  const imageData = ctx.getImageData(
    0,
    0,
    width / reduceFactor,
    height / reduceFactor
  )

  // generate the blurhash for that canvas
  const blurhash = encode(
    imageData.data,
    imageData.width,
    imageData.height,
    componentX,
    componentY
  )

  // display the blurhash string
  blurhashElement.textContent = blurhash

  // get data URL from blurhash
  // because the function is more useful than getting a local blob pointer
  // note, only Chrome can create Webp images with the implementation used
  const dataUrl = getDataUrlFromBlurhash(blurhash, width, height, {
    outputType: 'webp',
    quality: 0.3,
  })

  // display the data URL string
  dataUriElement.textContent = dataUrl

  // render it to the <img>
  outputImg.src = dataUrl
}

/**
 * returns the smallest common factor between width and height, n,
 * such that either width/n or height/n is less than or equal
 * to the target threshold.
 *
 * i.e. finds a way to divide numbers by an integer to reduce both
 * proportionally until one is under a threshold. If not possible, returns 1.
 * */
const getReductionFactor = (
  width: number,
  height: number,
  targetThreshold: number
) => {
  let factor = 1
  while (factor < width && factor < height) {
    if (
      width % factor === 0 &&
      height % factor === 0 &&
      (width / factor <= targetThreshold || height / factor <= targetThreshold)
    ) {
      return factor
    }
    factor += 1
  }
  return 1
}

fileInput.addEventListener('change', renderSelectedFile)
componentXElement.addEventListener('change', generateBlurhash)
componentYElement.addEventListener('change', generateBlurhash)
