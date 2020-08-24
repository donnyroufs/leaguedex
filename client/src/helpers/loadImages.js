function build(data, limit, prop = "image") {
  return data
    .map((item, index) => (index < limit ? item[prop] : null))
    .filter((item) => item);
}

function loadImage(image) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = image;
  });
}

function loadImages(images) {
  return images.map((imageFile) => loadImage);
}

async function loadAssets(assets) {
  return Promise.all(loadImages(assets));
}

export { loadAssets, loadImage, build };
