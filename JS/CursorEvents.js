AFRAME.registerComponent("cursor-listener", {
  schema: {
    selectedItemId: { default: "", type: "string" },
  },
  init: function () {
    this.handleClickEvents();
    this.handleMouseEnterEvents();
    this.handleMouseLeaveEvents();
  },
  handleClickEvents: function () {
    this.el.addEventListener("click", (evt) => {
      const comicsContainer = document.querySelector("#comics-container");
      const { state } = comicsContainer.getAttribute("tour");

      if (state === "comics-list") {
        const id = this.el.getAttribute("id");
        const comicsId = ["Spiderman", "Batman", "Iron Man", "Hulk"];
        if (comicsId.includes(id)) {
          comicsContainer.setAttribute("store", {
            state: "view",
            selectedCard: id,
          });
        }
      }
    });
  },
  handleComicsListState: function () {
    const id = this.el.getAttribute("id");
    const comicsId = ["Spiderman", "Batman", "Iron Man", "Hulk"];
    if (comicsId.includes(id)) {
      const placeContainer = document.querySelector("#comics-container");
      comicsContainer.setAttribute("cursor-listener", {
        selectedItemId: id,
      });
      this.el.setAttribute("material", {
        color: "#D76B30",
        opacity: 1,
      });
    }
  },
  handleMouseEnterEvents: function () {
    this.el.addEventListener("mouseenter", () => {
      this.handleComicsListState();
    });
  },
  handleMouseLeaveEvents: function () {
    this.el.addEventListener("mouseleave", () => {
      const { selectedItemId } = this.data;
      if (selectedItemId) {
        const el = document.querySelector(`#${selectedItemId}`);
        const id = el.getAttribute("id");
        if (id == selectedItemId) {
          el.setAttribute("material", {
            color: "#0077CC",
            opacity: 1,
          });
        }
      }
    });
  },
});
