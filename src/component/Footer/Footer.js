import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className='footer-container'>
                    <div className='grid-footer-flex'>
                        <div className='gymshark-central'>
                            <div className='gymshark-central-center'>
                                <a className='central-logo-new' href='https://www.gymshark.com/blogs/news/'>
                                    <div className='central-text'>
                                        <img alt='gymshark central' src='https://cdn.shopify.com/s/files/1/0156/6146/t/107/assets/gymshark-central.svg?7311842748552632210' />
                                    </div>
                                    <div className='logo-inner'>
                                        <img alt='gymshark logo' className='shark-logo-inner' src='https://cdn.shopify.com/s/files/1/0156/6146/t/107/assets/logo-grey.svg?7311842748552632210' />
                                        <p>Click to visit</p>
                                    </div>
                                </a>
                                <ul className='general-nav'>
                                    <li><a className='gymshark-central-link' href='https://www.gymshark.com/blogs/news'>GYMSHARK CENTRAL</a></li>
                                    <li><a className='about-us-link' href='https://www.gymshark.com/pages/about-us'>ABOUT US</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='footer-contact-us-container'>
                            <div className='footer-contact-us'>
                                <h5>Contact Us</h5>
                                <ul className='footer-contact-us-faq'>
                                    <li className='faq-list'>
                                        <a className='faq' href='https://support.gymshark.com/hc/en-us'>FAQ</a>
                                    </li>
                                </ul>
                            </div>
                            <div className='footer-help-container'>
                                <h5>HELP</h5>
                                <ul className='help-ul-list'>
                                    <li><a href='https://support.gymshark.com/hc/en-us'>Delivery and Returns</a></li>
                                    <li><a href='https://support.gymshark.com/hc/en-us/articles/213114763-Size-Guide'>Size guides</a></li>
                                    <li><a href='https://support.gymshark.com/hc/en-us'>FAQs</a></li>
                                    <li><a href='https://support.gymshark.com/hc/en-us/sections/201761456-Orders'>Orders</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='my-account-and-social-media-container'>
                            <div className='my-account-container'>
                                <h5>MY ACCOUNT</h5>
                                <ul className='my-account-ul'>
                                    <li><a href=''>Login</a></li>
                                    <li><a href=''>Register</a></li>
                                </ul>
                            </div>
                            <div className='social-media-container'>
                                <h5>SOCIAL MEDIA</h5>
                                <div className='social-media-links'>
                                    <div className='social-links'>
                                        <a href='https://www.facebook.com/Gymshark/'><img alt='facebook' src="https://png.icons8.com/ios-glyphs/50/000000/facebook-circled.png"/></a>
                                        <a href='https://twitter.com/Gymshark'><img alt='twitter' src="https://png.icons8.com/ios/50/000000/twitter-circled-filled.png"/></a>
                                        <a href='https://www.instagram.com/gymshark/'><img alt='instagram' src="https://png.icons8.com/ios-glyphs/50/000000/instagram-new.png"/></a>
                                        <a href='https://www.pinterest.co.uk/gymshark/'><img alt='pinterest' src="https://png.icons8.com/material-rounded/50/000000/pinterest.png"/></a>
                                        <a href='https://www.youtube.com/user/GymSharkTV'><img alt='youtube' src="https://png.icons8.com/ios-glyphs/50/000000/youtube-play.png"/></a>
                                        <a href='https://open.spotify.com/user/21o5jgmtm2yths6dx7sw4zm6a'><img alt='spotify' src="https://png.icons8.com/ios/50/000000/spotify-filled.png"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;