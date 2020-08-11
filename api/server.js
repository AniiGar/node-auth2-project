const express = require('express');

const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const authRouter = require('../auth/authRouter')
const userRouter = require('../user/userRouter');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
// server.use(bcrypt());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

module.exports = server;