import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import {Request} from 'express';
import * as bcrypt from 'bcrypt';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {User} from "../Entities/user/entities/user.entity";
import {UserService} from "../Entities/user/user.service";
import {HttpService} from "@nestjs/axios";
import {map} from "rxjs/operators";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService : UserService,
        private httpService: HttpService) {}


    @Get()
    async findAll() {
        const val = await this.authService.validate("testuser","testuser");
        return val;
    }

    //Protected endpoint ,returns a json token
    @UseGuards(LocalAuthGuard)
    @Post('signin')
    login(@Req() req : Request) : {token:string} {
        return this.authService.login(req.user as User);
        //if fail redirect to 'homepage 
        //redirect to mypage
    }

    //Unprotected endpoint (register works)
    @Post('register')
    async register(@Req() req : Request) : Promise <{ message:string}> {
        const saltOrRounds = 10;
        if (!req.body.password || !req.body.username || ! req.body.password2){
            return { message : "No password Given or Username Given"};
        }
        else if (req.body.passqord !== req.body.passqord2) {
            return { message : "Passwords need to match"};
        }
        else {
            const hash = await bcrypt.hash(req.body.password, saltOrRounds);
            let customobj={
                username:req.body.username,
                password:hash
            }
            const params = JSON.stringify(customobj);
            console.log(customobj,req.body.password);
            const x = await this.httpService.post('http://localhost:3000/user',
                params,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .toPromise()
                .then( res =>  {
                        return {"message":"Ok"};

                })
                .catch(err => {
                    console.log("Error Occured");
                    return {"message" :"Error ,maybe try a different username"}
                });

            console.log(x);
            return x;
            /*const x = await this.httpService.post('http://localhost:3000/user' ,
                "username:
                ");*/
            //console.log(x);
        }
    }
}
