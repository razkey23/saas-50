import {Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Render} from '@nestjs/common';
import {request} from "express";
import {AppService} from "../app.service";
import {KeywordService} from "../Entities/keyword/keyword.service";
import {UserService} from "../Entities/user/user.service";
import {AnswerService} from "../Entities/answer/answer.service";
import {Keyword} from "../Entities/keyword/entities/keyword.entity";
import { Request } from 'express';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {QuestionService} from "../Entities/question/question.service";
/*Here I have to create the endpoints*/

@Controller('api')
export class APIController {
    constructor(private readonly keywordService : KeywordService,
                private readonly userService : UserService,
                private readonly answerService : AnswerService,
                private readonly questionService : QuestionService) {}
    //constructor(private readonly userService: UserService) {}
    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() request:Request): Promise<Keyword[]> {
        console.log(request);
        return this.keywordService.findAll();
    }

    //Works but returns EVERYTHING ,need to create a custom obj
    @Get('/QuestionsPerKW')
    @Render('questions')
    //@UseGuards(JwtAuthGuard)
    async questionsPerKW(@Req() req:Request)  {
        let questions = await this.questionService.findAll();
        //console.log(questions);
        let temp=[];
        for (let x in questions) {
            if (questions[x].keyword.length>0) { //GET KEYWORD ARRAY OBJECT
                for (let kw in questions[x].keyword) { //Parse Keyword array of question
                    if(req.body.keyword) {
                        if(questions[x].keyword[kw].keyword == req.body.keyword){
                            temp.push(questions[x]);
                        }
                    }
                    else if(req.body.id){
                        if(questions[x].keyword[kw].id == req.body.id){
                            temp.push(questions[x]);
                        }
                    }
                }
            }
        }
        return {"result" : temp};
        //return { title:'Hello'};
        //return temp;
    }



    //Datefrom in format YEAR-MONTH-DAY -> sample: 2020-06-01 ,undefined behavior otherwise
    //Returns json object Array of questions
    @Get('/QuestionsPerDay')
    //@UseGuards(JwtAuthGuard)
    async questionsPerDay(@Req() req: Request) {
        let questions = await this.questionService.findAll();
        if (!req.body.day && (!req.body.datefrom || !req.body.dateto)) {
            return {"error":"Bad Parameters in body"};
        }
        let datefrom;
        let dateto ;
        if (req.body.day) {
            datefrom=req.body.day;
            dateto=req.body.day;
        }
        else {
            datefrom=req.body.datefrom;
            dateto=req.body.dateto;
        }
        let temp=[];
        for(let x in questions) { //PARSE Question JSON
            console.log(questions[x].date_asked)
            if (questions[x].date_asked >= datefrom && questions[x].date_asked <= dateto) {
                console.log(questions[x].date_asked,datefrom,dateto)
                let customobj={
                    id : questions[x].id,
                    text : questions[x].text,
                    title : questions[x].title,
                    date_asked : questions[x].date_asked
                };
                temp.push(customobj);
            }
        }
        return {"result":temp};
    }

    //INPUT OF TYPE "question":x x = id
    @Get('/AnswersOfQuestion')
    //@UseGuards(JwtAuthGuard)
    async answersOfQuestions(@Req() req:Request) {
        let answers = await this.answerService.findAll();
        if (!req.body.question) {
            return {"error":"No questions was given"};
        }
        let temp=[]
        for (let x in answers) {
            if(answers[x].question.id==req.body.question) {
                let customobj={
                    id:answers[x].id,
                    text:answers[x].text,
                    date_answered:answers[x].date_answered
                };
                temp.push(customobj);
            }
        }
        return {"result":temp};
    }


    //INPUT OF TYPE "User":x ,x=id
    @Get('/AnswersOfUser')
    //@UseGuards(JwtAuthGuard)
    async answersOfUser(@Req() req:Request){
        let answers = await this.answerService.findAll();
        if (!req.body.user) {
            return {"error":"No user was given"};
        }
        let temp=[]
        for (let x in answers) {
            if(answers[x].user.id==req.body.user) {
                let customobj={
                    id:answers[x].id,
                    text:answers[x].text,
                    date_answered:answers[x].date_answered
                };
                temp.push(customobj);
            }
        }
        return {"result":temp};
    }



    @Get('/QuestionsOfUser')
    //@UseGuards(JwtAuthGuard)
    async questionsPerUser(@Req() req:Request){
        let questions = await this.questionService.findAll();
        if (!req.body.user) {
            return {"error":"No user was given"};
        }
        let temp=[]
        for (let x in questions) {
            if(questions[x].user.id==req.body.user) {
                let customobj={
                    id:questions[x].id,
                    text:questions[x].text,
                    title:questions[x].title,
                    date_asked:questions[x].date_asked

                };
                temp.push(customobj);
            }
        }
        return {"result":temp};
    }


    @Post('/AddQuestion')
    //@UseGuards(JwtAuthGuard)
    async addQuestion(@Req() req:Request) {
        if (!req.body.user.id || !req.body.title || !req.body.text || !req.body.date_asked){
            return {"error":"Not all question parameters were provided"};
        }
        let customObj = {
            user:req.body.user,
            title :req.body.title,
            text :req.body.text,
            date_asked :req.body.date_asked,
            keyword:[]
        }
        if (req.body.keyword) {
            customObj.keyword = req.body.keyword;
        }
        const object = customObj;
        let x = this.questionService.create(object)
                .then(res=> {
                    console.log(res);
                    return {"Status":"Ok"};
                })
                .catch(err => {
                    console.log("Error Occured");
                    return {"message" :err.message};
                });
        return {"result":x};
    }


    @Post('/AddAnswer')
    //@UseGuards(JwtAuthGuard)
    async addAnswer(@Req() req:Request) {
        if (!req.body.user.id || !req.body.question.id || !req.body.text || !req.body.date_answered){
            return {"error":"Not all Answer parameters were provided"};
        }
        let customObj = {
            user:req.body.user,
            question :req.body.question,
            text :req.body.text,
            date_answered :req.body.date_answered
        }
        const object = customObj
        const x = await this.answerService.create(object)
            .then(res=> {
                console.log(res);
                return {"Status":"Ok"};
            })
            .catch(err => {
                console.log("Error Occured");
                return {"message" :err.message}
            });
        return {"result":x};

    }
}
