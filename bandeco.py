import requests
from bs4 import BeautifulSoup

def main():
    print("Esse bot verifica se alguns alimentos estarão presentes no bandejão da USP São Carlos essa semana.")
    palavras = ['pudim', 'frango', 'lasanha', 'estrogonofe', 'flan de baunilha']
    for palavra in palavras:
        dias_encontrados = []

        # carrega dados do site
        response = requests.get('https://www.puspsc.usp.br/cardapio')
        soup = BeautifulSoup(response.content, 'html.parser')

        linhas = soup.find_all('tr')
        # percorrer as linhas da tabela
        for linha in linhas:
            # pega a coluna do dia, almoço e jantar
            col_dia = linha.find('td', class_='column-1')
            col_almoco = linha.find('td', class_='column-2')
            col_jantar = linha.find('td', class_='column-3')

            # verifica se a linha é válida e tem todas as colunas
            if col_dia and col_almoco and col_jantar:
                dia = col_dia.get_text(strip=True)
                
                # extrai o texto
                cardapio_almoco = ' '.join(col_almoco.stripped_strings)
                cardapio_jantar = ' '.join(col_jantar.stripped_strings)
                
                # combina almoço + janta para busca
                cardapio_dia_inteiro = cardapio_almoco + " " + cardapio_jantar

                # busca a palavra e adiciona o dia se encontrado
                if palavra in cardapio_dia_inteiro.lower():
                    dias_encontrados.append(dia)
        
        # resultado
        if dias_encontrados:
            dias_formatados = ", ".join(dias_encontrados)
            print(f"\nEssa semana irá ter '{palavra}' nos seguintes dias: {dias_formatados} no bandeco :D.")
        else:
            print(f"\nEssa semana não irá ter '{palavra}' no bandeco :C.")

main()
