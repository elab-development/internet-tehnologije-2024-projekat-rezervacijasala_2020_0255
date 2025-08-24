import User from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;

    // Check if user exists
    const emailExists = new Promise((resolve, reject) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) reject(new Error(err));
        if (user) reject({ error: 'User with this email already exists.' });
        resolve();
      });
    });

    // Hashing Password & Creating new user
    Promise.all([emailExists])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const newUser = new User({
                firstName: firstName,
                lastName: lastName,
                password: hashedPassword,
                email: email,
              });

              newUser
                .save()
                .then((result) =>
                  res.status(201).send({
                    message: 'User registered successfully!',
                    user: result,
                  })
                )
                .catch((error) => {
                  res.status(500).send({
                    error:
                      'Something went wrong while creating the user: ' + error,
                  });
                });
            })
            .catch((error) => {
              return res.status(500).send({
                error: 'Password hashing went wrong: ' + error,
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error: 'User already exists: ' + error });
      });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while registering the user: ' + error,
    });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    User.findOne({ email: email })
      .then((user) => {
        // Comparing Passwords
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return res.status(400).send({
                error: 'Password does not match',
              });
            }

            // Creating JWT
            const token = jwt.sign(
              {
                userId: user._id,
                email: user.email,
              },
              ENV.JWT_SECRET,
              {
                expiresIn: '24h',
              }
            );

            return res.status(200).send({
              message: `${user.email} logged in successfully!`,
              user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
              },
              token: token,
            });
          })
          .catch((error) => {
            return res.status(400).send({
              error: 'Password does not match: ' + error,
            });
          });
      })
      .catch((error) => {
        return res.status(404).send({
          error: 'User not found: ' + error,
        });
      });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while logging in the user: ' + error,
    });
  }
};

// GET /api/users
export const getUsers = async (req, res) => {
  try {
    const { email } = req.query;

    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return res.status(500).send({
          error: 'Something went wrong while fetching the venue: ' + err,
        });
      }

      if (!user) {
        return res.status(404).send({
          error: 'No users found',
        });
      }

      return res.status(200).send(user);
    });
  } catch (error) {
    res.send(500);
  }
};
