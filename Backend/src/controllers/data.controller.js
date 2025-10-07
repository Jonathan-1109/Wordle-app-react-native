import users from '../models/usersModel.js'
import data from '../models/dataModel.js'

export const clasification = async (req,res) => {
    try {
        const mode = req.params.mode
        const values = await data.find({modeID: mode}).sort({points: -1}).limit(12).populate('userID', 'name').exec()
        let best = Array(values.length);
        values.forEach((pos, i) => {
            best[i] = {name:  pos.userID.name, points: pos.points, victories: pos.victories, played: pos.played}
        })
        return res.status(200).send({best})
    } catch (err) {
        console.error("Error in clasification")
        return res.status(400).send({error: "error"})
    }

}

export const newData = async (req,res) => {
    try {
        const id = req.params.id
        const values = req.body
        const temp = await users.findById(id)
        
        if (!temp) {
            throw new Error("Nonexistent user")
        }
        
        await data.findOneAndUpdate(
            {userID: id, modeID: values.mode},
            { 
                $inc: {
                    played: 1,
                    victories: parseInt(values.win),
                    points: parseInt(values.points)   
                }  
            },
            {
                upsert: true,
            }
        )
        return res.status(200).send({message: 'update data'})

    } catch (err) {
        console.error(err)
        return res.status(400).send({error: "error"})  
    }

}

export const getData = async (req,res) => {
    const id = req.params.id
    try {
        const temp = await data.find({userID: id}).select('-_id -userID -__v').sort({modeID: 1})
        return res.status(200).send({message: 'datos enviados', values: temp})
    } catch (err) {
        return res.status(400).send({error: "error"})
    }
}