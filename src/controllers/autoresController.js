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
            res.status(200).send(autor);
        } catch (err) {
            res.status(404).send({ message: `${err.message} - autor não encontrado.` });
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