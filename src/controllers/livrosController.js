import NaoEncontrado from '../errors/NaoEncontrado.js';
import { autores, livros } from '../models/index.js';

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

            if (livro !== null) {
                res.status(200).send(livro);
            } else {
                next(new NaoEncontrado('Livro não encontrado'));
            }
        } catch (err) {
            next(err);
        }
    };

    static listarLivroPorFiltro = async (req, res, next) => {
        try {
            const busca = await processaBusca(req.query);

            if (busca !== null) {
                const livrosResultado = await livros
                    .find(busca)
                    .populate('autor');

                res.status(200).send(livrosResultado);
            } else {
                res.status(200).send([]);
            }
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

            const livroAtualizar = await livros.findByIdAndUpdate(id, { $set: req.body });

            if (livroAtualizar !== null) {
                res.status(200).send({ message: 'Livro atualizado com sucesso' });
            } else {
                next(new NaoEncontrado('Livro não encontrado'));
            }
        } catch (err) {
            next(err);
        }
    };

    static excluirLivro = async (req, res, next) => {
        try {
            const id = req.params.id;

            const livroExcluir = await livros.findByIdAndDelete(id);

            if (livroExcluir !== null) {
                res.status(200).send({ message: 'Livro excluido com sucesso' });
            } else {
                next(new NaoEncontrado('Livro não encontrado'));
            }
        } catch (err) {
            next(err);
        }
    };
}

async function processaBusca(parametros) {
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

    let busca = {};

    if (editora) busca.editora = editora;
    if (titulo) busca.titulo = { $regex: titulo, $options: 'i' };

    if (minPaginas || maxPaginas) busca.numeroPaginas = {};
    if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
    if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

    if (nomeAutor) {
        const autor = await autores.findOne({ nome: nomeAutor });
        if (autor !== null) {
            busca.autor = autor._id;
        } else {
            busca = null;
        }
    }

    return busca;
}

export default LivroController;