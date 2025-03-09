# Enough Coffee BMI Calculator ☕📏

Welcome to **Enough Coffee** – a fun and handy tool to calculate your **Body Mass Index (BMI)** and get personalized **caffeine recommendations**! Whether you're a coffee lover ☕ or just curious about your health stats, this app has got you covered. Built with **React** and styled with **Tailwind CSS**, it’s simple, sleek, and oh-so-useful! 🚀

---

## ✨ Features

- **BMI Calculation** 📐: Input your weight and height to instantly see your BMI.
- **Caffeine Advice** ☕: Get tailored caffeine intake suggestions based on your age and gender.
- **Pregnancy & Breastfeeding Info** 🤰: Special recommendations for women who are pregnant or breastfeeding.
- **Beautiful UI** 🎨: A clean, coffee-themed design with Tailwind CSS.
- **Responsive** 📱: Works perfectly on desktop, tablet, and mobile devices.
- **Data Storage** 💾: Saves your results via an API (optional backend integration).

---

## 🛠️ Tech Stack

- **React** ⚛️: For a dynamic and interactive frontend.
- **Tailwind CSS** 🎨: For stylish, responsive, and customizable UI.
- **Axios** 🌐: For seamless API requests.
- **JavaScript** 💻: The magic behind the calculations.

---

## 🚀 Getting Started

Ready to brew some health insights? Follow these steps to get the project running on your machine! ☕

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) (v14 or higher) 🟢
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) 📦

### Installation

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/ITSHahrad/enough-coffee.git
   ```

2. **Navigate to the Project Folder**  
   ```bash
   cd enough-coffee
   ```

3. **Install Dependencies**  
   Using npm:
   ```bash
   npm install
   ```
   Or with yarn:
   ```bash
   yarn install
   ```

4. **Start the Development Server**  
   ```bash
   npm start
   ```
   Or:
   ```bash
   yarn start
   ```

5. **Open in Browser**  
   Visit `http://localhost:3000` to see the app in action! 🌐

---

## 📋 Usage

1. **Enter Your Details**  
   - Name: Your first name (e.g., "Ali") ✍️
   - Weight: In kilograms (e.g., 70) ⚖️
   - Height: In centimeters (e.g., 175) 📏
   - Age: Your age in years (e.g., 25) 🎂
   - Gender: Choose "مرد" (Male) or "زن" (Female) 👨‍🚀👩‍🚀

2. **For Females**  
   - Answer if you’re pregnant ("بله" or "خیر") 🤰
   - Answer if you’re breastfeeding ("بله" or "خیر") 👶

3. **Hit "محاسبه" (Calculate)**  
   Watch the magic happen! You’ll get your BMI and caffeine advice in seconds. ✨

4. **Reset**  
   Click "ریست" to start over anytime. 🔄

---

## 🌟 Example Output

For input:
- Name: "Sara"
- Weight: 60 kg
- Height: 165 cm
- Age: 28
- Gender: "زن" (Female)
- Pregnant: "خیر" (No)
- Breastfeeding: "خیر" (No)

**Output:**
- **BMI**: 22.04 ("وزن شما ایده آل است")
- **Caffeine**: 168 mg/day
- **Message**: Personalized advice based on your stats!

---

## 📡 Backend Integration (Optional)

This app can save user data to a backend API. To set it up:
1. Create a server (e.g., with Node.js and MongoDB).
2. Update the API endpoint in the `axios.post` call 
3. Ensure your backend handles the following schema:
   ```json
   {
     "firstName": "String",
     "weight": "Number",
     "height": "Number",
     "age": "Number",
     "gender": "String",
     "pregnant": "String",
     "breastfeeding": "String",
     "bmi": "Number",
     "caffeine": "Number"
   }
   ```

---

## 📜 License

This project is licensed under the MIT License – feel free to use, modify, and share it! 📖

---

## 🙌 Acknowledgments

- Inspired by coffee lovers everywhere ☕❤️
- Built with 💖 by [ITSHahrad](https://github.com/ITSHahrad)
- Special thanks to [فروشگاه خماریان](https://khomarian.ir) for the vibes!

---
