import { Body, Controller, Post, Res } from "@nestjs/common";
import { MailService } from "../services/mail.service";
import { Response } from "express";
import { MailDto } from "../dto/mail.dto";


@Controller("mail")
export class MailController {
    
    constructor(
        private readonly mailerService: MailService,
    ) {}

    @Post("send")
    async sendEmail(@Body() options : MailDto, @Res() res : Response ) : Promise<Response> {
        try {
            await this.mailerService.sendEmail({
                ...options,
            });
            return res.status(200).json({ message: "Email sent successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Error sending email", error });
        }

    }

}