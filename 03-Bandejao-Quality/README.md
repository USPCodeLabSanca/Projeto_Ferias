# 🍽️ Bandejão Quality – Telegram Menu Alert Bot

This project is a simple **web scraper** and **Telegram bot** that checks the daily menu from the [PUSP-SC cafeteria](https://www.puspsc.usp.br/cardapio/) and alerts the user via Telegram when certain keywords (like `"lasanha"` or `"frango"`) are found in the weekly menu.

## 🚀 Features

- Scrapes the current weekly menu (almoço & janta)
- Reads a custom list of keywords from a `.txt` file
- Sends Telegram alerts when a keyword is found
- Console output for each day’s menu

## 📂 Project Structure

```
.
├── scraper.py             # Main script (scraper + Telegram notifier)
├── meubot.py              # Simple test script for the bot
├── palavras_chaves.txt    # List of keywords (one per line)
└── .venv/                 # Virtual environment (should be gitignored)
```

## 📥 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/bandejao-quality.git
cd bandejao-quality
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

> Create a `requirements.txt` using:
> ```bash
> pip freeze > requirements.txt
> ```

3. Create and configure your `TOKEN` and `CHAT_ID`:
   - Replace `'SEU_TOKEN_AQUI'` and `'SEU_CHAT_ID_AQUI'` in `scraper.py` with your own bot token and Telegram chat ID.

---

## 📝 How it works

1. `scraper.py` fetches the weekly menu from the Bandejão site.
2. It parses each day and joins the lunch and dinner descriptions.
3. For each joined string, it checks whether **any of the keywords** (from `palavras_chaves.txt`) are present.
4. If a match is found, it:
   - Prints an alert to the console
   - Sends a message via Telegram with the day and matched keyword

---

## ✏️ Customize Your Keywords

Edit the `palavras_chaves.txt` file and add one keyword per line. For example:

```
frango
lasanha
pudim
batata
```

---

## 🔒 Security Note

The bot `TOKEN` and `CHAT_ID` in the code were **intentionally replaced** with placeholder values for public sharing.  
**Do not commit your real token or chat ID to GitHub.**

---

## 📌 Disclaimer

This project was created for learning purposes and is not affiliated with the University of São Paulo (USP). The website content is publicly available.

---

## 🤖 Sample Output

```bash
Página acessada com sucesso!
Dia: Sábado
Almoço: Lasanha ao molho branco, arroz, feijão...
Janta: Frango grelhado, salada, batata...

------------------------------------------------
Alerta! Essa semana tem lasanha! no dia Sábado
```

---

## 🧠 Author

**Bruno Zuffo**

Feel free to fork, customize and use this project to learn or build your own version!
