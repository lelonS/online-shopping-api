import Router from 'express';
import mongoose, { Schema } from 'mongoose';
import { errorResponse, notFoundResponse } from '../errors/error-messages.js';


const customersRouter = Router();


export default customersRouter;