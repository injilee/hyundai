const slider = document.querySelector('.add-banner-content')
const slideItem = document.querySelectorAll('.add-banner-list')
const sliderImg = document.querySelectorAll('.add-banner-img')[0]
const pager = document.querySelectorAll('.indi-dot-btn')
const slideLen = slideItem.length

let isDragStart = false,
  isDragging = false,
  prePageX,
  prevScrollLeft,
  positionDiff,
  currSlide = 0

function autoDragSlide() {
  if (slider.scrollLeft == slider.scrollWidth - slider.clientWidth) return

  positionDiff = Math.abs(positionDiff)
  const imageWidth = sliderImg.clientWidth
  let dragInterval = imageWidth - positionDiff
  if (slider.scrollLeft > prevScrollLeft && currSlide < slideLen - 1) {
    currSlide++
    return (slider.scrollLeft +=
      positionDiff > imageWidth / 3 ? dragInterval : -imageWidth)
  }

  if (currSlide != 0) {
    currSlide--
  }
  slider.scrollLeft -=
    positionDiff > imageWidth / 3 ? dragInterval : -imageWidth
}

function dragStart(e) {
  isDragStart = true
  prePageX = e.pageX || e.touches[0].pageX
  prevScrollLeft = slider.scrollLeft
}

function dragging(e) {
  if (!isDragStart) return
  e.preventDefault()
  isDragging = true
  slider.classList.add('dragging')
  positionDiff = (e.pageX || e.touches[0].pageX) - prePageX
  slider.scrollLeft = prevScrollLeft - positionDiff
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
  const imageWidth = sliderImg.clientWidth
  slider.scrollLeft = imageWidth * currSlide
  pager.forEach((dot) => {
    dot.classList.remove('active')
  })
  pager[currSlide].classList.add('active')
}

// mouse event
slider.addEventListener('mousemove', dragging)
slider.addEventListener('mousedown', dragStart)
slider.addEventListener('mouseup', dragStop)
slider.addEventListener('mouseleave', dragStop)

// touch event
slider.addEventListener('touchmove', dragging)
slider.addEventListener('touchstart', dragStart)
slider.addEventListener('touchend', dragStop)
