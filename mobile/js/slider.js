const slideBanner = document.querySelector('.slide-banner')
const slider = document.querySelector('.add-banner-content')
const slideItem = document.querySelectorAll('.add-banner-list')
const sliderImg = document.querySelectorAll('.add-banner-img')
const firstSliderImg = document.querySelectorAll('.add-banner-img')[0]
const pager = document.querySelectorAll('.indi-dot-btn')
const slideLen = slideItem.length

let isDragStart = false,
  isDragging = false,
  prePageX,
  prevScrollLeft,
  positionDiff,
  currSlide = 0,
  bannerWidth,
  sliderWrapWidth

function getResizeSlideWidth() {
  slider.style.width = sliderWrapWidth + 'px'
  sliderImg.forEach((slide) => {
    slide.style.width = document.body.clientWidth + 'px'
  })
}

function autoDragSlide() {
  if (slideBanner.scrollLeft == slideBanner.scrollWidth - slider.clientWidth)
    return

  positionDiff = Math.abs(positionDiff)
  const imageWidth = firstSliderImg.clientWidth
  let dragInterval = imageWidth - positionDiff
  if (slideBanner.scrollLeft > prevScrollLeft && currSlide < slideLen - 1) {
    currSlide++
    return (slideBanner.scrollLeft +=
      positionDiff > imageWidth / 3 ? dragInterval : -imageWidth)
  }

  if (currSlide != 0) {
    currSlide--
  }
  slideBanner.scrollLeft -=
    positionDiff > imageWidth / 3 ? dragInterval : -imageWidth
}

function dragStart(e) {
  getResizeSlideWidth()
  isDragStart = true
  prePageX = e.pageX || e.touches[0].pageX
  prevScrollLeft = slideBanner.scrollLeft
}

function dragging(e) {
  if (!isDragStart) return
  e.preventDefault()
  isDragging = true
  slider.classList.add('dragging')
  positionDiff = (e.pageX || e.touches[0].pageX) - prePageX
  slideBanner.scrollLeft = prevScrollLeft - positionDiff
}

function dragStop() {
  isDragStart = false
  slider.classList.remove('dragging')

  if (!isDragging) return
  isDragging = false
  autoDragSlide()
  pagination(currSlide)
}

for (let i = 0; i < pager.length; i++) {
  pager[i].addEventListener('click', () => {
    pager.forEach((dot) => {
      dot.classList.remove('active')
    })
    pager[i].classList.add('active')
    currSlide = i
    pagination(currSlide)
  })
}

function pagination(currSlide) {
  const imageWidth = firstSliderImg.clientWidth
  slideBanner.scrollLeft = imageWidth * currSlide
  pager.forEach((dot) => {
    dot.classList.remove('active')
  })
  pager[currSlide].classList.add('active')
}

// mouse event
slideBanner.addEventListener('mousemove', dragging)
slideBanner.addEventListener('mousedown', dragStart)
slideBanner.addEventListener('mouseup', dragStop)
slideBanner.addEventListener('mouseleave', dragStop)

// touch event
slideBanner.addEventListener('touchmove', dragging)
slideBanner.addEventListener('touchstart', dragStart)
slideBanner.addEventListener('touchend', dragStop)

window.addEventListener('resize', function () {
  bannerWidth = document.body.clientWidth
  sliderWrapWidth = bannerWidth * 4
})

window.addEventListener('DOMContentLoaded', function () {
  slider.style.width = document.body.clientWidth * 4 + 'px'
})

getResizeSlideWidth()
