import {Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards} from '@nestjs/common';
import {request} from "express";
import {AppService} from "../app.service";
import {KeywordService} from "../Entities/keyword/keyword.service";
import {UserService} from "../Entities/user/user.service";
import {AnswerService} from "../Entities/answer/answer.service";
import {Keyword} from "../Entities/keyword/entities/keyword.entity";
import { Request } from 'express';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
/*Here I have to create the endpoints*/

@Controller('api')
export class APIController {
    constructor(private readonly keywordService : KeywordService,
                private readonly userService : UserService,
                private readonly answerService : AnswerService ) {}
    //constructor(private readonly userService: UserService) {}
    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() request:Request): Promise<Keyword[]> {
        console.log(request);
        return this.keywordService.findAll();
    }

    @Get('/QuestionsPerKW')
    @UseGuards(JwtAuthGuard)
    questionsPerKW(@Req() request:Request) : string {

        return "Yes"
    }
    /*@Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    } */
}
