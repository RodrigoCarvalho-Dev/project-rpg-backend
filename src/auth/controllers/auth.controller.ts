import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserService } from '@/users/services/user.service';
import { UserDto } from '@/users/dto/user.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  // POST /auth/register
  @Post('register')
  async register(@Body() userDto: UserDto, @Res() res) {
    const user = await this.userService.create(userDto);

    if (!user) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.status(400).json({ message: 'User not created' });
    }

    return res.status(201).json(user);
  }


  // POST auth/login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res() res) {
    const user = req.user;

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const token = await this.authService.login(user);

    return res.status(200).json(token);
  }
}
