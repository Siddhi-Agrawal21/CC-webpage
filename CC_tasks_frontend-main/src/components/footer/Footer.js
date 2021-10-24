import React from "react";
import "./Footer.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    return (
        <div className="footer" id="main">
            <div className="row">
                <h2 className="col" >Contact Us - 03222-281173</h2>
            </div>
            <div className="row container py-3 align-content-center" id="section">
                <div className="col-md-3">
                    <div className="row">
                        <div className="col-12" id="Heading"> COUNSELLING CENTRE</div>
                        <div className="col-12">IIT Kharagpur
                            <div>Kharagpur-721302</div>
                            <div>India</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12" id="Heading"> E-MAIL</div>
                        <div className="col-12">cc@adm.iitkgp.ac.in</div>
                    </div>
                    <div className="row">
                        <div className="col-12" id="Heading"> PHONE NO.</div>
                        <div className="col-12">+91 3222 281173</div>
                    </div>
                    <br></br>
                    <div className="row align-content-center justify-content-center container">

                        <div className="col-4"><a className="social" href='https://www.facebook.com/CounsellingCentreIITKharagpur2016/?ref=aymt_homepage_panel'><FacebookIcon /></a></div>

                        <div className="col-4">  <a className="social" href='https://www.youtube.com/channel/UCW4fuT-YqppR9KwHSRW_Www'><YouTubeIcon></YouTubeIcon></a></div>
                        <div className="col-4">  <a className="social" href='https://www.youtube.com/channel/UCW4fuT-YqppR9KwHSRW_Www'><InstagramIcon></InstagramIcon></a></div>
                    </div>
                </div>

                <div className="col-md-3 align-self-center ">
                    <div className="col-12" id="Heading">SERVICES</div>
                    <div className="col-12"><a className="other pages" href='http://www.counsellingcentre.iitkgp.ac.in/?cciit=individual-consultation'>Individual Consultation</a></div>
                    <div className="col-12"><a className="other pages" href='http://www.counsellingcentre.iitkgp.ac.in/?cciit=crisis-intervantion'>Crisis Intervention</a></div>
                    <div className="col-12"><a className="other pages" href='http://www.counsellingcentre.iitkgp.ac.in/?cciit=group-counselling'>Group Counselling</a></div>
                    <div className="col-12"><a className="other pages" href='http://www.counsellingcentre.iitkgp.ac.in/?cciit=psychiatric-services'>Psychiatric Services</a></div>
                    <div className="col-12"><a className="other pages" href='http://www.counsellingcentre.iitkgp.ac.in/?cciit=gkt'>Gatekeepers' Training</a></div>
                    <div className="col-12"><a className="other pages" href='http://www.counsellingcentre.iitkgp.ac.in/?cciit=help-a-friend'>Help a Friend</a></div>
                    <div className="col-12"><a className="other pages" href='http://www.counsellingcentre.iitkgp.ac.in/?cciit=after-hour-services'>After Hour Services</a></div>
                </div>
                <div className="col-md-3 align-self-center ">
                    <div className="col-6" id="Heading"><a className="other pages" id="major-link" href='http://www.counsellingcentre.iitkgp.ac.in/?cciit=reach'>REACH US</a></div>
                    <div className="col-6" id="Heading"><a className="other pages" id="major-link" href='http://www.counsellingcentre.iitkgp.ac.in/?cciit=event'>HAPPENINGS</a></div>
                    <div className="col-6" id="Heading"><a className="other pages" id="major-link" href='http://www.counsellingcentre.iitkgp.ac.in/?cciit=people'>PEOPLE</a></div>
                    <div className="col-6" id="Heading"><a className="other pages" id="major-link" href='http://www.counsellingcentre.iitkgp.ac.in/?cciit=freq'>FAQ</a></div>
                    <div className="col-6" id="Heading"><a className="other pages" id="major-link" href='http://www.counsellingcentre.iitkgp.ac.in/?cciit=theme-of-the-month'>THEME OF THE MONTH</a></div>
                </div>
                <div className="col-md-3 align-self-center " cellSpacing="0" cellPadding="0">
                    <table className="col-12">
                        <tbody>
                            <tr>
                                <td><span>Quick Response Team</span><br></br><b>Call</b>: 03222-281002 / 281003</td>
                            </tr>
                            <tr>
                                <td><span>Medical Emergency / Mental Health Emergency: B. C. Roy Tech. Hospital Help Desk</span><br></br><b>Call:</b> 03222-281008 / 282632</td>
                            </tr>
                            <tr>
                                <td><span>Fire Emergency</span><br></br><b>Call:</b> 03222-255709</td>
                            </tr>
                            <tr>
                                <td><span>Security Control Room</span><br></br><b>Call:</b> 03222-282751 / 281001 / 281004</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default Footer;
