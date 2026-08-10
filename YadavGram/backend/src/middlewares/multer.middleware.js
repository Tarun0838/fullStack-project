import multer from 'multer'

const storage = multer.diskStorage({
    // yah disk storage batata hai ki file ko server ke kis folder mai store karna hai and kis name se store karna hai 
    destination: (req, file , cb) => {
        cb(null, './public')
    },

    filename: (req, file, cb) => {
        cb(null , file.originalname)
    }
})

export const upload = multer({storage});