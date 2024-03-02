const slider = $('.slide-items')
const slideItem = $('.slide-item')
const slidePrevBtn = $('.slide-btn-prev')
const slideNextBtn = $('.slide-btn-next')
const progressBar = $('.carousel-progress')
const slideLen = slideItem.length
const slideWidth = 1110
const slideSpeed = 300

let curIndex = 0
let startNum = 0
let progress = 100
let startPoint
let endPoint
let movePoint
let locateNum
let isMouseDown = false

function nextMove() {
  if (curIndex <= slideLen - 3) {
    slider.css('transition', slideSpeed + 'ms')
    slider.css(
      'transform',
      `translate3d(-${slideWidth * (curIndex + 2)}px, 0, 0)`
    )
  }
  if (curIndex === slideLen - 3) {
    setTimeout(function () {
      slider.css('transition', '0ms')
      slider.css('transform', `translate3d(-${slideWidth}px, 0, 0)`)
    }, slideSpeed)
    curIndex = -1
  }
  ++curIndex
  setIndigate()
}

function prevMove() {
  if (curIndex >= 0) {
    slider.css('transition', slideSpeed + 'ms')
    slider.css('transform', `translate3d(-${slideWidth * curIndex}px, 0, 0)`)
  }
  if (curIndex === 0) {
    setTimeout(function () {
      slider.css('transition', '0ms')
      slider.css(
        'transform',
        `translate3d(-${slideWidth * (slideLen - 2)}px, 0, 0)`
      )
    }, slideSpeed)
    curIndex = slideLen - 2
  }
  --curIndex
  setIndigate()
}

function setIndigate() {
  let totalWidth = progress / (slideLen - 2)
  let itemWidth = totalWidth * (curIndex + 1)
  progressBar.css('width', `${itemWidth}%`)
}

slider.on('mousedown ', (e) => {
  startPoint = e.pageX
  isMouseDown = true
})

slider.on('mousemove', function (e) {
  if (isMouseDown) {
    movePoint = e.pageX
  }
})

slider.on('mouseup ', (e) => {
  if (isMouseDown) {
    endPoint = e.pageX
    let resultPoint = endPoint - startPoint
    if (Math.abs(resultPoint) >= 200) {
      if (resultPoint >= 0) {
        prevMove()
      } else {
        nextMove()
      }
    }
    startPoint = 0
    isMouseDown = false
  }
})

slideNextBtn.on('click', nextMove)
slidePrevBtn.on('click', prevMove)
