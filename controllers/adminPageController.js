const factory = require('./factoryController');

exports.addEmployee = async(req, res, next) => {
	const data = req.body;
    let empType = data.type === "admin" ? "admin" : "user"

    const message_user_login = await factory.insertIntoTable(
		'user_login',
		['user_id', 'password', 'type'],
        [data.user_id, data.password, empType]
	);
    
    if(!message_user_login.err) {
        const message_emp_insert = await factory.insertIntoTable(
            'employees',
            ['name', 'SSN', 'address', 'phone_num', 'salary', 'user_id'],
            [data.name, data.SSN, data.address, data.phone_num, data.salary, data.user_id]
        );

        if(!message_emp_insert.err) {
            var message_sub_insert
            if (data.type === "technician") {
                message_sub_insert = await factory.insertIntoTable(
                    'technician',
                    ['SSN', 'expertise'],
                    [data.SSN, data.expertise]
                );      
            }else if (data.type === "ATC") {
                message_sub_insert = await factory.insertIntoTable(
                    'ATC_employees',
                    ['SSN', 'last_testDate'],
                    [data.SSN, data.last_testDate]
                );
            }else {
                res.status(200).json({
                    status: 'success',
                    token: 'token',
                    data: {info: message_emp_insert.info},
                });
            }
            // console.log(message_sub_insert)
            if(!message_sub_insert.err) {
                res.status(200).json({
                    status: 'success',
                    token: 'token',
                    data: {info: message_emp_insert.info},
                });
            }else {
                const message_user_login_delete = await factory.deleteFromTable(
                    'user_login',
                    'user_id',
                    data.user_id,
                );
                const message_employee_delete = await factory.deleteFromTable(
                    'employees',
                    'SSN',
                    data.SSN,
                );
                res.status(409).json({
                    status: 'Failure',
                    token: 'token',
                    data: {info: message_employee_delete.info},
                });    
            }
        }else {
            //Delete from user_login table
            const message_user_login_delete = await factory.deleteFromTable(
                'user_login',
                'user_id',
                data.user_id,
            );
            res.status(409).json({
                status: 'Failure',
                token: 'token',
                data: {info: message_user_login_delete.info},
            });
        }
    }else {
        res.status(409).json({
            status: 'Failure',
            token: 'token',
            data: {info: message_user_login.info},
        });
    }
};

exports.getAircraftModels = async(req, res, next) => {
	const message_get_aircraft_models = await factory.getAll(
		'aircraft_models'
	);

    if (!message_get_aircraft_models.err) {
        res.status(200).json({
            status: 'success',
            token: 'token',
            data: message_get_aircraft_models,
        });
    }else {
        res.status(409).json({
            status: 'Failure',
            token: 'token',
            data: {info: message_get_aircraft_models.info},
        });
    }
};

exports.addAircraft = async(req, res, next) => {
	const data = req.body;

    const message_add_aircraft = await factory.insertIntoTable(
		'aircrafts',
		['model', 'registration_no'],
        [data.model, data.registration_no]
	);
    
    if(!message_add_aircraft.err) {
        res.status(200).json({
            status: 'success',
            token: 'token',
            data: {info: message_add_aircraft.info},
        });
    }else {
        res.status(409).json({
            status: 'Failure',
            token: 'token',
            data: {info: message_add_aircraft.info},
        });
    }
};

