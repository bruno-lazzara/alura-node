import mongoose from 'mongoose';
import autores from '../models/Autor.js';

class AutorController {
    static listarAutores = async (req, res) => {
        try {
            const autoresResultado = await autores.find();
            res.status(200).json(autoresResultado);
        } catch (err) {
            res.status(500).json({ message: 'Erro interno no servidor' });
        }
    };

    static listarAutorPorId = async (req, res) => {
        try {
            const id = req.params.id;
            const autor = await autores.findById(id);

            if (autor !== null) {
                res.status(200).send(autor);
            } else {
                res.status(404).send({ message: 'Autor não encontrado.' });
            }

        } catch (err) {
            if (err instanceof mongoose.Error.CastError) {
                res.status(400).send({ message: 'Um ou mais dados fornecidos estão incorretos.' });
            } else {
                res.status(500).send({ message: 'Erro interno do servidor' });
            }
        }
    };

    static cadastrarAutor = async (req, res) => {
        try {
            let autor = new autores(req.body);
            const resultado = await autor.save();
            res.status(201).send(resultado.toJSON());
        } catch (err) {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar autor.` });
        }
    };

    static atualizarAutor = async (req, res) => {
        try {
            const id = req.params.id;

            // If 'await' is not used here, the success message will be displayed before the findByIdAndUpdate operation even finishes.
            // We must wait for the operation to finish, so it can continue to the status 200, or cath the error.
            await autores.findByIdAndUpdate(id, { $set: req.body });

            res.status(200).send({ message: 'Autor atualizado com sucesso' });
        } catch (err) {
            res.status(500).send({ message: `${err.message} - falha ao atualizar autor.` });
        }
    };

    static excluirAutor = async (req, res) => {
        try {
            const id = req.params.id;

            // 'await' is used the same way as in findByIdAndUpdate
            await autores.findByIdAndDelete(id);

            res.status(200).send({ message: 'Autor excluido com sucesso' });
        } catch (err) {
            res.status(500).send({ message: `${err.message} - falha ao excluir autor.` });
        }
    };
}

export default AutorController;