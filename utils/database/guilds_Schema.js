import mongoose from "mongoose"

export default mongoose.model("guilds", new mongoose.Schema({

    // Initialize General
    guild_id: { type: String, unique: true, required: true },
    // Initialize Log
    modlog_id: { type: String, unique: false, required: true, default: "" },
    welcomelog_id: { type: String, unique: false, required: true, default: "" },
    rolelog_id: { type: String, unique: false, required: true, default: "" },
    messagelog_id: { type: String, unique: false, required: true, default: "" },
    channellog_id: { type: String, unique: false, required: true, default: "" },
    // Initialize Ban
    banrole_id: { type: String, unique: false, required: true, default: "" },
    bansystem: { type: Boolean, unique: false, required: true, default: false },
    // Initialize Kick
    kickrole_id: { type: String, unique: false, required: true, default: "" },
    kicksystem: { type: Boolean, unique: false, required: true, default: false },
    //Initialize Register
    adminrole_id: { type: String, unique: false, required: true, default: "" },
    userrole_id: { type: String, unique: false, required: true, default: "" },
    registerlog_id: { type: String, unique: false, required: true, default: "" },
    registersystem: { type: Boolean, unique: false, required: true, default: false },
    // Initialize Autorole
    autorole_id: { type: String, unique: false, required: true, default: "" },
    autorolesystem: { type: Boolean, unique: false, required: true, default: false},
    autorolelog_id: { type: String, unique: false, required: true, default: "" },
    // Initialize Filter
    kfrEngel: { type: Boolean, unique: false, required: true, default: false},
    lnkEngl: { type: Boolean, unique: false, required: true, default: false},
    kelimeEngl: { type: Boolean, unique: false, required: true, default: false},
    bKlm: { type: String, unique: false, required: true, default: "" },
    // Initialize Reaction Roles
    role: { type: String, unique: false, required: true, default: "" },
    roleDesc: { type: String, unique: false, required: true, default: "" },
    roleEmo: { type: String, unique: false, required: true, default: "" },
    // Initialize Security
    channelProtection: { type: Boolean, unique: false, required: true, default: false},
    channelProtectionLog: { type: String, unique: false, required: true, default: "" },
    channelProtectionUserPoint: { type: String, unique: false, require: true, default: "" },
}))