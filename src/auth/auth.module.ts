import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController} from './controllers/auth.controller';
import { UserModule } from 'src/users/user.module';
import { JwtStrategy } from './strategies/auth.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret : process.env.JWT_SECRET,
      signOptions : {expiresIn : process.env.JWT_EXPIRES_IN }
    }),
    PassportModule.register({defaultStrategy : "local" })
  ],
  providers: [ 
    JwtService,
    JwtStrategy,
    AuthService,
    LocalStrategy
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
