import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Credentials, SignupCredentials } from "./Credentials";
import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";
import { UserInfo } from "./UserInfo";
import { UserService } from "../user/user.service";
import { User } from "src/user/base/User";

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<UserInfo | null> {
    const user = await this.userService.user({
      where: { username },
    });
    if (user && (await this.passwordService.compare(password, user.password))) {
      const { id, roles } = user;
      const roleList = roles as string[];
      return { id, username, roles: roleList };
    }
    return null;
  }
  async login(credentials: Credentials): Promise<UserInfo> {
    const { username, password } = credentials;
    const user = await this.validateUser(
      credentials.username,
      credentials.password
    );
    if (!user) {
      throw new UnauthorizedException("The passed credentials are incorrect");
    }
    const accessToken = await this.tokenService.createToken({
      id: user.id,
      username,
      password,
    });
    return {
      accessToken,
      ...user,
    };
  }

  async signup(credentials: SignupCredentials): Promise<UserInfo>{
    const{username, password, firstName, lastName} = credentials;
    const user = await this.userService.createUser({
      data:{
        username,
        password,
        firstName,
        lastName,
        roles: ["user"],
      },
    });

    if (!user){
      throw new UnauthorizedException("Could not create user");
    }

    const accessToken = await this.tokenService.createToken({
      id: user.id,
      username,
      password,
    });

    return{
      accessToken,
      username: user.username,
      id: user.id,
      roles: (user.roles as { roles: string[]}).roles,
    };
  }

  async me (authorization: string= ""): Promise<User>{
    const bearer = authorization.replace(/^Bearer\s/,"");
    const username = this.tokenService.decodeToken(bearer);
    const result = await this.userService.user({
      where: { username},
      select: {
        createdAt:true,
        firstName: true,
        id:true,
        lastName:true,
        roles: true,
        updatedAt: true,
        username: true,
      },
    });

    if (!result){
      throw new NotFoundException(`No resource was found for ${username}`);
    }
    return result;
  }

  async checkUser(email: string){
    const userStatus = await this.userService.user({
      where:{username: email},
      select: {username:true, firstName: true, lastName: true},

    });
    if (!userStatus){
      throw new NotFoundException(`No resource was found for ${email}`);
    }
    return userStatus;
  }


}
