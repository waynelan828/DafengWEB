在此放置自訂 favicon 檔案，常見包含：
- favicon.ico
- favicon-32x32.png（32x32）
- favicon-16x16.png（16x16）
- apple-touch-icon.png（180x180）

本專案已內建預設 Favicons（src/assets/favicons）。
只要把檔案放到 /public/favicon，瀏覽器會優先讀取這裡的檔案。

也可使用內建產生腳本：
1) 將 brand 標誌檔放到 public/brand（建議提供 mark.png 與 logo.png）。
2) 執行：npm run brand:gen
   會自動產生上述 favicon 檔案。

線上工具：
- https://realfavicongenerator.net/
- https://favicon.io/
