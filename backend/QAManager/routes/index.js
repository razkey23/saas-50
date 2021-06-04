const express = require('express');
const router = express.Router();
const  request = require('request');

//Get answers of a question
//GET request at localhost:5000/answerOf + question in body ("question":id) as int
router.get('/AnswersOfQuestion',function(req,res,next) {
  if (!req.body.question){
    res.json({"error":"Not keyword given"});
  }
  else{
    const requestOptions = {
      url: "http://localhost:3000/answer",
      method: 'GET',
      json: {}
    }
    request(requestOptions, (err, response, body) =>
    {
      if (err) {
        console.log(err);
      } else if (response.statusCode === 200) {
        let temp=[]; //INIT RESULT ARRAY
        for(x in body) { //PARSE Question JSON
          console.log(body[x]);
          if(body[x].question.id==req.body.question) {
            let customobj={};
            customobj.id=body[x].id;
            customobj.text=body[x].text;
            customobj.date_answered=body[x].date_answered;
            temp.push(customobj);
          }
        }
        res.json(temp);  //Return object
      } else {
        console.log(response.statusCode);
      }
    });
  }
});

//Get Answers per User
// endpoint localhost:5000/AnswerOfUser + user in body ("keyword":id) as int
router.get('/AnswersOfUser',function(req,res,next) {
  if (!req.body.user){
    res.json({"error":"Not keyword given"});
  }
  else{
    const requestOptions = {
      url: "http://localhost:3000/answer",
      method: 'GET',
      json: {}
    }
    request(requestOptions, (err, response, body) =>
    {
      if (err) {
        console.log(err);
      } else if (response.statusCode === 200) {
        let temp=[]; //INIT RESULT ARRAY
        for(x in body) { //PARSE Question JSON
          console.log(body[x]);
          if(body[x].user.id==req.body.user) {
            let customobj={};
            customobj.id=body[x].id;
            customobj.text=body[x].text;
            customobj.date_answered=body[x].date_answered;
            temp.push(customobj);
          }
        }
        res.json(temp);  //Return object
      } else {
        console.log(response.statusCode);
      }
    });
  }
});


//Get Questions per user
//Get localhost:5000/QuestionsPerUser + user in body ("user":id) as int
router.get('/QuestionsPerUser',function(req,res,next) {
  if (!req.body.user){
    res.json({"error":"No user given"});
  }
  else{
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
        let temp=[]; //INIT RESULT ARRAY
        for(x in body) { //PARSE Question JSON
          console.log(body[x]);
          if(body[x].user.id==req.body.user) {
            let customobj={};
            customobj.id=body[x].id;
            customobj.text=body[x].text;
            customobj.title=body[x].title;
            customobj.date_asked=body[x].date_asked;
            temp.push(customobj);
          }
        }
        res.json(temp);  //Return object
      } else {
        console.log(response.statusCode);
      }
    });
  }
});


//Post Question
/*
 Post localhost:5000/AddQuestion + body following the format
 {
    "text": "",
    "title":"",
    "user":{
      "id": "",
      ...
     },
     "date_asked":"",
     "keyword":[
      { "id": ""},
      { "id":""} ...
     ]
 }

 Text,title,user,date_asked are necessary ,keyword is optional
*/
router.post('/AddQuestion',function(req,res,next){
  if (!req.body.user.id || !req.body.title || !req.body.text || !req.body.date_asked){
    res.json({"error":"No user given"});
  }
  else {
    //res.send("OK");
    let customobj = {};
    customobj.user=req.body.user;
    customobj.title =req.body.title;
    customobj.text =req.body.text;
    customobj.date_asked =req.body.date_asked;
    if (req.body.keyword) {
      customobj.keyword = req.body.keyword;
    }
    //Execute the data layer call now
    //res.send(customobj);
    const object = customobj;

    const requestOptions = {
        url: "http://localhost:3000/question",
        method: 'POST',
        json: object
    }
      console.log(requestOptions);
      request(requestOptions, (err, response, body) =>
      {
        if (err) {
          res.statusCode(400).send(err);
          console.log(err);
        } else if (response.statusCode === 201) {
          res.send({"status":"OK"});
          console.log(response.statusCode);
        } else {
          res.send({"Status":"Error Occured inserting a Question"})
          console.log(response.statusCode);
        }
      });
    }
});


//Post Answer
/* Post localhost:5000/AddAnswer + body the format
  {
    "user":{
      "id":"",
      ...
    },
    "question":{
      "id":"",
      ...
    },
    "text":"",
    "date_answered":""
  }

  All Fields are mandatory
 */
router.post('/AddAnswer',function(req,res,next){
  if (!req.body.user.id || !req.body.text || !req.body.question.id || !req.body.date_answered){
    res.json({"error":"No user given"});
  }
  else {
    //res.send("OK");
    let customobj = {};
    customobj.user=req.body.user;
    customobj.question =req.body.question;
    customobj.text =req.body.text;
    customobj.date_answered =req.body.date_answered;
    const object = customobj;
    const requestOptions = {
      url: "http://localhost:3000/answer",
      method: 'POST',
      json: object
    }
    console.log(requestOptions);
    request(requestOptions, (err, response, body) =>
    {
      if (err) {
        console.log(err);
      } else if (response.statusCode === 201) {
        res.send({"status":"OK"});
        console.log(response.statusCode);
      } else {
        res.send({"Status":"Error Occured inserting an Answer"})
        console.log(response.statusCode);
      }
    });
  }
});

module.exports = router;