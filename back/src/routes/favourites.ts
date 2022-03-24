import { Router, Request, Response } from "express";
const router = Router();
const User = require('../models/User');
const Post = require('../models/Post');

//Obtener los favoritos 
router.get("/:idUser", async (req: Request, res: Response) => {
    const { page = 1 }: { page?: number } = req.query;
    const { idUser } = req.params;
    try {
        let user = await User.findById(idUser).populate('favourites');
        if (!user.favourites.length) return res.send("User doesn't have favorites");
        if(page) {
            const lastPage = page * 20
            const firstPage = lastPage - 20
            const favourites = user.favourites.slice(firstPage, lastPage)
            return res.json(favourites)
        } else {
            const favourites = user.favourites.splice(0,20)
            res.json(favourites)
        }
        res.json(user.favourites)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Añadir/quitar favoritos
router.put("/:idUser", async (req: Request, res: Response) => {
    const { idUser } = req.params;
    const { idPost } = req.body;
    try {
        const user = await User.findById(idUser,{favourites:1});

        if (user.favourites.includes(idPost)) {
            await user.updateOne({ $pull: {favourites: idPost}})
            return res.send(user.favourites);
        } else { 
            await user.updateOne({ $push: {favourites: idPost}})
            return res.send(user.favourites);
        }
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})


module.exports = router;