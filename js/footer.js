const familySite = $('.family-site')
const familySiteList = $('.family-site-content')
const siteBtn = $('.family-site-btn')

siteBtn.on('click', function () {
  familySite.toggleClass('on')
})
