AFRAME.registerComponent("store", {
  schema: {
    state: { type: "string", default: "comics-list" },
    selectedCard: { type: "string", default: "#card1" },
  },
  init: function () {
    this.comicsContainer = this.el;
    this.createCards();
  },

  tick: function () {
    const { state } = this.el.getAttribute("store");

    if (state === "view") {
      this.hideEl([this.comicsContainer]);
      this.showView();
    }
  },
  hideEl: function (elList) {
    elList.map((el) => {
      el.setAttribute("visible", false);
    });
  },

  showView: function () {
    const { selectedCard } = this.data;

    const skyEl = document.querySelector("#main-container");

    skyEl.setAttribute("material", {
      src: `./assets/360_images/${selectedCard}/place-0.jpg`,
      color: "white",
    });
  },

  createCards: function () {
    const thumbNailsRef = [
      {
        id: "Spiderman",
        title: "Spider Man",
        url: "./assets/spiderman.jpg",
      },
      {
        id: "Batman",
        title: "Batman",
        url: "./assets/batman.jpg",
      },

      {
        id: "Hulk",
        title: "Hulk",
        url: "./assets/hulk.jpg",
      },
      {
        id: "Iron Man",
        title: "Iron Man",
        url: "./assets/ironman.jpg",
      },
    ];
    let prevoiusXPosition = -60;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      const borderEl = this.createBorder(position, item.id);

      const thumbNail = this.createThumbNail(item);
      borderEl.appendChild(thumbNail);

      const titleEl = this.createTitleEl(position, item);
      borderEl.appendChild(titleEl);

      this.comicsContainer.appendChild(borderEl);
    }
  },
  createBorder: function (position, id) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "ring",
      radiusInner: 9,
      radiusOuter: 10,
    });
    entityEl.setAttribute("position", position);
    entityEl.setAttribute("material", {
      color: "#0077CC",
      opacity: 1,
    });

    entityEl.setAttribute("cursor-listener", {});
    return entityEl;
  },
  createThumbNail: function (item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "circle",
      radius: 9,
    });
    entityEl.setAttribute("material", { src: item.url });
    return entityEl;
  },
  createTitleEl: function (position, item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("text", {
      font: "exo2bold",
      align: "center",
      width: 70,
      color: "#e65100",
      value: item.title,
    });
    const elPosition = position;
    elPosition.y = -20;
    entityEl.setAttribute("position", elPosition);
    entityEl.setAttribute("visible", true);
    return entityEl;
  },
});
