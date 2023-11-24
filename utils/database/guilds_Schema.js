import mongoose from "mongoose"

export default mongoose.model("guilds", new mongoose.Schema({

    // Initialize General
    guild_id: { type: String, unique: false, required: true },
    // Initialize Log
    modlog_id: { type: String, unique: false, required: true },
    welcomelog_id: { type: String, unique: false, required: true },
    rolelog_id: { type: String, unique: false, required: true },
    messagelog_id: { type: String, unique: false, required: true },
    channellog_id: { type: String, unique: false, required: true },
    // Initialize Ban
    banrole_id: { type: String, unique: false, required: true },
    bansystem: { type: Boolean, unique: false, required: true },
    // Initialize Kick
    kickrole_id: { type: String, unique: false, required: true },
    kicksystem: { type: Boolean, unique: false, required: true },
    //Initialize Register
    adminrole_id: { type: String, unique: false, required: true},
    userrole_id: { type: String, unique: false, required: true},
    registerlog_id: { type: String, unique: false, required: true},
    registersystem: { type: Boolean, unique: false, required: true},
    // Initialize Autorole
    autorole_id: { type: String, unique: false, required: true},
    autorolesystem: { type: Boolean, unique: false, required: true},
    autorolelog_id: { type: String, unique: false, required: true},
    // Initialize Filter
    kfrEngel: { type: Boolean, unique: false, required: true},
    lnkEngl: { type: Boolean, unique: false, required: true},
    kelimeEngl: { type: Boolean, unique: false, required: true},
    bKlm: { type: String, unique: false, required: true},
    // Initialize Reaction Roles
    role: { type: String, unique: false, required: true},
    roleDesc: { type: String, unique: false, required: true},
    roleEmo: { type: String, unique: false, required: true},
    // Initialize Security
    channelProtection: { type: Boolean, unique: false, required: true},
    channelProtectionLog: { type: String, unique: false, required: true},
    channelProtectionUserPoint: { type: String, unique: false, require: true},
}))