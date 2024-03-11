const logo = $('.logo')
const lang = $('.lang-choice')
const searchModal = $('.search-modal')
const gateBtn = $('.toggle-gate')
const searchBtn = $('.search-btn')
const closeBtn = $('.search-close-btn')
const gnbMenu = $('.gnb-menu-wrap')
const gnbBtn = $('.gnb-menu-btn')
const overlay = $('.overlay')
const gnbCloseBtn = $('.gnb-top-close')

const selectBtn = $('.select-btn')
const selectBox = $('.select-box')
const selectDropdownIcon = $('.select-ico')
const selectList = $('.select-box-item')
const selectTxt = $('.select-txt')

// 현대백화점 / 더현대닷컴 바로가기 토글
gateBtn.on('click', function () {
  $(logo).toggleClass('on')
})

// search 모달창 토글
searchBtn.on('click', function () {
  $(searchModal).toggleClass('on')
})

// search 모달창 닫기
closeBtn.on('click', function () {
  $(searchModal).removeClass('on')
})

// nav 상단 메뉴 마우스 올렸을 때
$('.gnb-list').on('mouseenter', function () {
  let $sub = $(this).find('.sub')
  let headerHeight = 70
  let subOffsetHeight = $sub.outerHeight()
  $('.snb').css('height', `${subOffsetHeight + headerHeight}px`)
  $sub.addClass('on')
  $(this).find('.gnb-list-title').addClass('on')

  $('.sub').on('mouseenter', function () {
    $(this).addClass('on')
    $('.snb').css('height', `${subOffsetHeight + headerHeight}px`)
  })
})

// nav 상단 메뉴 마우스 나갔을 때
$('.gnb-list').on('mouseleave', function () {
  $('.snb').css('height', '70px')
  let $sub = $(this).find('.sub')
  $(this).find('.gnb-list-title').removeClass('on')
  $sub.removeClass('on')

  $('.sub').on('mouseleave', function () {
    $(this).removeClass('on')
    $('.snb').css('height', '70px')
  })
})

// 지점 선택 버튼
selectBtn.on('click', function () {
  $(selectBox).toggleClass('on')
  selectDropdownIcon.toggleClass('on')
})

// 지점 목록 dropdown
selectList.on('click', function () {
  $('.select-box-item').removeClass('on')
  $(this).addClass('on')
  selectBox.removeClass('on')

  let selectedTextValue = $(this).find('a').text()
  selectTxt.text(selectedTextValue)
})

// gnb menu 버튼
gnbBtn.on('click', function () {
  gnbMenu.addClass('on')
  overlay.addClass('on')
})

gnbCloseBtn.on('click', function () {
  gnbMenu.removeClass('on')
  overlay.removeClass('on')
})

// gnb sub menu
$('.gnb-menu-list').on('click', function () {
  const value = $('.gnb-menu-list').hasClass('on')

  if (value) {
    $('.gnb-menu-list').removeClass('on')
    $(this).addClass('on')
  }
})

// gnb family app drawer
$('.gnb-family-head').on('click', function () {
  $('.gnb-family-app').toggleClass('open')
})
