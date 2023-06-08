////////////
// ローディング・アニメーション

function loaded() {
  const loading = document.getElementById('loading')
  loading.classList.remove('keep')
}
// ウィンドウを読み込んで2秒後には次に遷移する。
window.addEventListener('load', () => {
    setTimeout(loaded, 1500)
  })
    
    
////////////
// ハンバーガー・メニュー
const toSectionLinkBtn = document.getElementById('to-section-link-btn')
const contentsLinks = document.getElementById('contents-links')
const linksLi = document.getElementById('contents-links').children

// メニューの切り替え
toSectionLinkBtn.addEventListener('click', function () {
  this.classList.toggle('active')
  this.nextElementSibling.classList.toggle('appear')
})

// リンクをクリックでページ内スクロールの際にメニューを閉じる。
Array.from(linksLi).forEach(el => {
  el.addEventListener('click', () => {
    toSectionLinkBtn.classList.remove('active')
    contentsLinks.classList.remove('appear')
  })
})


////////////
// one-after-another　次々に出現　横バージョン

// end, scrub, onceについて
      // start: 'top 80%',
      // end: '50% 50%',
      // scrub: .5,　これを設定する意図は、
// endとscrubはセットで設定する。スクロールの『動き』に合わせたアニメーションを作りたいとき。
// なのでこのコード以降全て削除している。
// なお、一度アニメーションしたら終わりもセットと考える。
// デフォルトでアニメーションされたら終わるから。
      // once: true


// staggerについて
// 要素の子要素にアニメーションを『次々』につけたい場合、
// forEachで回して、ついてくるindex番号に延滞させる秒数を掛ける作戦はいいのだけれど、
// staggerで省略できる。
// items.forEach(elems => {
//   Array.from(elems.children).forEach((elem, idx) => {
//     gsap.from(elem, .7,{
//       opacity: ...,
//       delay: idx * 0.25,  // <= ここがかっこいいポイントだったけど。。。
//       ease: '...',
//       scrollTrigger: {
//         trigger: elem,
//         start: '...',
//       },
//     })
//   })
// })

const oneAfterAnotherRow = document.querySelectorAll('#one-after-another-row')
oneAfterAnotherRow.forEach(elem => {
  // 要素の子要素へアクセスはこれだけ。超絶賢い。
  gsap.from(elem.children, .7, {
    opacity: 0,
    ease: 'power3.easeOut',
    // ↓ 0.25秒ずつ延滞させて処理する。これだけ。
    stagger: .25,
    scrollTrigger: {
      trigger: elem,
      start: 'top 80%',
      // markers: true,
    },
  })
})


////////////
// one-after-another　次々に出現
const oneAfterAnother = document.querySelectorAll('#one-after-another')
oneAfterAnother.forEach(elem => {
  gsap.from(elem.children, 1, {
    y: 100,
    opacity: 0,
    stagger: .25,
    scrollTrigger: {
      trigger: elem,
      start: 'top 80%',
      // markers: true,
    },
  })
});


////////////
// カーテン効果

// // 文章構造の中に視覚効果のカーテンをレイアウトするのは避ける。
// // JSで補助する。そこで『insertAdjacentHTML』を使う。

// // insertAdjacentHTML
// // 第二引数で指定するテキストを HTML または XML としてパースし、
// // その結果であるノードを DOM ツリー内の指定された位置（第一引数で指定）に挿入する。
// // これは挿入先の要素を再度パースするものではないため、既存の要素や要素内部の破壊を伴わない。
// // 余分なシリアル化のステップを回避できる分、innerHTMLへの代入による直接的な操作よりも
// // はるかに『高速な動作』となる。

// // 引数の意味
// //    'beforebegin'  要素の直前に追加
// //    'afterbegin'   要素の最初の子要素として追加
// //    'beforeend'    要素の最後の子要素として追加
// //    'afterend'     要素の直後に追加

// // 最初の子要素では単純にできる。では、最後の子要素ではどうするか。

// var parentElement = document.getElementById('parent'); // 親要素の取得
// var lastChildElement = parentElement.lastElementChild; // 最後の子要素の取得

