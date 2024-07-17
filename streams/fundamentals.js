import {  Readable, Transform, Writable, Duplex } from 'node:stream';

class OneToHundredStream extends Readable {
    index = 1

    _read(){ //método que retorna quais são os dados dessa stream
        const i = this.index++; //incrementa o index

        setTimeout(() => {
            if (i > 100){
                this.push(null); //quando terminar de ler os dados, ele retorna null
            } else {
                const buf = Buffer.from(String(i))
    
                this.push(buf)
            }
        }, 1000)
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1; //transforma o chunk em número e multiplica por -1
        callback(null, Buffer.from(String(transformed))); //chama o callback com o resultado transform
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback){ //chunk é o que está sendo passado, encoding é o tipo de encoding que está sendo passado, callback é o que vai ser chamado quando terminar de processar o chunk
     console.log(Number(chunk.toString()) * 10); //transforma o chunk em número e multiplica por 10
     callback();
    } 
}

new OneToHundredStream() //stream de leitura
.pipe(new InverseNumberStream()) // stream de transformação precisa ler e escrever, stream de transformação
.pipe(new MultiplyByTenStream()); //pipe é um método que pega o que está sendo retornado e joga no output, stream de escrita