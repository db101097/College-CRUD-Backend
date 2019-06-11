module.exports = function(app,College,Student) {


/*
		This route will take no query string params it will
		simply return all the students in the database
		currently.The response is an array of all the college objects.
*/
		app.get('/getAllStudents', (req, res) => {
				Student.findAll({})
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
		This route will take a the student id as the
		request param. Then it will use the student
		model to query the database for a single student
		of that id using the findOne method. It will find
		one student where the id matches.It will also include
		a college object containing the info of the college
		the student currently attends

		response:
		{
			"id": 1,
			"firstname": "john",
			"lastname": "g",
			"image_path": "args.image",
			"email": "email@gmail.com",
			"gpa": 4,
			"collegeId": 1,
			"college": {
				"id": 1,
				"name": "Hunter College",
				"image_path": "random img",
				"address": "address of college",
				"description": "cuny"
		   	}
		}
*/
		app.get('/students/:studentID', (req,res) => {
				console.log('here');
				Student.findOne({where:{id:req.params.studentID},
								 include:[College]})
					.then((results)=>{
						console.log(results);
						res.status(200).send(results);
					})
					.catch((err)=>{
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

		app.post('/addStudents',(req,res) => {
				let args=req.body;
				console.log(args.collegeId);
				Student.create({firstname:args.firstName,
								 lastname:args.lastName,
								 image_path:args.url,
								 email:args.email,
								 gpa:args.gpa,
								 collegeId:args.collegeID})
					.then((result)=>{
						res.status(200).send('Successfully created')
					})
					.catch((err)=>{
						res.status(400).send(err);
					});
		});


/*
		This route will take a the student id as the
		request param.It will also take a JSON body consisting of

		{
			firstname:'The updated name of the college'
			lastname:'The updated image in bytecode'
			image:'The updated address of the college'
			email:'A updated description of the college'
			gpa:'the student's gpa'
			collegeId:'the id of the college the student attends
		}

		Then it will use the student model to query the database
		for a single student of that id using the findOne method.
		It will find one student where the id matches.Once the result
		is found then the update method can be used to update each column.
		If this operation is successful then a 200 reponse and success
		message is sent back.Otherwise a 400 response and a failure
		message is sent back.
*/
		app.put('/students/:studentsID',(req,res) => {
				let args=req.body;
				let id=req.params.studentsID;
				Student.findOne({where:{id:id}})
					.then((results)=>{

						results.update({
							firstname:args.firstname,
							lastname:args.lastname,
							image_path:args.image,
							email:args.email,
							gpa:args.gpa,
							collegeId:args.collegeID
						});

						res.status(200).send('Successfully updated');
					})
					.catch((err)=>{
						console.log(err)
						res.status(400).send(err);
					});
		});

/*
		This route will take a the student id as the
		request param.Then it will use the student model
		to query the database for a single college of that
		id using the findOne method. It will find one college
		where the id matches.Once the result is found then the
		destroy method can be used to delete the row.If this operation
		is successfull then a 200 reponse and success message is sent back.
		Otherwise a 400 response and a failure message is sent back.
*/
		app.delete('/students/:studentsID',(req,res) => {
				let id=req.params.studentsID;
				Student.findOne({where:{id:id}})
					.then((results)=>{
						console.log(results);
						results.destroy()
						res.status(200).send('Successfully Deleted');
					})
					.catch((err)=>{
						console.log(err)
						res.status(400).send(err);
					});
		});

}
