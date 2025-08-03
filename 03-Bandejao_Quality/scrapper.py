import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta

#Comidas que você deseja buscar se tá tendo no bandeco
comidas=['Lasanha de PVT', 'Ovo Frito', 'Pé de Moça', 'Brigadeirão' ]
week=('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado')

#Essa função recebe a string do html do site e quebra em duas strings, uma com as comidas do almoço e uma com as comidas do jantar
def cleanup(abc: str):
    end=abc.find('<td class="column-3">') #aq é onde acabam as comidas do almoço e começam a do jantar
    menu= list()
    menu.append(abc[:end]) #almoço
    menu.append(abc[end+4:]) #jantar
    return menu

#Essa função já coloca a comida (que foi separada pela cleanup() em almoço e jantar) de cada dia dentro de um dicionário
def daysOfTheWeek(sopinha, sem:tuple):
    semana=dict()
    j=0
    for i in range (3, 14, 2):
        classe= "row-" + str(i)
        semana[sem[j]]= cleanup(str(sopinha.find(class_=classe)))
        j+=1
    return semana
 
#Essa função é só pra pegar as datas em número, tipo 02/08/2025
def daysOfTheMonth(sopinha, tp: tuple):
    dates=dict()
    ph= str(sopinha.find(class_="row-1"))
    day1=datetime(int(ph[40:42]), int(ph[43:45]), int(ph[47:51]))
    dates['Segunda']= day1
    for i in range (1,6):
        dates[tp[i]]=day1+timedelta(days=i)

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
def criaMsg(tp: tuple):
    response = requests.get('https://www.puspsc.usp.br/cardapio/')
    soup = BeautifulSoup(response.content, 'html.parser')
    comidaBoa= searchComidaBoa(daysOfTheWeek(soup, week), comidas)
    diasM=daysOfTheMonth(soup, week)
    exportando= list()
    for c in comidaBoa:
        diazinho=c['dia']
        if diazinho in tp:
            msg= (f'Eba! No dia {diasM[diazinho].strftime("%d/%m/%Y")} ({diazinho}) vai ter {c["comida"]} no {c["refeição"]}!!!')
            print(msg)
            exportando.append(msg[:])
    return exportando