// // 最後の子要素の後ろに新たな要素を追加する
// lastChildElement.insertAdjacentHTML('afterend', '<div>新たな要素</div>');

// // 最後の子要素の前に新たな要素を追加する
// lastChildElement.insertAdjacentHTML('beforebegin', '<div>新たな要素</div>');

// // lastElementChildで取り込んでから処理するだけ。簡単な話。関数覚えようね。

// insertAdjacentHTMLを使っているところ。カーテン効果のための下準備としてHTML構造に新たに要素を加える。
// 動画にカーテンを敷設する。
document.querySelectorAll('.media-wrapper').forEach(elem => {
  elem.insertAdjacentHTML('afterbegin', '<div class="curtains"></div>')
})

// view moreにカーテンと文字のカーテンをつける
const viewMoreFrame = document.querySelectorAll('.view-more-anchor')
viewMoreFrame.forEach(elem => {
  // カーテンを敷設
  elem.insertAdjacentHTML('afterbegin', '<div class="curtains-view-more">view more</div>')
  // 文字のカーテンを敷設
  elem.insertAdjacentHTML('beforeend', '<div class="curtains-word">view more</div>')
})
const curtainsWord = document.querySelectorAll('.curtains-word')

////////////
// .curtains　動画のカーテン効果
const curtains = Array.from(document.querySelectorAll('.curtains'))
const curtainsViewMore = Array.from(document.querySelectorAll('.curtains-view-more'))
const curtainsAll = curtains.concat(curtainsViewMore)

curtainsAll.forEach(elem => {
  gsap.to(elem, 1, {
    // 要素をスクリーン外に隠したい場合に使う『left or right: 100％;』は『''』で囲む。
    // これでそれぞれの幅に対して『duration: 1;』で適宜効果がついていく。
    // 色々な幅が混在するこんなところに『-2000』とかはない。動きが不自然だったのはそのせい。
    x: '-100%',
    transformOrigin: 'left top',
    ease: 'power1.easeOut',
    scrollTrigger: {
      trigger: elem,
      start: 'top 80%',
      // markers: true,
    }
  })
})

////////////
// view more の文字のカーテン効果
viewMoreFrame.forEach(elem => {
  elem.addEventListener('mouseenter', function () {
    // curtainsWordは配列のはずなのに処理を通すのが凄いのかなんなのか。
    gsap.set(curtainsWord, {
      visibility: 'visible',
      // 緑の文字 左 → 右用
      width: 0
  
      // // 緑の文字 右 → 左用
      // width: 'auto'
    })
    gsap.to(curtainsWord, .3, {
      // 緑の文字 左 → 右用
      width: 'auto'
  
      // // 緑の文字 右 → 左用
      // width: 0
    })
  })
  elem.addEventListener('mouseleave', function () {
    gsap.to(curtainsWord, .3, {
      // 緑の文字 左 → 右用
      width: 0
  
      // // 緑の文字 右 → 左用
      // width: 'auto'
    })
  })
})


////////////
// .fade-in　徐々に現れる

const stGadeIn = document.querySelectorAll('.fade-in')
stGadeIn.forEach(elem => {
  gsap.from(elem, .5, {
    opacity: 0,
    scrollTrigger: {
      trigger: elem,
      start: 'top 80%',
      opacity: 1,
      // markers: true,
    }
  })
})


////////////
// 一文字ずつ現れる
// ドキュメント上の該当文章を一文字ごとにバラバラにしていく。

function splitText(className) {
  // const textElements = document.querySelectorAll(className)
  className.forEach(elem => {
    let htmlContent = elem.innerHTML
    let result = ""
    htmlContent.split('<br>').forEach((part, index, array) => {
      Array.from(part).forEach((char) => {
        result += `<span>${char}</span>`
      })
      // 最後の部分以外はbrタグを追加
      if (index < array.length - 1) {
        result += '<br>'
      }
    })
    elem.innerHTML = result
  })
}
const preCharAll = document.querySelectorAll('.per-char')
splitText(preCharAll)

