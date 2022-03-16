import {Router, Request, Response } from "express";
import express from "express";
import passport from "passport";
import "../Middleware/google";

const router = Router();

router.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
)
);

router.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/login/google/success',//Cambiar a la página de inicio de sesión
        failureRedirect: '/google/failure', //Cambiar a la página de login, pero con un mensaje de error
}));

export = router;