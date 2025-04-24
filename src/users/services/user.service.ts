import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from '@/mail/services/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly mailService : MailService,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDto.password, salt);

    const user = this.usersRepository.create({
      ...userDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }


  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async sendEmailVerification( email : string, token : string ): Promise<void> {

    const confirmationUrl = `${process.env.FRONTEND_URL}/confirm?token=${token}`;
    
    // O frontend deve gerar este HTML
    const htmlContent = `
      <h1>Confirme seu e-mail</h1>
      <a href="${confirmationUrl}">Clique aqui para confirmar</a>
    `;

    await this.mailService.sendEmail({
      to: email,
      subject: 'Confirme seu cadastro',
      html: htmlContent,
      text: `Confirme seu e-mail acessando: ${confirmationUrl}`,
    });

  }
}
