const viewMoreFrame = document.getElementById('view-more-frame')
viewMoreFrame.insertAdjacentHTML('beforeend', '<div id="curtains-word" class="curtains-word">view more</div>')
const curtainsWord = document.getElementById('curtains-word')

viewMoreFrame.addEventListener('mouseenter', function () {
  gsap.set(curtainsWord, {
    // 緑の文字 左 → 右用
    // width: 0
    
    // 緑の文字 右 → 左用
    width: 'auto'
  })
  gsap.to(curtainsWord, .3, {
    // 緑の文字 左 → 右用
    // width: 'auto'

    // 緑の文字 右 → 左用
    width: 0
  })
})
viewMoreFrame.addEventListener('mouseleave', function () {
  gsap.to(curtainsWord, .3, {
    
    // 緑の文字 左 → 右用
    // width: 0

    // 緑の文字 右 → 左用
    width: 'auto'
  })
})