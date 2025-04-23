import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserDto } from "../dto/user.dto";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post("register")
    async register(@Body() UserDto : UserDto) {
        return this.userService.create(UserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get("login")
    getProfile( @Req() req ) {
        return req.user;
    }

    

}

