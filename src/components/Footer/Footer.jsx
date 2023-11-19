import React from 'react';
import cl from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={cl.siteFooter}>
            <div className={cl.container}>
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className={cl.copyrightText}>Copyright &copy; 2023 All Rights Reserved by
                            <a href="https://github.com/Nookons">Nookon</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;