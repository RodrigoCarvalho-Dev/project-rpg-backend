import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { MailController } from './controllers/mail.controller';
import { MailService } from './services/mail.service';
@Module({
    imports : [
        // importando modulos para o envio de e-email

        MailerModule.forRootAsync({
            useFactory: ( config : ConfigService ) => ({
                transport: {
                    host: config.get('MAIL_HOST'),
                    port: config.get('MAIL_PORT'),
                    secure: config.get('MAIL_SECURE') === 'true',
                    auth: {
                        user: config.get('MAIL_USER'), 
                        pass: config.get('MAIL_PASSWORD'), 
                    },
                },
                defaults: {
                    from: `${config.get('MAIL_FROM_NAME')} <${config.get('MAIL_FROM')}>`,
                },
                
            }),
            inject : [ ConfigService ],
        }),   
    ],

    controllers : [ MailController],
    providers : [ MailService ],
    exports : [
        MailerModule,
        MailService,
    ]
})
export class MailModule {}