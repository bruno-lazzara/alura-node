import livros from '../models/Livro.js';

class LivroController {
    static listarLivros = async (req, res) => {
        try {
            const livrosResultado = await livros.find().populate('autor').exec();

            res.status(200).json(livrosResultado);
        } catch (err) {
            res.status(500).json({ message: 'Erro interno no servidor' });
        }
    };

    static listarLivroPorId = async (req, res) => {
        try {
            const id = req.params.id;

            const livro = await livros.findById(id).populate('autor', 'nome').exec();

            res.status(200).send(livro);
        } catch (err) {
            res.status(404).send({ message: `${err.message} - livro não encontrado.` });
        }
    };

    static listarLivroPorEditora = async (req, res) => {
        try {
            const editora = req.query.editora;

            const livrosResultado = await livros.find({ 'editora': editora });

            res.status(200).send(livrosResultado);
        } catch (err) {
            res.status(500).json({ message: 'Erro interno no servidor' });
        }
    };

    static cadastrarLivro = async (req, res) => {
        try {
            let livro = new livros(req.body);

            await livro.save();

            res.status(201).send(livro.toJSON());
        } catch (err) {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar livro.` });
        }
    };

    static atualizarLivro = async (req, res) => {
        try {
            const id = req.params.id;

            await livros.findByIdAndUpdate(id, { $set: req.body });

            res.status(200).send({ message: 'Livro atualizado com sucesso' });
        } catch (err) {
            res.status(500).send({ message: `${err.message} - falha ao atualizar livro.` });
        }
    };

    static excluirLivro = async (req, res) => {
        try {
            const id = req.params.id;

            await livros.findByIdAndDelete(id);

            res.status(200).send({ message: 'Livro excluido com sucesso' });
        } catch (err) {
            res.status(500).send({ message: `${err.message} - falha ao excluir livro.` });
        }
    };
}

export default LivroController;