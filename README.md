# FIAP - Backend do Tech Challenge

Fork do backend do Tech Challenge da pós-graduação de Front-end Engineering da FIAP.

## Executando o Projeto com o Docker

1. Construa a imagem:

    ```bash
    docker build --tag=NOME_IMAGE:TAG_IMAGEM .
    ```

2. Execute o contêiner:

    ```bash
    docker run -p 8000:8000 -d --rm --name=NOME_CONTÊINER NOME_IMAGE:TAG_IMAGEM
    ```
