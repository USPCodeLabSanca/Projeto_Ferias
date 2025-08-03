import requests
from bs4 import BeautifulSoup

import telebot #importando o bot do telegram ( código no meubot.py )

TOKEN='SEU_TOKEN_AQUI'
CHAT_ID='SEU_CHAT_ID_AQUI'

bot=telebot.TeleBot(TOKEN)

with open('palavras_chaves.txt','r',encoding='utf-8') as arquivo:
    PALAVRAS_CHAVE=[linha.strip().lower() for linha in arquivo if linha.strip()]

#ler url
url='https://www.puspsc.usp.br/cardapio/'
resposta=requests.get(url)

#verificar se está tudo certo
if(resposta.status_code==200):
    print('Página acessada com sucesso!')
    
    #acessar o conteúdo da página
    html=resposta.content
    
    #traduzir o conteúdo da página para podermos usar os dados dela
    soup=BeautifulSoup(html,'html.parser')
    
    #buscando todos os dias, almoços e jantas
    dias=soup.find_all('td', class_='column-1')
    almoços=soup.find_all('td', class_='column-2')
    jantas=soup.find_all('td', class_='column-3')
    
    
    #testando se deu certo
    for i in range(len(dias)):
        #dia recebe o conteúdo do dias e retira os espaços
        dia=dias[i].text.strip()
        almoço=almoços[i].text.strip()
        janta=jantas[i].text.strip()
        
        #verificando se é vazio
        if(dia):
            print(f'Dia: {dia}') 
            print(f'Almoço: {almoço}')
            print('\n')
            if(janta):
                print(f'Janta: {janta}')
            print('\n')
            print('------------------------------------------------')
            
        #verificar se a palavra está no PALAVRAS_CHAVES
        #antes, faremos um cardapio completo para facilitar, juntando almoço+janta
        cardapio_completo=f"{almoço} {janta}".lower() #agora temos para cada dia um cardapio completo em minúsculo para evitar erros como Frango != frango
        
        for palavra in PALAVRAS_CHAVE:
            if palavra in cardapio_completo:
                mensagem=f'Alerta! Essa semana tem {palavra}! no dia {dia}'
                print(mensagem)
                print('------------------------------------------------')
                bot.send_message(CHAT_ID,mensagem)
        print('\n')
            
else:
    print(f'Erro ao acessar a página. Código: {resposta.status_code}')