preCharAll.forEach(elem => {
  gsap.from(elem.children, {
    opacity: 0,
    stagger: .05,
    scrollTrigger: {
      trigger: elem,
      start: 'top 90%',
      // markers: true
    }
  })
})


////////////
// スタイル・モデルの写真リストの表示管理
const models = Array.from(document.getElementById('style-sample').children)
const previewModelBtn = document.querySelector('.preview-model-btn')
const numberOfPeople = models.length;
const groupSize = Math.ceil(numberOfPeople / 12);
const divideGroup = [];

Array.from({ length: groupSize }).forEach((_, idx) => {
  const start = idx * 12;
  const end = Math.min(start + 12, numberOfPeople);
  divideGroup.push(models.slice(start, end));
})

// 最初のグループを表示させておく。
// GSAPを使って初期の画面の表示をset関数を使ってやってみる。
// autoAlpha: 1 → opacity: 1 と visibility: visible; にしてくれる
// autoAlpha: 0だと逆
const firstGroup = divideGroup.shift()
gsap.set(firstGroup, {
  display: 'block',
  opacity: 1
})

// クリックしたら次のグループを表示させる。
previewModelBtn.addEventListener('click', () => {
  const nextGroup = divideGroup.shift()
  nextGroup.forEach(elem => {
    elem.classList.add('models-block-defending')
  })
  gsap.to(nextGroup, .5, {
    opacity: 1,
    stagger: .07
  })
})

// styleのスタイリングの見本
const stylingViewModal = document.getElementById('styling-view-modal')
const closedBtn = document.getElementById('closed-button')

// swaiperのインスタンスを確保する。
const modaleSwiper =  new Swiper('.swiper', {
  // 各属性
  // direction: 'horizon',
  loop: true,
  // 何番目のスライドから始めるかを指定するオプション
  // initialSlide: idx,
  // ページネーション
  // pagination: {
  //   el: '.swiper-pagination',
  // },
  // ナビゲーションの矢印
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // スクロールバー
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
  // コールバック関数
  // スライド動作をきっかけに自分の設定した関数を動かすことができる
  on: {
    // スライドが変更された時に何か処理する
    init: () => {
      console.log('onInit')
    },
    // スライドが変更された時に何か処理する
    slideChange: () => {
      // ここに適宜必要な処理を書いていく。
      // console.log('change')
    }
  }
})

models.forEach((elem, idx) => {
  elem.addEventListener('click', () => {
    // ここがクリックした写真をモーダルで表示させる心臓部。たったの一行。
    // swiperのインスタンスにslideTo()関数を送信して、
    // インデックスn番目のスライドを呼び出している。
    // 必要であれば、関数の引数の最後にコールバック関数を入れる。
    modaleSwiper.slideTo(idx, 0)
    stylingViewModal.classList.add('style-fade-in')
    closedBtn.addEventListener('click', () => {
      stylingViewModal.classList.remove('style-fade-in')
    })
  })
})


////////////
// < div class='bgm-play-stop' >　音楽再生とiconの遷移
const bgmPlayStop = document.getElementById('bgm-play-stop')
const playIcon = document.getElementById('play-icon')
const stopIcon = document.getElementById('stop-icon')
const bgMusic = document.getElementById('bg-music')
let userAction = false

bgmPlayStop.addEventListener('click', function() {
  if (bgMusic.paused) {
    bgMusic.play()
    this.classList.remove('fa-volume-high')
    this.classList.add('fa-volume-xmark')
  } else {
    bgMusic.pause();
    this.classList.add('fa-volume-high')
    this.classList.remove('fa-volume-xmark')
    bgMusic.currentTime = 0
  }
})


// ////////////
// // 属性『letter-spacing: .5em;』を最後の文字だけ取り去る
// function killLetterSpace(arr) {
//   arr.forEach(elem => {
//     let lastChar = elem.textContent.slice(-1)
//     let preText = elem.textContent.slice(0, -1)
//     elem.innerHTML = `${preText}<span class='remove-letter-spacing'>${lastChar}</span>`
//   })
// }

// const arg = document.querySelectorAll('arg')
// killLetterSpace(arg)