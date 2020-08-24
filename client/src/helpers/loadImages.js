function build(data, limit, prop = "image") {
  return data
    .map((item, index) => (index < limit ? item[prop] : null))
    .filter((item) => item);
}

function loadImage(imageFile) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = imageFile;
  });
}

function loadImages(images) {
  return images.map((imageFile) => loadImage(imageFile));
}

async function loadAssets(assets) {
  return Promise.all(loadImages(assets));
}

export { loadAssets, loadImage, build };
