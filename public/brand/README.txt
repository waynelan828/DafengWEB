將品牌 Logo 檔放在此資料夾。

建議檔名與用途：
- logo.png：一般版（透明背景，解析度至少寬 512px）。
- logo-dark.png：深色背景用版本（加亮或反差較高）。
- mark.png：正方形的圖標（用來產出 favicon）。

若僅提供 logo.png，也可被用來產出 favicon，但建議另外提供正方形的 mark.png 以取得最佳視覺。

自動產生資產：
1) 將檔案放入 public/brand/（例如 mark.png 與 logo.png）。
2) 執行：npm run brand:gen
   會輸出：
   - public/brand/logo.png
   - public/brand/logo-dark.png
   - public/favicon/apple-touch-icon.png（180x180）
   - public/favicon/favicon-32x32.png
   - public/favicon/favicon-16x16.png
   - public/favicon/favicon.ico

導覽列已自動載入 /brand/logo.png 與（若存在）/brand/logo-dark.png；
若圖片載入失敗，會以站名文字作為後備顯示。
