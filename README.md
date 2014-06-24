gulpFrontendTasks
===================


利用gulp來做到html, css, js檔案每次在儲存時，會自動格式美化與驗證是否有錯誤.

總共有以下執行模式: 

* `default`: 會對js/, css/, html/, sass/資料夾底下的檔案監聽，驗證與美化排版，sass/會轉成.css檔案放置在css/下
* `livereload`: 同default, 但多了browser-sync模組, 在每次儲存js, css, html, sass時, 會自動重新整理瀏覽器中，網址為:localhost:3000/html.*.html的頁面
* `test`: 同livereload, 但多了單元測試與集成測試環境的建制, 測試環境採用mocha.js, 並使用chai.js擴充
	

##Options

###default
會對js/, css/, html/, sass/資料夾底下的檔案監聽，驗證與美化排版，sass/會轉成.css檔案放置在css/下

###livereload
 同default, 但多了browser-sync模組, 在每次儲存js, css, html, sass時, 會自動重新整理瀏覽器中，網址為:localhost:3000/html.*.html的頁面
 
###test
同livereload, 但多了單元測試與集成測試環境的建制, 測試環境採用mocha.js, 並使用chai.js擴充

`集成測試`: 
每次更新html/下面的html檔案，系統會自動將該html檔案複製到test/html, 並加上mocha與相關套件. 並且會有一個與該html檔案同名的js會產生在test/html/script下(如果該目錄已有同名js則不覆蓋, 避免之前寫的測試碼被蓋掉). 要觀看測試只要在網址輸入: localhost:3000/test/html/同名.html即可, 測試程式碼則寫在test/html/script/同名.js即可.

例如: 

```
// 使用者建立了html/test.html, 按儲存
// 系統產生 test/html/test.html // 測試顯示頁
// 系統產生 test/html/script/html.js // 測試碼

```

`單元測試(尚未實作)`: 
	
	
	
##Usage

### step1: download node modules
```
npm install
```

### step2: execute grunt

```
gulp // or "gulp livereload" or "gulp test"

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
