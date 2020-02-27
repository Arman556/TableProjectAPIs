// const express=require('express');
// const path = require('path');
// const app=express();
// const bodyParser=require('body-parser')
// const fs=require('fs');
// // app.use(bodyparser.urlencoded({extended:false}))
// app.use(bodyParser.json())
// app.get('/CRUD/Fetch',function(req:Request,res:Response){
// 	console.log("Data Fetched");
// 	const data=fs.readFileSync('Project1.json');
// 	const actual=JSON.parse(data);
// 		res.send(actual);
// });
// app.delete('/CRUD/Delete/:id',function(req:Request,res:Response){
// 	console.log("Data Delete");
// 	const data=fs.readFileSync('Project1.json');
// 	const actual=JSON.parse(data);
// 	for(let i=0;i<actual.length;i++){
//        if(actual[i].id==req.params.id){
// 		  actual.splice(i,1);
// 		  break;
// 	   }
// 	}
//     fs.writeFile('Project1.json', JSON.stringify(actual),(err:Error)=> {
// 		// If an error occurred, show it and return
// 		if(err) return console.error(err);
// 		// Successfully wrote to the file!
// 		res.send();
// 	  });
// });
// app.post('/CRUD/create',function(req:Request,res:Response){
// 	console.log("Data create");
// 	const data=fs.readFileSync('Project1.json');
// 	const actual=JSON.parse(data);
//     const value=req.body;
// 	actual.push(value);
//     fs.writeFile('Project1.json', JSON.stringify(actual),(err:Error)=> {
// 		// If an error occurred, show it and return
// 		if(err) return console.error(err);
// 		// Successfully wrote to the file!
// 		res.send();
// 	  });
// });
// app.put('/CRUD/save/:id',function(req:Request,res:Response){
// 	console.log("Data create");
// 	const data=fs.readFileSync('Project1.json');
// 	const actual=JSON.parse(data);
//     const value=req.body;
// 	for(let i=0;i<actual.length;i++){
// 		if(actual[i].id==req.params.id){
// 		   actual[i]=value;
// 		   break;
// 		}
// 	 }
//     fs.writeFile('Project1.json', JSON.stringify(actual),(err:Error)=> {
// 		// If an error occurred, show it and return
// 		if(err) return console.error(err);
// 		// Successfully wrote to the file!
// 		res.send();
// 	  });
// });
// const port=process.env.PORT||3000;
// app.listen(3000);