var React = require('react');
var classNames = require('classnames');
var TypewriterActions =  require('../actions/TypewriterActions');

var Foot = React.createClass({
    render: function(){
        return (
            <footer id="info">
            <p>A simple keyboard build with React & Flux</p>
                <div sytle="margin-top:20px">
                    <a href="#/pages"><img  className="footer-pages-icon" src="./images/pages.png" alt="pages" /></a>
                    <img className="footer-github-icon" src="./images/GitHubIcon.png" alt="github icon" />
                    <img onClick={ this._clickedReset } className="footer-delete-icon" src="./images/wad.png" alt="trash it"/>     
                </div>
            </footer> 
        )
    },
    _clickedReset: function(){
        TypewriterActions.resetAll()
    }
});

module.exports = Foot;
