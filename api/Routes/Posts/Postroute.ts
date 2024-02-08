import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import PostSchema from "../../Models/Posts";
import RegisterSchema from "../../Models/RegisterSchema";
const router = express.Router();

router.use(bodyParser.json({ limit: "50mb" }));
router.post("/", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const postSaved = new PostSchema({
      desc: data.desc,
      Image: {
        data: data.image,
        type: data.type,
      },
      Profile: {
        data: data.Profile,
        type: data.typeimg,
      },
      Username: data.Username,
      Work: data.Work,
    });

    const Addpost = await postSaved.save();
    console.log(Addpost);

    if (Addpost) {
      res.status(200).json(Addpost);
    } else {
      res.status(404).json({ Error: "Registration has falled" });
    }
  } catch (error) {
    res.status(505).json({
      error: "Error while creating the Register App",
    });
    console.log(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const Posts = await PostSchema.find();
    if (Posts) {
      res.status(200).json(Posts);
    } else {
      res.status(404).json({
        Error: "Error while getting all the posts",
      });
    }
  } catch (error) {
    res.status(505).json({
      Error: "No connection found with Database",
    });
  }
});

router.get("/userpost", async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const UsersPost = await PostSchema.find({
      userId: id,
    });
    if (UsersPost) {
      res.status(200).json(UsersPost);
    } else {
      res.status(404).json({
        Message: "ERROR WHILE GETTING POSTS",
      });
    }
  } catch (error) {}
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const Findpost = await PostSchema.findByIdAndUpdate(id);

    if (Findpost) {
      res.status(200).json({
        Message: "Post Updated",
      });
    }
  } catch (error) {}
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const DeletePost = await PostSchema.findByIdAndDelete(id);
    if (DeletePost) {
      res.status(200).json({
        Message: "Post Has been Deleted",
      });
    } else {
      res.status(404).json("Error in deleting the post");
    }
  } catch (error) {
    res.status(500).json("Error");
  }
});

router.post("/liked", async (req: Request, res: Response) => {
  const id = req.body.postid;
  const UpdateLiked = req.body.userid;

  try {
    const UpdateLike = await RegisterSchema.updateOne(
      { _id: id },
      {
        $set: {
          liked: {
            UpdateLiked,
          },
        },
      }
    );
    if (UpdateLike) {
      res.status(200).json({ liked: "true" });
    }else{
      res.status(500).json({
        Error: 'Error while sending data'
      })
    }
  } catch (error) {
    res.status(404).json({
      error
    });
  }
});

export default router;
