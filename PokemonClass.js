class PokemonClass {
  #name;
  #image;
  #type;
  #weight;
  #height;

  constructor(name, image, type, weight, height) {
    this.#name = name;
    this.#image = image;
    this.#type = type;
    this.#weight = weight;
    this.#height = height;
  }

  get name() {
    return this.#name;
  }

  get image() {
    return this.#image;
  }

  get type() {
    return this.#type;
  }

  get weight() {
    return this.#weight;
  }

  get height() {
    return this.#height;
  }
}
