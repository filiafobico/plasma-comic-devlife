function init() {
  comic.comicAuthor = "Andre Noel"
  comic.websiteUrl = "https://developerslife.tech/pt/"

  if (comic.identifier) {
    comic.requestPage(comic.websiteUrl + comic.identifier, comic.Page)
  } else {
    comic.requestPage(comic.websiteUrl + "tag-tirinha.html", comic.User)
  }
}

function pageRetrieved(id, html) {
  if (id == comic.User) {
    comic.lastIdentifier = findLastComicIdentifier(html)
    comic.requestPage(comic.websiteUrl + comic.lastIdentifier, comic.Page)
  }

  if (id == comic.Page) {
    getAndSetComicInfo(html)
  }
}

function findLastComicIdentifier(html) {
  var regexOfAllLinkTitles = /https:\/\/developerslife\.tech\/pt\/(\d{4}\/\d{2}\/\d{2}\/[\w-]+)/
  var match = html.match(regexOfAllLinkTitles)

  if (match && match.length > 0) {
    return match[1]
  }
}

function getAndSetComicInfo(html) {
  var shopUrl = findComicImage(html)
  if (!shopUrl) return false

  comic.shopUrl = shopUrl
  comic.requestPage(comic.shopUrl, comic.Image)

  comic.title = comic.identifier.replace(/[^\w\d]/g, ' ').replace(/\b(\w)/g, (letter) => letter.toUpperCase())
}

function findComicImage(html) {
  var regexOfComicImage =
    /https:\/\/developerslife\.tech\/pt\/uploads\/(\d{4}\/\d{2}\/[\w\d-]+\.png)/
  var match = regexOfComicImage.exec(html)

  if (match && match.length) {
    return match[0]
  }
}
