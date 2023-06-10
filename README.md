# 質問

修正を反映させたサイトのファイル分割をしました。

[コード置き場](https://github.com/vivlio-kumihan/trace-lamune)

---

`style.scss`に関連するファイルを登録

```scss
@charset "UTF-8";

// 不要な記述はすべて削除完了。
@use "forwards" as fw;
@use "destyle";
@use "component/font";
@use "module/header";
@use "module/general";
@use "module/sec-about";
@use "module/sec-blog";
@use "module/sec-main-visual";
@use "module/sec-menu";
@use "module/sec-recruit";
@use "module/sec-staff";
@use "module/sec-style";
@use "module/footer";
```
---
`component > _size.scss`にブレークポイントになる数値を変数として格納したファイルを参照して`_media-query.scss`を書きました。
```scss
@use '../component/size' as sz;

@mixin media-query-pc() {
  @media screen and (min-width: sz.$break-point-pc) {
    @content
  }
}

@mixin media-query-tb() {
  @media screen and (min-width: sz.$break-point-tb-lo) and (max-width: sz.$break-point-tb-hi) {
    @content
  }
}

@mixin media-query-sp() {
  @media screen and (max-width: sz.$break-point-sp) {
    @content
  }
}
```

---

この段階では、各sassファイルには`@mixin media-query-sp(){}`で設定したものを`@include`してスマホ用の表示を実現させています。

---

__ここから質問です。__

最後の仕上げで、PC用のマージンを設定しようと`@mixin media-query-pc()`を@includeしましたが上手くいきません。

まず、全体を`padding-left: 200px;`設定したかったので、`_general.scss`に下記の設定を書きました。

__163行__
```scss
.container {
  @include fw.media-query-sp {
    width: 100%;
    padding: 0 20px;
  }
}
```
↓

```scss
.container {
  @include fw.media-query-pc {
    padding-left: 200px
  }

  @include fw.media-query-sp {
    width: 100%;
    padding: 0 20px;
  }
}
```

* PC版では、`VIEW MORE`のスタイルが効かなくなる。
* スマホ用のスタイルが効かなくなる。
* 元に戻そうと記述を消しても、サイトの表示が元に戻らない。

丸一日、色々としましたが解決できません。
申し訳ありませんが見ていただけないでしょうか。
よろしくお願いいたします。

とにかく、新規の模写をこれから作り始めたいと思います。

