import requests #obtem código html da página
from bs4 import BeautifulSoup 

response = requests.get('https://www.puspsc.usp.br/cardapio/')

soup = BeautifulSoup(response.content, 'html.parser') #parser é o mecanismo de tradução

lista_comidas = ['frango', 'batata', 'file de coxa assado', 'lasanha', 'pudim']

todos_dias = soup.find_all('td', class_="column-1")
todos_almocos = soup.find_all('td', class_="column-2")
todas_jantas = soup.find_all('td', class_="column-3")

menu = []
for i in range(11):
    dia = todos_dias[i].text.lower()
    almoco = todos_almocos[i].text.lower()
    janta = todas_jantas[i].text.lower()
    menu.append({'dia': dia, 'almoco': almoco, 'jantar': janta})


for m in menu:
    for refeicao in ['almoco', 'jantar']:
        periodo = m[refeicao]
        for comida in lista_comidas:
            if comida in periodo:
                print(f"Alerta! Essa semana tem {comida.title()}! no dia da {m['dia'].title()} no {refeicao.title()}")
                print("-" * 70)


