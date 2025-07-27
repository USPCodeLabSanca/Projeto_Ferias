from scrapper import scrapDias

palavras_chave = ['estrogonofe', 'pudim', 'frango empanado']
dias_semana = ["Segunda feira", "Terça feira", "Quarta feira", "Quinta feira", "Sexta feira", "Sábado"]

def verificaComida():
  # Pega as comidas do scrapper e verifica se nessa semana tem alguma das comidas selecioandas.
  # Se achou a comida, imprime o dia e o turno que vai ter essa comida.

  comidas = scrapDias()
  i = 0

  for dia in comidas:
    almoco = dia[0]
    jantar = dia[1]


    for palavra in palavras_chave:
      if palavra in almoco.lower():
        print(f"{palavra.upper()} encontrado em {dias_semana[i]} no ALMOÇO!")
      if palavra in jantar.lower():
        print(f"{palavra.upper()} encontrado em {dias_semana[i]} no JANTAR!")
    
    i+=1


if __name__ == "__main__":
  verificaComida()