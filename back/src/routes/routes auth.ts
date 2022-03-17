import { Router, Request, Response } from "express";
import express from "express";
import passport from "passport";
import "../Middleware/google";
import "../Middleware/microsoft";

const router = Router();

router.get('/google',
  passport.authenticate('google', {
    scope:
      ['email', 'profile']
  }
  )
);

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/login/google/success',//Cambiar a la página de inicio de sesión
    failureRedirect: 'login/google/failure', //Cambiar a la página de login, pero con un mensaje de error
  }));

router.get('/microsoft',
  passport.authenticate('microsoft'));

router.get('/microsoft/callback',
  passport.authenticate('microsoft', { failureRedirect: '/login' }),//cambiar a la página de login con mensaje de error
  function (req: Request, res: Response) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

export = router;