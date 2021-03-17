import React from 'react';

const SocialPerfil = () => {
    return (
        <div className="social">
            <a href="https://www.facebook.com/" className="social_item facebook" target="blank">
                <span className="icon-font">
                    <div className="icon"><i className="fab fa-facebook-f"></i></div>
                </span>
            </a>

            <a href="https://twitter.com/" className="social_item twitter" target="blank">
                <span className="icon-font">
                    <div className="icon"><i className="fab fa-twitter"></i></div>
                </span>
            </a>

            <a href="https://www.instagram.com/" className="social_item instagram" target="blank">
                <span className="icon-font">
                    <div className="icon"><i className="fab fa-instagram"></i></div>
                </span>
            </a>

            <a href="https://github.com/" className="social_item github" target="blank">
                <span className="icon-font">
                    <div className="icon"><i className="fab fa-github"></i></div>
                </span>
            </a>

        </div>
    );
}
export default SocialPerfil;