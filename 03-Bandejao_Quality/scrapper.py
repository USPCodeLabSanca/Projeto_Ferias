import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta


def cleanup(abc, num, dia):
    trash=['<br/>', str(dia), '</strong>', f'<tr class="row-{num}">', '<td class="column-1">', '</td>', '<tr>', '</tr>', '<strong>', '<td class="column-2">']
    abcd=str(abc)
    for t in trash:
        abcd=abcd.replace(t, '')
    abcd=abcd.replace('<td class="column-3">', 'FLAG')
    abcd=abcd.replace('\n', ' ')
    end=abcd.find('FLAG')
    menu= list()
    menu.append(abcd[:end])
    menu.append(abcd[end+4:])    
    return menu

def daysOfTheWeek(sopinha):
    semana=dict()
    semana['Segunda']=  cleanup(str(sopinha.find(class_="row-3")), 3, 'Segunda-feira')
    semana['Terça']=  cleanup(str(sopinha.find(class_="row-5")), 5, 'Terça-feira')
    semana['Quarta']=  cleanup(str(sopinha.find(class_="row-7")), 7, 'Quarta-feira')
    semana['Quinta']=  cleanup(str(sopinha.find(class_="row-9")), 9, 'Quinta-feira')
    semana['Sexta']=  cleanup(str(sopinha.find(class_="row-11")), 11, 'Sexta-feira')
    semana['Sábado']=  cleanup(str(sopinha.find(class_="row-13")), 13, 'Sábado')

    return semana

def daysOfTheMonth(sopinha):
    dates=dict()
    week=['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    ph= str(sopinha.find(class_="row-1"))
    day1=datetime(int(ph[40:42]), int(ph[43:45]), int(ph[47:51]))

    dates['Segunda']= day1
    for i in range (1,6):
        dates[week[i]]=day1+timedelta(days=i)

    return dates


def searchComidaBoa(dic):
    dia=dict()
    quaisDias=list()
    comidaBoa=['Frango', 'Batata', 'Lasanha', 'Pudim', 'Estrogonofe', 'Ovo Frito', 'Pé de Moça', 'Brigadeirão' ]
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


response = requests.get('https://www.puspsc.usp.br/cardapio/')
soup = BeautifulSoup(response.content, 'html.parser')
sem= daysOfTheWeek(soup)
comidaBoa= searchComidaBoa(sem)
dias= daysOfTheMonth(soup)
for c in comidaBoa:
    diazinho=c['dia']
    if diazinho in dias.keys():
        print(f'Eba! No dia {dias[diazinho].strftime("%d-%m-%Y")} ({diazinho}) vai ter {c["comida"]} no {c["refeição"]}!!!')



