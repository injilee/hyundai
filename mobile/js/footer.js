const familySite = $('.family-site')
const familySiteList = $('.family-site-content')
const siteBtn = $('.family-site-btn')
const topBtn = $('.aside-top-btn')
const langBtn = $('.lang-dropdown-btn')

// family site dropdown 버튼
siteBtn.on('click', function () {
  familySite.toggleClass('on')
})

// 스크롤 최상단 이동 top 버튼
topBtn.on('click', function (e) {
  e.preventDefault()
  $('html, body').animate({
    scrollTop: '0',
  })
})

// footer 언어선택 토글
langBtn.on('click', function () {
  $('.lang-dropdown').toggleClass('on')
})
