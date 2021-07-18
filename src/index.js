import galleryItems from "./app.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  modalImg: document.querySelector(".lightbox__image"),
};

let activeIndex = 0;

const gallery = galleryItems.map((img) => {
  return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${img.original}"
  >
    <img
      class="gallery__image"
      src="${img.preview}"
      data-source="${img.original}"
      alt="${img.description}"
    />
  </a>
</li>
    `;
});

const modalOpen = (evn) => {
  evn.preventDefault();

  if (evn.target.nodeName !== "IMG") {
    return;
  }

  gallery.forEach((el, index) => {
    if (el.includes(evn.target.src)) {
      activeIndex = index;
    }
  });

  refs.modal.classList.add("is-open");

  refs.modalImg.src = evn.target.dataset.source;
  refs.modalImg.alt = evn.target.alt;
  window.addEventListener("keydown", keyboardManipulation);
};

const keyboardManipulation = (evn) => {
  if (evn.key === "Escape") {
    modalClose(evn);
  }

  if (evn.key === "ArrowRight" && galleryItems.length - 1 > activeIndex) {
    activeIndex += 1;
    refs.modalImg.src = galleryItems[activeIndex].original;
  }

  if (evn.key === "ArrowLeft" && activeIndex > 0) {
    activeIndex -= 1;
    refs.modalImg.src = galleryItems[activeIndex].original;
  }
};

const modalClose = (evn) => {
  if (evn.target.nodeName === "IMG") {
    return;
  }
  refs.modal.classList.remove("is-open");
  window.removeEventListener("keydown", keyboardManipulation);
};

refs.gallery.insertAdjacentHTML("beforeend", gallery.join(""));
refs.gallery.addEventListener("click", modalOpen);
refs.modal.addEventListener("click", modalClose);
