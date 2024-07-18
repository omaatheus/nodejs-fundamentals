import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url); //cria um novo objeto URL com o caminho do arquivo db.json


export class Database { //essa classe é um mock de um banco de dados
    #database = {} //objeto que simula um banco de dados

    constructor() {
        fs.readFile(databasePath, 'utf-8')
        .then(data => {
            this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist();
        }) //lê o arquivo db.json e popula o banco de dados
     }

    #persist( ) { //sera responsavel por persistir os dados no disco
        fs.writeFile(databasePath, JSON.stringify(this.#database)) //escreve no arquivo db.json o conteúdo do banco de dados
    }
    //se colocamos a # na frente do nome da propriedade, ela se torna privada

    select(table) { //método que simula um select
        const data = this.#database[table] ?? [] //se não existir a tabela, retorna um array vazio
        
        return data;
    }

    insert(table, data) { //método que simula um insert
        if (Array.isArray(this.#database[table])) { //verifica se o que está sendo passado é um array
            this.#database[table].push(data); //adiciona o dado no array
        } else {
            this.#database[table] = [data]; //se não for um array, cria um array com o dado
        }

        this.#persist(); //chama o método persist

        return data;

    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id); //procura o index do dado que tem o id passado

        if (rowIndex > -1) { //se não encontrar o dado
            this.#database[table].splice(rowIndex, 1); //remove o dado
            this.#persist(); //chama o método persist
        } else {
            console.log('Não foi possível encontrar o dado');
        }


        
    }

}