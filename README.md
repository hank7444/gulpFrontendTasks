gulpFrontendTasks
===================


利用gulp來做到html, css, js檔案每次在儲存時，會自動格式美化與驗證是否有錯誤.

總共有以下執行模式: 

* default: 會對js/, css/, html/, sass/資料夾底下的檔案監聽，驗證與美化排版，sass/會轉成.css檔案放置在css/下
* livereload: 同default, 但多了browser-sync模組, 在每次儲存js, css, html, sass時, 會自動重新整理瀏覽器中，網址為:localhost:3000/html.*.html的頁面


##Usage

### step1: download node modules
```
npm install
```

### step2: execute grunt

```
gulp // or gulp livereload

```

### step3: use & enjoy it! :)
如果為livereload模式, <br>
預設的網址為: localhost:3000, <br>
瀏覽器會自動重新整理瀏覽器中，網址為:localhost:3000/html.*.html的頁面


##note1: browser-sync livereload機制說明
1. .css: 只有在瀏覽器上, 用到該css的html頁面會自動重新整理(自動注入)
2. .js: 所有瀏覽器上的html頁面都會自動重新整理(全部重新整理)
3. .html: 同js(全部重新整理)
 
##License
Licensed under the MIT License
 
##Authors
Copyright(c) 2014 Hank Kuo <<hank7444@gmail.com>>
