```md
# Next.js + Flask 連携プロジェクト

このプロジェクトは、**Next.js (App Router) + TypeScript** で作成されたフロントエンドと、**Flask** のバックエンドを連携させるシンプルなアプリケーションです。Next.js が Flask の API を呼び出し、そのデータを表示します。

---

## ⭐ 必要環境
- **Node.js 16+**
- **Python 3.x**
- **Flask**（バックエンド）
- **Next.js**（フロントエンド）

---

## 📚 プロジェクト構成

```
my-nextjs-app/
  ├── app/
  │   ├── hello/
  │   │   ├── page.tsx   # Flask API からデータを取得するページ
  ├── package.json
  ├── tsconfig.json
```

---

## 🚀 インストール & セットアップ

### 1. Flask API のセットアップ
1. **Flask をインストール**
   ```bash
   pip install flask flask-cors
   ```
2. **API を作成 (`hello.py`)**
   ```python
   from flask import Flask
   from flask_cors import CORS

   app = Flask(__name__)
   CORS(app)

   @app.route("/")
   def hello_world():
       return "こんにちは、世界！"

   if __name__ == "__main__":
       app.run(debug=True)
   ```
3. **サーバーを起動**
   ```bash
   python hello.py
   ```
   `http://127.0.0.1:5000/` にアクセスすると **「こんにちは、世界！」** と表示される

---

### 2. Next.js フロントエンドのセットアップ
1. **Next.js プロジェクトの作成**
   ```bash
   npx create-next-app my-nextjs-app --typescript
   cd my-nextjs-app
   ```
2. **必要なパッケージをインストール**
   ```bash
   npm install
   ```
3. **API を取得するページ (`app/hello/page.tsx`) を作成**
   ```tsx
   export default async function HelloPage() {
     const res = await fetch("http://127.0.0.1:5000/", { cache: "no-store" });

     if (!res.ok) {
       return <div>データの取得に失敗しました。</div>;
     }

     const message = await res.text();

     return (
       <main className="p-8">
         <h1 className="text-2xl font-bold">Flask からのメッセージ</h1>
         <p className="text-lg mt-4">{message}</p>
       </main>
     );
   }
   ```
4. **Next.js アプリを起動**
   ```bash
   npm run dev
   ```
   `http://localhost:3000/hello` にアクセスすると **「こんにちは、世界！」** と表示される

---

## ❗ よくあるエラーと対処法

### 1. JSX に関するエラー (`ts(7026)`)
```
JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
```
✅ 解決策：
```bash
npm install --save-dev @types/react @types/react-dom
```

---

### 2. CORSエラー
```
Access to fetch at 'http://127.0.0.1:5000/' from origin 'http://localhost:3000' has been blocked by CORS policy
```
✅ 解決策：
Flask に `flask-cors` を追加し、CORS を許可する。
```python
from flask_cors import CORS
CORS(app)
```

---

### 3. ポートが競合する
✅ 解決策：
Next.js のポートを変更する（例: `4000` に変更）
```bash
npm run dev -- -p 4000
```
→ `http://localhost:4000/hello` でアクセス可能

---

## 🎉 まとめ
このプロジェクトでは、**Next.js (App Router) + TypeScript** を使って **Flask の API** からデータを取得しました。さらに、**CORS 対応** や **エラー対策** も含め、シンプルに動作することを確認しました。

✅ **この構成を元に、API から JSON を取得するように拡張したり、認証を追加することも可能です！** 🚀
```


