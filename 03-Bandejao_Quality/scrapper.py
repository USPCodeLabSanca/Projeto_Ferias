import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta

#Comidas que você deseja buscar se tá tendo no bandeco
comidas=['Frango', 'Batata', 'Lasanha', 'Pudim', 'Estrogonofe', 'Ovo Frito', 'Pé de Moça', 'Brigadeirão' ]

#Essa função recebe a string do html do site e tira todas as coisas desnecessárias pra fazer a leitura, tipo </br> e tals
#Ela também quebra em duas strings, uma com as comidas do almoço e uma com as comidas do jantar
def cleanup(abc: str, num: int, dia: str):
    #Lista de coisas que deve-se remover
    trash=['<br/>', str(dia), '</strong>', f'<tr class="row-{num}">', '<td class="column-1">', '</td>', '<tr>', '</tr>', '<strong>', '<td class="column-2">']
    for t in trash:
        abc=abc.replace(t, '') #apagando as chaves de HTML
    abc=abc.replace('\n', ' ') #deixando um pouco mais legível caso for necessário desbugar
    end=abc.find('<td class="column-3">') #aq é onde acabam as comidas do almoço e começam a do jantar
    menu= list()
    menu.append(abc[:end]) #almoço
    menu.append(abc[end+4:]) #jantar
    return menu

#Essa função já coloca a comida (que foi separada pela cleanup() em almoço e jantar) de cada dia dentro de um dicionário
def daysOfTheWeek(sopinha):
    semana=dict()
    semana['Segunda']=  cleanup(str(sopinha.find(class_="row-3")), 3, 'Segunda-feira')
    semana['Terça']=  cleanup(str(sopinha.find(class_="row-5")), 5, 'Terça-feira')
    semana['Quarta']=  cleanup(str(sopinha.find(class_="row-7")), 7, 'Quarta-feira')
    semana['Quinta']=  cleanup(str(sopinha.find(class_="row-9")), 9, 'Quinta-feira')
    semana['Sexta']=  cleanup(str(sopinha.find(class_="row-11")), 11, 'Sexta-feira')
    semana['Sábado']=  cleanup(str(sopinha.find(class_="row-13")), 13, 'Sábado')

    return semana

#Essa função é só pra pegar as datas em número, tipo 02/08/2025
def daysOfTheMonth(sopinha):
    dates=dict()
    week=['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    ph= str(sopinha.find(class_="row-1"))
    day1=datetime(int(ph[40:42]), int(ph[43:45]), int(ph[47:51]))

    dates['Segunda']= day1
    for i in range (1,6):
        dates[week[i]]=day1+timedelta(days=i)

    return dates

#Essa função retorna uma lista com as comidas boas, os dias da semana que vai ter, e em qual refeição (almoço ou janta)
def searchComidaBoa(dic:dict, comidaBoa:list):
    dia=dict()
    quaisDias=list()
    for key, value in dic.items():
        for c in comidaBoa:
            if value[0].find(c)!=-1:
                dia['dia']=key
                dia['refeição']='Almoço'
                dia['comida']=c
                if dia not in quaisDias:
                    quaisDias.append(dia.copy())
            if value[1].find(c)!=-1:
                dia['dia']=key
                dia['refeição']='Jantar'
                dia['comida']=c
                if dia not in quaisDias:
                    quaisDias.append(dia.copy())
    
    return quaisDias

#Essa função envia as mensagens das comidas boas que tem cada dia, tanto pro console quanto cria uma lista q vai ser enviada para o telegram
def criaMsg():
    response = requests.get('https://www.puspsc.usp.br/cardapio/')
    soup = BeautifulSoup(response.content, 'html.parser')
    comidaBoa= searchComidaBoa(daysOfTheWeek(soup), comidas)
    dias= daysOfTheMonth(soup)
    exportando= list()
    for c in comidaBoa:
        diazinho=c['dia']
        if diazinho in dias.keys():
            msg= (f'Eba! No dia {dias[diazinho].strftime("%d/%m/%Y")} ({diazinho}) vai ter {c["comida"]} no {c["refeição"]}!!!')
            print(msg)
            exportando.append(msg[:])

    return exportando

