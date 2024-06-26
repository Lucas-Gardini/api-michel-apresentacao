import os

pals = "E:/Desenvolvimento/api-apresentar/frontend/public/paldeck"

# Lista todos os arquivos e diretórios

arquivos = []

for root, dirs, files in os.walk(pals):
    for file in files:
        arquivos.append(os.path.join(root, file))

# Remove todos os arquivos do array, antes do arquivo 012B

index012B = arquivos.index(
    "E:/Desenvolvimento/api-apresentar/frontend/public/paldeck\\012B.png"
)

arquivos = arquivos[index012B:]

index = 13

# Renomeia todos os arquivos, a partir do arquivo 012B para 013.png, 014.png, 015.png, ...

for arquivo in arquivos:
    os.rename(arquivo, f"{pals}/{str(index).zfill(3)}.png")
    index += 1

print(arquivos)
