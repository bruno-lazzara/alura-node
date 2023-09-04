import NaoEncontrado from '../errors/NaoEncontrado.js';
import { autores } from '../models/index.js';

class AutorController {
    static listarAutores = async (req, res, next) => {
        try {
            const autoresResultado = autores.find();
            req.resultado = autoresResultado;
            next();
        } catch (err) {
            next(err);
        }
    };

    static listarAutorPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autor = await autores.findById(id);

            if (autor !== null) {
                res.status(200).send(autor);
            } else {
                next(new NaoEncontrado('Autor não encontrado.'));
            }
        } catch (err) {
            next(err);
        }
    };

    static cadastrarAutor = async (req, res, next) => {
        try {
            let autor = new autores(req.body);
            const resultado = await autor.save();
            res.status(201).send(resultado.toJSON());
        } catch (err) {
            next(err);
        }
    };

    static atualizarAutor = async (req, res, next) => {
        try {
            const id = req.params.id;

            const autorAtualizar = await autores.findByIdAndUpdate(id, { $set: req.body });

            if (autorAtualizar !== null) {
                res.status(200).send({ message: 'Autor atualizado com sucesso' });
            } else {
                next(new NaoEncontrado('Autor não encontrado.'));
            }
        } catch (err) {
            next(err);
        }
    };

    static excluirAutor = async (req, res, next) => {
        try {
            const id = req.params.id;

            const autorExcluir = await autores.findByIdAndDelete(id);

            if (autorExcluir !== null) {
                res.status(200).send({ message: 'Autor excluido com sucesso' });
            } else {
                next(new NaoEncontrado('Autor não encontrado.'));
            }
        } catch (err) {
            next(err);
        }
    };
}

export default AutorController;