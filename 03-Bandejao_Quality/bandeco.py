import requests
from bs4 import BeautifulSoup
import telebot
import os
from dotenv import load_dotenv

load_dotenv()  # carrega as variáveis do .env

# inicializa o bot do telegram (@bandeco_ICMC_Bot)
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
bot = telebot.TeleBot(TOKEN)
 
# função para verificar os alimentos no cardápio
def verifica_alimentos():
    print("Esse bot verifica se alguns alimentos estarão presentes no bandejão da USP São Carlos essa semana.")
    # palavras a serem verificadas
    palavras = ['pudim', 'frango', 'lasanha', 'estrogonofe', 'flan de baunilha']

    # carrega dados do site
    response = requests.get('https://www.puspsc.usp.br/cardapio')
    soup = BeautifulSoup(response.content, 'html.parser')
    linhas = soup.find_all('tr')
    
    # lista para armazenar os resultados
    resultados_finais = []
    for palavra in palavras:
        dias_encontrados = []

        # percorrer as linhas da tabela
        for linha in linhas:
            # pega a coluna do dia, almoço e jantar
            col_dia = linha.find('td', class_='column-1')
            col_almoco = linha.find('td', class_='column-2')
            col_jantar = linha.find('td', class_='column-3')

            # verifica se a linha é válida e tem todas as colunas
            if col_dia and col_almoco and col_jantar:
                dia = col_dia.get_text(strip=True)
                
                # extrai o texto
                cardapio_almoco = ' '.join(col_almoco.stripped_strings)
                cardapio_jantar = ' '.join(col_jantar.stripped_strings)
                
                # combina almoço + janta para busca
                cardapio_dia_inteiro = cardapio_almoco + " " + cardapio_jantar

                # busca a palavra e adiciona o dia se encontrado
                if palavra in cardapio_dia_inteiro.lower():
                    dias_encontrados.append(dia)
        
        # armazena o resultado em resultados_finais
        if dias_encontrados:
            dias_formatados = ", ".join(dias_encontrados)
            resultados_finais.append(f" Essa semana irá ter {palavra} nos seguintes dias: {dias_formatados}.")
        else:
            resultados_finais.append(f" Essa semana não irá ter {palavra}.")
    
    # junta todos os resultados em uma única mensagem
    return "\n\n".join(resultados_finais)


# comandos iniciais
@bot.message_handler(commands=['start', 'help'])
def start_msg(msg:telebot.types.Message):
    bot.reply_to(msg, "Esse bot verifica se alguns alimentos estarão presentes no bandejão da USP São Carlos essa semana.\n"
                      "Use o comando /check para verificar os alimentos.")

# comando para verificar o cardápio
@bot.message_handler(commands=['check'])
def check_alimentos(msg:telebot.types.Message):    
    bot.reply_to(msg, "Verificando cardápio do bandejão...")
    resultado = verifica_alimentos()
    bot.reply_to(msg, resultado)

bot.infinity_polling()              
