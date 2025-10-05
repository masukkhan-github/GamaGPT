import express from 'express';
import { createChat, deleteThread, getAllThreads, getThread } from '../controller/chat.controller.js';

export const chatRouter = express.Router();

chatRouter.post("/chat", createChat);
chatRouter.get("/thread", getAllThreads);
chatRouter.get("/thread/:threadId", getThread);
chatRouter.delete("/thread/:threadId", deleteThread);
