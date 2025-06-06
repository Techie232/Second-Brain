require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const z = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { dbConnection, User, Content, Tag, Link } = require('./db');
const userMiddleware = require('./middleware');
const random = require('./utils');
const cors = require('cors');
   
dbConnection();

app.use(cors());

app.use(express.json());

const authenticationSchema = z.object({
   username: z.string().min(5),
   password: z.string().min(3)
})

app.post('/api/v1/signup', async (req, res) => {

   const { username, password } = req.body;

   try {
      const response = authenticationSchema.safeParse(req.body);

      if (!response.success) {
         return res.status(500).json({
            message: "Inputs are incorrect",
            error: response.error
         })
      }

      const user = await User.findOne({
         username,
      })

      if (user) {
         return res.status(411).json({
            message: "User EXISTs",
         })
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
         username,
         password: hashedPassword,
      })

      res.status(200).json({
         message: "Signup Success",
      })

   } catch (error) {
      res.status(500).json({
         message: "Signup Error",
         error: error.message,
      })
   }
})

app.post('/api/v1/signin', async (req, res) => {

   const { username, password } = req.body;

   try {
      const response = authenticationSchema.safeParse(req.body);

      if (!response.success) {
         return res.status(500).json({
            message: "Inputs are incorrect",
            error: response.error
         })
      }

      const user = await User.findOne({
         username,
      })

      if (!user) {
         return res.status(404).json({
            message: "User not found"
         })
      }

      if (await bcrypt.compare(password, user.password)) {

         const token = jwt.sign({
            id: user._id
         }, process.env.JWT_SECRET)

         res.status(200).json({
            message: "Successfull SignIn",
            token
         })
      }
      else {
         res.status(404).json({
            message: "Username or Password is Incorrect",
         })
      }
   } catch (error) {
      res.status(500).json({
         message: "Something went wrong while Signing in",
         error: error.message,
      })
   }
})

app.post('/api/v1/content', userMiddleware, async (req, res) => {
   const { link, title, type } = req.body;

   try {

      await Content.create({
         link,
         title,
         type,
         userId: req.userId
      })

      res.status(200).json({
         msg: "Content created"
      })

   } catch (error) {
      res.status(500).json({
         msg: "Server can't create the Content"
      })
   }

})

app.get('/api/v1/content', userMiddleware, async (req, res) => {

   const userId = req.userId;

   try {

      const contents = await Content.find({
         userId
      }).populate({ path: 'userId', select: 'username' });

      res.json({
         contents
      })

   } catch (error) {
      res.status(500).json({
         message: "Can't get the contents",
         error: error.message,
      })
   }

})

app.delete('/api/v1/content', userMiddleware, async (req, res) => {

   const { contentId } = req.body;

   try {

      await Content.deleteMany({
         _id: contentId,
         userId: req.userId
      })

      res.status(200).json({
         msg: "Deleted"
      })

   } catch (error) {
      res.status(500).json({
         msg: "Wrong while deleting the Content",
         error: error.message,
      })
   }

})

app.post('/api/v1/brain/share', userMiddleware, async (req, res) => {
   const { share } = req.body
   try {
      if (share) {

         let existingLink = await Link.findOne({
            userId: req.userId
         })

         if (existingLink) {
            res.status(403).json({
               hash: existingLink.hash,
               msg: "You have already created a Link",
            })
            return;
         }

         let hash = random(10);
         let link = await Link.create({
            userId: req.userId,
            hash: hash
         })
         res.status(200).json({
            hash,
         })
      }
      else {
         await Link.findOneAndDelete({
            userId: req.userId,
         })
         res.status(200).json({
            message: "Link Deteled",
         })
      }

   } catch (error) {
      res.status(500).json({
         error: error.message,
         message: "WRONG in Shared Link",
      })
   }
})

app.get('/api/v1/brain/:shareLink', async (req, res) => {

   const sharableLink = req.params.shareLink;

   try {
      const link = await Link.findOne({
         hash: sharableLink,
      }).populate('userId').select('username');

      if (!link) {
         res.status(404).json({
            msg: "Input is WRONG",
         })
         return;
      }

      const contents = await Content.find({
         userId: link.userId?._id
      })

      res.status(200).json({
         msg: "Content Retrieved Successfully",
         contents,
         userName: link?.userId?.username
      })

   } catch (error) {
      res.status(500).json({
         msg: "Content not Retrieved",
         error: error.message,
      })
   }
})

app.listen(PORT, () => {
   console.log(`App is listening on http://localhost:${PORT}`);
})