import requests
from bs4 import BeautifulSoup

response = requests.get('https://www.puspsc.usp.br/cardapio/')

soup = BeautifulSoup(response.content, 'html.parser')

comidas_favoritas = ['frango', 'batata', 'lasanha', 'estrogonofe de Carne', 'pudim']

dias = soup.find_all('td', class_="column-1")
almocos = soup.find_all('td', class_="column-2")
jantas = soup.find_all('td', class_="column-3")

for i in range(len(dias)):
  dia = dias[i].get_text().lower().strip() # strip tira os espaços em branco antes e depois 
  almoco = almocos[i].get_text().lower()
  janta = jantas[i].get_text().lower()

  comidas_do_dia = []

  for comida in comidas_favoritas:
      if comida in almoco or comida in janta:
          comidas_do_dia.append(comida)

  if comidas_do_dia:
        if dia == 'sábado':
            print(f"🔔 ALERTA! Essa semana tem {' e '.join(comidas_do_dia)} no {dia}.")
        else:
            print(f"🔔 ALERTA! Essa semana tem {' e '.join(comidas_do_dia)} na {dia}.")