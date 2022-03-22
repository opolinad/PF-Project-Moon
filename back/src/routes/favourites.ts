import { Router, Request, Response } from "express";
const router = Router();
const User = require('../models/User');
const Post = require('../models/Post');

//Obtener los favoritos 
router.get("/:id", async (req: Request, res: Response) => {
    const { page = 1 }: { page?: number } = req.query;
    const { id } = req.params;
    try {
        let user = await User.findById(id);
        if (!user.favourites.length) return res.send("User doesn't have favorites");
        if (user.favorites.length > 20) {
            res.send(user.favorites.slice((page - 1) * 20, (page * 20)));
        }
        res.send(user.favorites);
    } catch (error) {
        res.sendStatus(500);
    }
})

// Añadir/quitar favoritos
router.put("/:idUser", async (req: Request, res: Response) => {
    const { idUser } = req.params;
    const { idPost } = req.body;
    try {
        const user = await User.findById(idUser);
        const post = await Post.findById(idPost);
        const objPost = { title: post.title, image: post.image, _id: post._id }

        if (user.favouritesId.includes(idPost)) {
            await user.updateOne({ $pull: {favourites: objPost }})
            await user.updateOne({ $pull: {favouritesId: idPost }})
            return res.send("Eliminado de favoritos");
        } else { 
            await user.updateOne({ $push: {favourites: objPost }})
            await user.updateOne({ $push: {favouritesId: idPost }})
            return res.send("Agregado a favoritos");
        }
        
    } catch (error) {
        res.sendStatus(500);
    }
})


module.exports = router;