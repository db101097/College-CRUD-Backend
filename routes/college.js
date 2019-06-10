module.exports = function(app,College,Student) {

/*
		This route will take no query string params it will
		simply return all the colleges in the database
		currently.The response is an array of all the college objects.
*/
		app.get('/getAllColleges', (req, res) => {
				College.findAll({})
					.then((results)=>{
						console.log(results);
						res.status(200).send(results);
					})
					.catch((err)=>{
						console.log(err)
						res.status(400).send(err);
					});
		});



/*
		This route will take a the college id as the
		request param. Then it will use the college
		model to query the database for a single college
		of that id using the findOne method. It will find
		one college where the id matches and include an array
		of all students attending that college using the id
		as a foreign key to relate the two models together

		response:
		{
			"id": id of college,
			"name": "Name of college",
			"image_path": "Image of the college in bytecode",
			"address": "Address of the college",
			"description": "Description of the college",
			"students": [
				{
				    "id": student id,
				    "firstname": "First name of student",
				    "lastname": "Last name of student",
				    "image_path": "image of student in bytecode",
				    "email": "email of student",
				    "gpa": gpa of student,
				    "collegeId": college id of the college the student attends
				}
			]
		}
*/
		app.get('/college/:collegeID', (req,res) => {
				console.log(req.params.collegeID)
				College.findOne({where:{id:req.params.collegeID},
								 include:[Student]})
					.then((results)=>{
						res.status(200).send(results);
					})
					.catch((err)=>{
						console.log(err)
						res.status(400).send(err);
					});
		});


/*
		This route will take a JSON body consisting of

		{
			nameOf:'The name of the college'
			image:'The image in bytecode'
			address:'The address of the college'
			description:'A description of the college'
		}

		With this information the route will create a new
		row using the create method.If successful a successul
		a 200 response with a success message will be returned.
		Otherwise a 400 response with a failure message will be
		returned.
*/
		app.post('/addCollege',(req,res) => {
				let args=req.body;
				console.log(args);
				College.create({name:args.name,
								image_path:args.url,
								address:args.location,
								description:args.description,
								population:args.population})
					.then((result)=>{
						console.log(result)
						res.status(200).send(result)
					})
					.catch((err)=>{
						console.log(err)
						res.status(400).send(err);
					});
		});


/*
		This route will take a the college id as the
		request param.It will also take a JSON body consisting of

		{
			newName:'The updated name of the college'
			newImage:'The updated image in bytecode'
			newAddress:'The updated address of the college'
			newDescription:'A updated description of the college'
		}

		Then it will use the collegemodel to query the database
		for a single college of that id using the findOne method.
		It will find one college where the id matches.Once the result
		is found then the update method can be used to update the row.
		If this operation is successfull then a 200 reponse and success
		message is sent back.Otherwise a 400 response and a failure
		message is sent back.
*/
		app.put('/college/:collegeID',(req,res) => {
				let args=req.body;
				let id=req.params.collegeID;
				College.findOne({where:{id:id}})
					.then((results)=>{
						console.log(results);
						results.update({
							name:args.newName,
							image_path:args.newImage,
							address:args.newAddess,
							description:args.newDescription
						})
						res.status(200).send(results);
					})
					.catch((err)=>{
						console.log(err)
						res.status(400).send(err);
					});
		});


/*
		This route will take a the college id as the
		request param.Then it will use the college model
		to query the database for a single college of that
		id using the findOne method. It will find one college
		where the id matches.Once the result is found then the
		destroy method can be used to delete the row.If this operation
		is successfull then a 200 reponse and success message is sent back.
		Otherwise a 400 response and a failure message is sent back.
*/
		app.delete('/college/:collegeID',(req,res) => {
				let args=req.body;
				let id=req.params.collegeID;
				College.findOne({where:{id:id}})
					.then((results)=>{
						console.log(results);
						results.destroy()
						res.status(200).send(results);
					})
					.catch((err)=>{
						console.log(err)
						res.status(400).send(err);
					});
		});

}
