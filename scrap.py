import requests
from bs4 import BeautifulSoup, SoupStrainer

# Leitura do conteúdo das linhas de tabela de página
response = requests.get('https://www.puspsc.usp.br/cardapio/.')
menu_only = SoupStrainer(class_='row-striping row-hover')
soup = BeautifulSoup(response.content, 'html.parser', parse_only=menu_only)

# Printa o cardápio e salva em um dicionário
cardapio_dict = {}
for cardapio_dia in soup.find_all(lambda tag: tag.name=='tr' and tag.text.strip() != ''):
    semana = cardapio_dia.find('strong').text
    print('----> ' + semana)

    almoco = cardapio_dia.find(class_='column-2').text
    print('\n----------Almoço--------')
    print(almoco if almoco else "INDISPONÍVEL")

    jantar = cardapio_dia.find(class_='column-3').text
    print('\n----------Jantar--------')
    print(jantar if jantar else "INDISPONÍVEL")

    print('\n')

    cardapio_dict[semana] = (almoco, jantar)

# Procura as comidas favoritas no cardápio
favoritas = ['lasanha', 'gelatina', 'estrogonofe', 'frango empanado']
for dia, (almoco, jantar) in cardapio_dict.items():
    for comida in favoritas:
        if comida in almoco.lower():
            print(f"\n----> {dia}: Encontrado '{comida}' no almoço!")
            print('\n----------Almoço--------')
            print(almoco)
        if comida in jantar.lower():
            print(f"\n----> {dia}: Encontrado '{comida}' no jantar!")
            print('\n----------Jantar--------')
            print(jantar)