import livros from '../models/Livro.js';

class LivroController {
    static listarLivros = async (req, res, next) => {
        try {
            const livrosResultado = await livros.find().populate('autor').exec();

            res.status(200).json(livrosResultado);
        } catch (err) {
            next(err);
        }
    };

    static listarLivroPorId = async (req, res, next) => {
        try {
            const id = req.params.id;

            const livro = await livros.findById(id).populate('autor', 'nome').exec();

            res.status(200).send(livro);
        } catch (err) {
            next(err);
        }
    };

    static listarLivroPorEditora = async (req, res, next) => {
        try {
            const editora = req.query.editora;

            const livrosResultado = await livros.find({ 'editora': editora });

            res.status(200).send(livrosResultado);
        } catch (err) {
            next(err);
        }
    };

    static cadastrarLivro = async (req, res, next) => {
        try {
            let livro = new livros(req.body);

            await livro.save();

            res.status(201).send(livro.toJSON());
        } catch (err) {
            next(err);
        }
    };

    static atualizarLivro = async (req, res, next) => {
        try {
            const id = req.params.id;

            await livros.findByIdAndUpdate(id, { $set: req.body });

            res.status(200).send({ message: 'Livro atualizado com sucesso' });
        } catch (err) {
            next(err);
        }
    };

    static excluirLivro = async (req, res, next) => {
        try {
            const id = req.params.id;

            await livros.findByIdAndDelete(id);

            res.status(200).send({ message: 'Livro excluido com sucesso' });
        } catch (err) {
            next(err);
        }
    };
}

export default LivroController;