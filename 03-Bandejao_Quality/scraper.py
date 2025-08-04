import requests
from bs4 import BeautifulSoup

response = requests.get('https://www.puspsc.usp.br/cardapio/')
soup = BeautifulSoup(response.content, 'html.parser')

keywords = ['frango', 'batata', 'lasanha', 'pudim']

for i in range(3, 14, 2):
    day = soup.find("tr", class_=f"row-{i}").find("td", class_="column-1").text.lower().strip()
    lunch = soup.find("tr", class_=f"row-{i}").find("td", class_="column-2").text.lower()
    dinner = soup.find("tr", class_=f"row-{i}").find("td", class_="column-3").text.lower()
    for word in keywords:
        if word in lunch:
            print(f"Alerta! Essa semana tem {word} no almoço de {day}")
    for word in keywords:
        if word in dinner:
            print(f"Alerta! Essa semana tem {word} na janta de {day}")