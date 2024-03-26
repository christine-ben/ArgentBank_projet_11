import React from "react";
import { Link } from "react-router-dom";
import Error404 from '../assets/image/404.webp';

function Error () {
    return (
        <div className="error-page">
            <main>
                <section className="error">
                    <img src={Error404} alt="error 404" className="error-404"/>
                    <h1> Pas de chance...!</h1>
                    <p> Le serveur rencentre quelques difficultés,reconnectez-vous plus tard</p>
                    < Link to="/">
                        <button className="button-404" to="/">Retour à la page d’accueil</button>
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default Error     