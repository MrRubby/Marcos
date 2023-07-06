import mongoose from "mongoose"

export default mongoose.model("guilds", new mongoose.Schema({

    // Initialize General
    guild_id: { type: String, unique: true, required: true },
    // Initialize Log
    modlog_id: { type: String, unique: true, required: true },
    welcomelog_id: { type: String, unique: true, required: true },
    rolelog_id: { type: String, unique: true, required: true },
    messagelog_id: { type: String, unique: true, required: true },
    channellog_id: { type: String, unique: true, required: true },
    // Initialize Ban
    banrole_id: { type: String, unique: true, required: true },
    bansystem: { type: Boolean, unique: true, required: true },
    // Initialize Kick
    kickrole_id: { type: String, unique: true, required: true },
    kicksystem: { type: Boolean, unique: true, required: true },
    //Initialize Register
    adminrole_id: { type: String, unique: true, required: true},
    userrole_id: { type: String, unique: true, required: true},
    registerlog_id: { type: String, unique: true, required: true},
    registersystem: { type: Boolean, unique: true, required: true},
    // Initialize Autorole
    autorole_id: { type: String, unique: true, required: true},
    autorolesystem: { type: Boolean, unique: true, required: true},
}))
