const db = require('../config/config');
const bcrypt = require('bcryptjs');


const User = {};
User.create = async (user, result) => {
        const hash = await bcrypt.hash(user.password, 10);
        const sql =
            `INSERT INTO users (
            email,
            name,
            lastname,
            phone,
            image,
            password,
            created_at,
            updated_at
            )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(sql,
            [
                user.email,
                user.name,
                user.lastname,
                user.phone,
                user.image,
                hash,
                new Date(),
                new Date()
            ], (err, res) => {
                if (err) {
                    console.log('Error al crear el usuario: ', err);
                    result(err, null);
                }
                else {
                console.log('Usuario creado: ', { id: res.insertId, ...user
});
                result(null, { id: res.insertId, ...user });
            }
        }
    );
}

module.exports = User; 