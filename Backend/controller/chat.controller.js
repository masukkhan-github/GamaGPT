
import Thread from '../models/Thread.model.js';
import geminiAPIResponse from '../utils/gemini.js';

export const createChat = async(req,res)=>{

    const {threadId, message} = req.body;

    if(!threadId || !message) {
       return res.status(400).json({message:"missing required field"});
    }

    try {
        let thread = await Thread.findOne({threadId});

        if(!thread) {
            thread = new Thread({
                threadId,
                title:message,
                messages:[{role:"user", content:message}]
            });

        } else {
            thread.messages.push({role:"user", content: message});
        }

        const assistantReply = await geminiAPIResponse(message);

        thread.messages.push({role:"assistant", content: assistantReply});
        thread.updatedAt = new Date();

        await thread.save();

        return res.status(201).json({reply: assistantReply});

    } catch (error) {
        console.log(error);
        return res.status(500).json({"chat controller error": error})
    }
}

export const getAllThreads = async(req,res)=>{
    try{
        const threads = await Thread.find({}).Sort({updatedAt: -1});
        res.json(threads);
    }catch(err){
        console.log(err);
        res.status(500).json({"field to fetch threads": err});

    }
}

export const getThread = async(req,res)=>{
   const {threadId} = req.params;

    try {
        const thread = await Thread.findOne({threadId});

        if(!thread) {
            res.status(404).json({error: "Thread not found"});
        }

        res.json(thread.messages);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Failed to fetch chat"});
    }
}

export const deleteThread = async (req,res) =>{
      const {threadId} = req.params;

    try {
        const deletedThread = await Thread.findOneAndDelete({threadId});

        if(!deletedThread) {
            res.status(404).json({error: "Thread not found"});
        }

        res.status(200).json({success : "Thread deleted successfully"});

    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Failed to delete thread"});
    }
}