# desafio-tecnico-backend-green-acesso

Projeto criado para o Desafio Backend Green Acesso.

```
Crie um projeto em Javascript ou Typescript, utilizando NodeJS e banco de dados SQL (qualquer um) para fazer a importação de um .csv  e um .pdf para o nosso sistema e por fim a exportação de um .pdf .

```
## Início
### Pré-requisitos:

Você precisa do NodeJS=>18 e do YARN instalado em sua máquina.

```
yarn install
yarn run dev
```
## Usando API:
```json
{
"urlBase": "http://localhost:3000/api", 
"Inserir dados csv":"POST: /upload/csv" Utilizando o insomnia, deve ser inserido o arquivo.csv como Multipart e o nome da key `file`,
"Inserir dados pdf":"POST: /upload/pdf" Utilizando o insomnia, deve ser inserido o arquivo.pdf como Multipart e o nome da key `file`,
"Consultar sua lista de favoritos":"GET: /boletos"
"Para gerar relatorio em pdf deve-se passar a query `relatorio=1`. "GET: /boletos?relatorio=1"
}
```

## Mocks:
```
No diretório mocks/, temos:
1 - boletos.pdf - arquivo para ser usado no envio do pdf
2 - boletosMock.csv - arquivo para ser usado no envio do csv
3 - lotes.js - Gera lotes mockados
```

## Outros diretorios:
```
* arquivos-separados-pdf - Recebe os pdf após o split
* relatorios - Salva os pdfs gerados nos pedidos de relatorios
```
## Author:

* **Joir Neto** - [LinkedIn](https://www.linkedin.com/in/joir-neto/)
