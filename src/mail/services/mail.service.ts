import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import * as sanitizeHtml from "sanitize-html";
import { MailInterfaceOptions } from "../interfaces/mail.interface";


@Injectable()
export class MailService {

    constructor(
        private readonly mailerService: MailerService,
    ) {}

    private sanitizeEmail(html : string): string {

        return sanitizeHtml( html , {
            allowedTags: [ 'h1', 'h2', 'h3', 'p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'br', 'img' ],
            allowedAttributes: {
                a: [ 'href', 'target', 'style' ],
                img: [ 'src', 'alt', 'width', 'height' ],
            },
        });
    
    }


    async sendEmail( options : MailInterfaceOptions ) : Promise<void> {
        const sanitizedHtml = this.sanitizeEmail( options.html );
        
        await this.mailerService.sendMail({
            to : options.to,
            subject : options.subject,
            html: sanitizedHtml,
            text : options.text,
        });
        
    }




    




}