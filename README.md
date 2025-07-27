# FIAP - Backend do Tech Challenge

Fork do backend do Tech Challenge da pós-graduação de Front-end Engineering da FIAP.

## Executando o Projeto com o Docker

1. Construa a imagem:

    ```bash
    docker build --tag=NOME_IMAGEM:TAG_IMAGEM .
    ```

    Exemplo:

     ```bash
    docker build --tag=fiap-tc-backend:latest .
    ```

2. Execute o contêiner:

    ```bash
    docker run -p 8000:8000 -d --rm --name=NOME_CONTÊINER NOME_IMAGEM:TAG_IMAGEM
    ```

    Exemplo:

    ```bash
    docker run -p 8000:8000 -d --rm --name=fiap-tc-backend-app fiap-tc-backend:latest
    ```
