from urllib.request import urlopen
from bs4 import BeautifulSoup

URL = 'https://www.puspsc.usp.br/cardapio/'



def scrapDias():
  # vai no url e percorre a tabela com as comidas daquela semana
  # retorna as comidas de cada dia, almoco e jantar

  comidas = []

  html = urlopen(URL)
  bs = BeautifulSoup(html.read(), 'html.parser')

  for i in range(3, 16, 2):
    comida = [str(bs.find('tr', {'class':f'row-{i}'}).find('td', {'column-2'}).getText), #almoco
              str(bs.find('tr', {'class':f'row-{i}'}).find('td', {'column-3'}).getText) #jantar
              ]
    comidas.append(comida)

  return comidas
  

