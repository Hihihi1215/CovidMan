import emailjs from '@emailjs/browser';
import{ init } from '@emailjs/browser';

init("s0t96Aezcxf0RiMC0");

export const sendEmail = async (name, username, password, email) => {

    var tempParams = {
        to_name : name,
        username : username,
        password : password,
        email : email
    }

    await emailjs.send("service_4op5hls", "template_mdmg5js", tempParams, "s0t96Aezcxf0RiMC0");
}
