import NaoEncontrado from '../errors/NaoEncontrado.js';
import autores from '../models/Autor.js';

class AutorController {
    static listarAutores = async (req, res, next) => {
        try {
            const autoresResultado = await autores.find();
            res.status(200).json(autoresResultado);
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

            // If 'await' is not used here, the success message will be displayed before the findByIdAndUpdate operation even finishes.
            // We must wait for the operation to finish, so it can continue to the status 200, or cath the error.
            await autores.findByIdAndUpdate(id, { $set: req.body });

            res.status(200).send({ message: 'Autor atualizado com sucesso' });
        } catch (err) {
            next(err);
        }
    };

    static excluirAutor = async (req, res, next) => {
        try {
            const id = req.params.id;

            // 'await' is used the same way as in findByIdAndUpdate
            await autores.findByIdAndDelete(id);

            res.status(200).send({ message: 'Autor excluido com sucesso' });
        } catch (err) {
            next(err);
        }
    };
}

export default AutorController;