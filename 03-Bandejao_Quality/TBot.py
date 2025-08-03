import telebot
from scrapper import criaMsg

myID= '8008442499'
myToken= '8366697118:AAFp1ZCUYe3MCyyXIXcZarpjsX0arwORO9g'
bot = telebot.TeleBot(myToken)
comidas= "\n".join(criaMsg())

@bot.message_handler(commands=['start']) 
def start(msg: telebot.types.Message):
    bot.reply_to(msg, 'Olá mundo!')

@bot.message_handler(commands=['Bandeco']) 
def start(msg: telebot.types.Message):
    bot.reply_to(msg, comidas)

if len(comidas):
    bot.send_message(myID, comidas)

bot.infinity_polling()