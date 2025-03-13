



---

# 🌟 **NFT Collection Checker** 🌟

Welcome to the **NFT Collection Checker** project! 🎨 This project consists of a **frontend extension** and a **backend server** that allows you to check NFT collections. 🚀 Whether you're a developer or an NFT enthusiast, this tool makes it easy to explore the world of NFTs! 👾

---

[![Watch the video](https://img.youtube.com/vi/Y-IXQ8gYMi4/maxresdefault.jpg)](https://youtu.be/Y-IXQ8gYMi4)


## 📋 **Table of Contents** 📋

1. [Frontend Setup](#frontend-setup)
2. [Backend Setup](#backend-setup)
3. [Running the Project](#running-the-project)
4. [Contributing](#contributing)
5. [License](#license)

---

## 🚀 **Frontend Setup** 🚀

### 🔧 **Prerequisites** 🔧

Make sure you have the following installed:

- **Node.js** (v14 or higher) 🌐
- **npm** (v6 or higher) 📦

### 🛠️ **Installation** 🛠️

1. **Navigate to the Frontend Directory**:

   ```bash
   cd nft-extension
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Build the Extension**:

   ```bash
   npm run build
   ```

   This will create a `dist` directory containing the built extension files. 🎉

4. **Load the Extension in Your Browser** 🌍

   - Open your browser and go to `chrome://extensions/`.
   - Enable **Developer mode** in the top-right corner.
   - Click **"Load unpacked"** and select the `dist` directory from the `nft-extension` folder. 🔌

### 🔥 **Running the Frontend** 🔥

To run the frontend in **development mode**:

```bash
npm run dev
```

This will start a development server, and you can view the extension in your browser! 🌐👀

---

## 🖥️ **Backend Setup** 🖥️

### 🔧 **Prerequisites** 🔧

- **Node.js** (v14 or higher) 🌐
- **npm** (v6 or higher) 📦

### 🛠️ **Installation** 🛠️

1. **Navigate to the Backend Directory**:

   ```bash
   cd backend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   - Rename `.env.example` to `.env`.
   - Open the `.env` file and paste your **Alchemy API key**:

   ```env
   alchemy_api="your_alchemy_api_key_here"
   ```

   🔑

### 🔥 **Running the Backend** 🔥

To start the backend server:

```bash
nodemon index.js
```

index.js
```

The server will start and listen on the default port (usually 3000). 🌐 You can now interact with the backend API! 🚀

---

## 🚀 **Running the Project** 🚀

1. **Start the Backend Server**: Follow the instructions in the Backend Setup section. 🖥️
2. **Load the Frontend Extension**: Follow the instructions in the Frontend Setup section. 🔧
3. **Interact with the NFT Collection Checker**: Use the extension to interact with the backend and check NFT collections! 🎨

**Ensure the backend server is running** for the extension to work correctly. ✅

---

## 💻 **Contributing** 💻

We welcome contributions to this project! 🎉 Here’s how you can help make this tool even better:

1. **Fork the repository** 🍴
2. **Create a new branch**:  
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Commit your changes**:  
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the branch**:  
   ```bash
   git push origin feature/YourFeatureName
   ```
5. **Open a pull request** 🚀

Let’s build something amazing together! 💥

---

## 📝 **License** 📝

This project is licensed under the **MIT License**. Check the LICENSE file for more details. 📄

---

✨ **Thank you for using the NFT Collection Checker!** ✨  
If you have any questions or need further assistance, feel free to open an issue or contact the maintainers! 🙌

Happy coding, and may the NFTs be with you! 💎🚀

---

Hope this adds a bit of sparkle to your project! 😄
