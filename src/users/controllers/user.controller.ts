import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dto/user.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService : UserService
  ) {}

  @Post('register')
  async register(@Body() userDto: UserDto, @Res() res : Response ) : Promise<Response | void> {
    const user : any = await this.userService.create(userDto);
    
    if (!user) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    try {
      await this.userService.sendEmailVerification(
        user.email,
        user.token,
      )

      return res.status(201).json({
        message: 'User created successfully',
        user : {
          id   : user.id,
          name : user.name,
          email: user.email,
        },
      });
      
    } catch ( error ) {
      return res.status(500).json({
        message: 'Error sending email',
        error : error.message,
      })
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('login')
  getProfile(@Req() req) {
    return req.user;
  }
}
