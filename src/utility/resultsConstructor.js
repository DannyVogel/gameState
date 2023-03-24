class Result {
  constructor(result) {
    this.slug = result.slug
    this.name = result.name
    this.id = result.id
    this.genres = result.genres
    this.released = result.released
    this.image = result.background_image
    this.stores = result.stores
  }
}

export default Result