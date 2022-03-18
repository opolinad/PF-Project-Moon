import { Router, Request, Response } from "express";
const router = Router();
const User = require('../models/User');


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
router.put("/:idUser", async (req: Request, res: Response) => {
    const { idUser } = req.params;
    const { idPost } = req.body;
    try {
        let user = await User.findById(idUser);
        if (user.favourites.includes(idPost)) {
            console.log("Entra 1");
            await user.updateOne({ $pull: { favourites: idPost } })
        } else {
            console.log("Entra 2");
            await user.updateOne({ $push: { favourites: idPost } })
        }
        res.send("realizado con éxito");
    } catch (error) {
        res.sendStatus(500);
    }
})


module.exports = router;