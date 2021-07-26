import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../auth.service";
import {User} from "../../Entities/user/entities/user.entity";

@Injectable()
export class LocalStategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({usernameField:'username'})
    }
    async validate(username:string,password:string) :Promise <User> {
        const user = this.authService.validate(username,password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}