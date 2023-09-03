import mongoose from 'mongoose';

const livroSchema = new mongoose.Schema(
    {
        id: {
            type: String
        },
        titulo: {
            type: String,
            required: [true, 'O título do livro é obrigatório']
        },
        autor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'autores',
            required: [true, 'O autor do livro é obrigatório']
        },
        editora: {
            type: String,
            required: [true, 'O nome da editora é obrigatório'],
            enum:{
                values: ['Alura', 'Casa do Código'],
                message: 'A editora {VALUE} não é permitida'
            }
        },
        numeroPaginas: {
            type: Number,
            min: [10, 'Número de páginas deve estar entre 10 e 5000 - valor fornecido: {VALUE}'],
            max: [5000, 'Número de páginas deve estar entre 10 e 5000 - valor fornecido: {VALUE}']
        }
    }
);

const livros = mongoose.model('livros', livroSchema);

export default livros;