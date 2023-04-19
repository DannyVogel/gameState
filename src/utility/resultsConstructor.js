class Result {
  constructor(result) {
    this.slug = result.slug ? result.slug : ""
    this.name = result.name ? result.name : ""
    this.id = result.id ? result.id : ""
    this.genres = result.genres ? result.genres : []
    this.released = result.released ? result.released : ""
    this.image = result.background_image ? result.background_image : ""
    this.screenshots = result.short_screenshots ? result.short_screenshots.map((screenshot) => screenshot.image) : []
    this.stores = result.stores ? result.stores : []
    this.platforms = result.parent_platforms ? result.parent_platforms.map((platform) => platform.platform.name) : []
  }
}


export default Result