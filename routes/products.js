import Router from 'express';
import mongoose, { Schema } from 'mongoose';
import { errorResponse, notFoundResponse } from '../errors/error-messages.js';


const productsRouter = Router();


export default productsRouter;