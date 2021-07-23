import {Controller, Get, Render} from '@nestjs/common';
import { AppService } from './app.service';
import {QuestionService} from "./Entities/question/question.service";
import {request} from "express";
import {KeywordService} from "./Entities/keyword/keyword.service";
import {UserService} from "./Entities/user/user.service";


@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly keywordService : KeywordService,
              private readonly userService : UserService) {}

  /*@Get()
  @Render('questions')
  root() {
    const requestOptions = {
      url: "http://localhost:3000/question",
      method: 'GET',
      json: {}
    }
    request(requestOptions, (err, response, body) =>
    {
      if (err) {
        console.log(err);
      } else if (response.statusCode === 200) {
        console.log(response);
      } else {
        console.log(response.statusCode);
      }
    });
    //return this.questionService.findAll();
  } */


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
